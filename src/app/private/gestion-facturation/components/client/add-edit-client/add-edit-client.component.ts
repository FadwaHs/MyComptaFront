import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressFormComponent } from 'src/app/shared/components/address-form/address-form.component';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AddressService } from 'src/app/private/gestion-facturation/http/address.service';
import { PhoneFormComponent } from 'src/app/shared/components/phone-form/phone-form.component';
import { KeyWordFormComponent } from 'src/app/shared/components/key-word-form/key-word-form.component';
import { Client } from '../../../models/client';
import { Societe } from '../../../models/societe';
import { ClientService } from '../../../http/client.service';
import { SocieteService } from '../../../http/societe.service';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import { ClientType } from '../../../enums/client-type';
import { CompteTiersService } from '../../../http/compteTiers.service';
import { SocialService } from '../../../http/social.service';
import { CompteTiers } from '../../../models/compte_tiers';
import { Social } from '../../../models/social';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-add-edit-client',
  templateUrl: './add-edit-client.component.html',
  styleUrls: ['./add-edit-client.component.scss']
})
export class AddEditClientComponent implements OnInit{

  @ViewChild(AddressFormComponent)
  childAddress: AddressFormComponent;

  @ViewChild(PhoneFormComponent)
  childPhone:PhoneFormComponent;

  @ViewChild(KeyWordFormComponent)
  childKeyWord: KeyWordFormComponent;

  id: number;
  slug: string;
  languages: string[] = ['Français', 'English'];
  defaultLang: string = 'Français';
  client: Client = new Client();
  societes: Array<Societe> = new Array<Societe>();
  clientForm: FormGroup;
  isAddMode: boolean = true;
  isPar : boolean ;
  //++
  compteTiersList:CompteTiers[]
  types : string[] = Object.values(ClientType);
  socialList :Array<Social>




  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private societeService :SocieteService,
    private addressService :AddressService,
    private router: Router,
    private route: ActivatedRoute,
    protected navigate : NavigateService,

    private compteTiersService:CompteTiersService,
    private socialService :SocialService,
    //++

  ) {
}


  async ngOnInit(): Promise<void> {

    this.initializeForms();
    this.initCompteTiers();

    if (this.route.snapshot.url[0].path == 'edit') {
      this.isAddMode = false;
      this.verifyRouteAndGetClient();
    }


  }
  //++


  initCompteTiers() {

  this.compteTiersService.getAllCompteTiers().subscribe({
    next: (data) => (this.compteTiersList= data),
    error: (err) => console.log(err),
    complete: () => {
    },
  });
  }



  async verifyRouteAndGetClient() {

    [this.id, this.slug] = await this.route.snapshot.params['id-slug'].split('-');
    this.id = +this.id;
    if (this.id) {
      this.clientService.getClientById(this.id).subscribe({
        next: (data) => (this.client = data),
        error: (err) => console.log(err),
        complete: () => {

          this.socialList = this.client.socialList

          this.checkSlug();
          if(this.client.societe)  this.toProfessionel()
          else this.toParticulier();
          this.setFormValues();
          this.setOtherForms()
        },
      });

    } else {
      this.router.navigateByUrl(this.navigate.f_clientPath);
    }
  }

  checkSlug() {
    if (this.client.slug != this.slug)
      this.router.navigateByUrl(this.navigate.toEditPath('C',this.id,this.client.slug));

  }

  initializeForms() {
    this.clientForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      function: null,
      prospect:false,
      website: ['', [Validators.pattern(this.getWebsiteUrlRegex())]],
      language: [this.defaultLang, Validators.required],
      twitter: ['', [Validators.pattern(this.getSocialUrlRegex('twitter'))]],
      facebook: ['', [Validators.pattern(this.getSocialUrlRegex('facebook'))]],
      linkedin: ['', [Validators.pattern(this.getSocialUrlRegex('linkedin'))]],
      compteTiers:null,
      clientType:null,
      note: null
    });
  }

  toParticulier(){
    this.isPar = true;
    if(this.clientForm.controls['societe']){
      this.clientForm.removeControl('societe')
    }
    if(!this.clientForm.controls['website']){
      this.clientForm.addControl('website' ,new FormControl(null))
    }
    if(!this.isAddMode) {
      this.setOtherForms()
    }
  }

  toProfessionel(){
    this.isPar = false;
    if(!this.clientForm.controls['societe']){
      this.clientForm.addControl('societe' ,new FormControl( null,Validators.required))
      if(!this.societes.length){
        this.setSocietes();
      }
    }
    if(this.clientForm.controls['website']){
      this.clientForm.removeControl('website')
    }

    if(!this.isAddMode){
      this.setFormValues()
      this.setOtherForms()
    }
  }

  setSocietes(){
    this.societeService.getAllSocietes().subscribe({
      next : res => this.societes = res,
      error : e => console.log(e),
    })
  }

  setOtherForms(){
    setTimeout(() => {
      if(this.isPar && this.client.address) this.childAddress.setFormValues(this.client.address)
      if(this.client.motCleList.length) this.childKeyWord.setFormValues(this.client.motCleList)
      if(this.client.phoneList.length)this.childPhone.setFormValues(this.client.phoneList)
    }, 1);

  }

  onSubmit() {

    if (this.clientForm.valid) {
      this.getFormValues();

      if (this.isAddMode) {
        this.createNewClient();
      } else {
        this.updateClient();
      }
    } else {
      console.log('Invalid Form');
    }
  }

  createNewClient() {

    this.clientService.addClient(this.client).subscribe({
      next: (data) => {
        this.client = data;

      },
      error: (e) => console.log(e),
      complete: () => {

        this.setSoial()
        this.submitOtherForms();

      },
    });
  }

  updateClient(){
    this.clientService.updateClientById(this.client.id,this.client).subscribe({
      next: (data) => (this.client = data),
      error: (e) => console.log(e),
      complete: () => {

        this.updateSocialist();
        this.submitOtherForms();
      },
    });
  }

  updateSocialist()
  {
    this.socialList.forEach((social,index) =>
    {
      social.client = this.client
      if(social.id)
      {
        this.socialService.updateSocialById(social.id,social).subscribe({
          next:(res) =>{
            this.socialList[index]=res
          },
        })
      }else
      {
        this.socialService.addSocial(social).subscribe({
          next: (data) => (social = data),
          error: (e) => console.log(e),
          complete: () => {
        },
        })
      }

    });
  }

  setSoial(){

    if(this.socialList)
    this.socialList.forEach( (social) => {

      if(social.link){
        social.client =this.client;
        this.socialService.addSocial(social).subscribe({
          next: (data) => (social = data),
          error: (e) => console.log(e),
          complete: () => {
        },
        })
      }
    });

  }

  async submitOtherForms() {
    var client : Client = new Client()
    client.id = this.client.id
    if(this.isPar) await this.childAddress.onSubmit(client,this.isAddMode);
    else this.deleteAddress();
    await this.childKeyWord.onSubmit(client,this.isAddMode);
    await this.childPhone.onSubmit(client,this.isAddMode);
    this.router.navigateByUrl(this.navigate.f_clientPath);
  }


  getFormValues() {

    this.client.firstName = this.clientForm.controls['firstName'].value;
    this.client.lastName = this.clientForm.controls['lastName'].value;
    this.client.email = this.clientForm.controls['email'].value;
    this.client.function = this.clientForm.controls['function'].value;
    this.client.prospect =this.clientForm.controls['prospect'].value;
    this.client.language = this.clientForm.controls['language'].value;
    this.client.clientType= this.clientForm.controls['clientType'].value;
    this.client.compteTiers=this.clientForm.controls['compteTiers'].value as CompteTiers;
    this.client.note = this.clientForm.controls['note'].value;

    if(this.isPar){
      this.client.website = this.clientForm.controls['website'].value
      delete this.client.societe
    }
    else{
      this.client.societe = this.clientForm.controls['societe'].value;
      delete this.client.website ;
    }

    if(this.isAddMode)
    {
      var twitterSocial =new Social()
      var facebookSocial =new Social()
      var linkedinSocial =new Social()

       twitterSocial.name ='Twitter'
       twitterSocial.link =this.clientForm.controls['twitter'].value
       facebookSocial.name ='Facebook'
       facebookSocial.link =this.clientForm.controls['facebook'].value
       linkedinSocial.name ='LinkedIN'
       linkedinSocial.link =this.clientForm.controls['linkedin'].value

       this.socialList =new Array<Social>()

       this.socialList.push(twitterSocial)
       this.socialList.push(facebookSocial)
       this.socialList.push(linkedinSocial)
    }
    else
    {

      if( this.socialList.length > 0)
      {

        this.socialList.forEach(social => {

          if(social.id)
          {
           if(social.name == 'Twitter')
           {
              social.link = this.clientForm.controls['twitter'].value
           }
           if(social.name == 'Facebook')
           {
              social.link = this.clientForm.controls['facebook'].value
           }
           if(social.name == 'LinkedIN')
           {
              social.link = this.clientForm.controls['linkedin'].value
           }

          }

        });

      }else
      {

        var twitterSocial =new Social()
        var facebookSocial =new Social()
        var linkedinSocial =new Social()

         twitterSocial.name ='Twitter'
         twitterSocial.link =this.clientForm.controls['twitter'].value
         facebookSocial.name ='Facebook'
         facebookSocial.link =this.clientForm.controls['facebook'].value
         linkedinSocial.name ='LinkedIN'
         linkedinSocial.link =this.clientForm.controls['linkedin'].value

         this.socialList =new Array<Social>()

         this.socialList.push(twitterSocial)
         this.socialList.push(facebookSocial)
         this.socialList.push(linkedinSocial)

      }
    }

  }

  setFormValues() {

    this.clientForm.patchValue({

      firstName: this.client.firstName,
      lastName: this.client.lastName,
      email: this.client.email,
      function: this.client.function,
      language: this.client.language,
      note: this.client.note,
      //++
      prospect:this.client.prospect,
      clientType:this.client.clientType,
      compteTiers:this.client.compteTiers,

    });

    if(this.isPar) this.clientForm.controls['website'].setValue(this.client.website)
    else this.clientForm.controls['societe'].setValue(this.client.societe)

    if(this.client.socialList.length >0 )
    {
      this.clientForm.controls['twitter'].setValue(this.client.socialList[0].link)
      this.clientForm.controls['facebook'].setValue(this.client.socialList[1].link)
      this.clientForm.controls['linkedin'].setValue(this.client.socialList[2].link)
    }

  }

  deleteAddress(){
    if(this.client.address && this.client.address.id){
      this.addressService.deleteAddressById(this.client.address.id).subscribe({
        error : e=> console.log(e)
      })
    }
  }


  getSocialUrlRegex(socialMedia: string): string {
    switch (socialMedia) {
      case 'twitter':
        return '^https?://(?:www\\.)?twitter\\.com/(?:(?!home).)*$';
      
     
case 'facebook':
        
       
return '^https?://(?:www\\.)?facebook\\.com/.*$';
      case 'linkedin':
        
       
return '^https?://(?:www\\.)?linkedin\\.com/in/.*$';
      default:
        
       
return '';
    }
  }

  getWebsiteUrlRegex(): string {
    
   
    return '^https?://(?:www\\.)?[a-zA-Z0-9_-]+\\.[a-zA-Z]{2,}(?:/[a-zA-Z0-9_]+)?$';
      }
    
}

  



