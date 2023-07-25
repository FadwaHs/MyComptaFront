import { SecteurService } from './../../../http/secteur.service';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressFormComponent } from 'src/app/shared/components/address-form/address-form.component';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PhoneFormComponent } from 'src/app/shared/components/phone-form/phone-form.component';
import { KeyWordFormComponent } from 'src/app/shared/components/key-word-form/key-word-form.component';
import { SelectClientFormComponent } from 'src/app/shared/components/select-client-form/select-client-form.component';
import { Societe } from '../../../models/societe';
import { SocieteService } from '../../../http/societe.service';
import { CompteTiers } from '../../../models/compte_tiers';
import { ClientType } from '../../../enums/client-type';
import { Social } from '../../../models/social';
import { CompteTiersService } from '../../../http/compteTiers.service';
import { SocialService } from '../../../http/social.service';
import { Secteur } from '../../../models/secteur';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-add-edit-societe',
  templateUrl: './add-edit-societe.component.html',
  styleUrls: ['./add-edit-societe.component.scss'],
})
export class AddEditSocieteComponent implements OnInit {
  @ViewChild(AddressFormComponent)
  childAddress: AddressFormComponent;

  @ViewChild(PhoneFormComponent)
  childPhone: PhoneFormComponent;

  @ViewChild(KeyWordFormComponent)
  childKeyWord: KeyWordFormComponent;

  @ViewChild(SelectClientFormComponent)
  childSelectClient: SelectClientFormComponent;

  id: number;
  slug: string;
  languages: string[] = ['Français', 'English'];
  defaultLang: string = 'Français';
  societe: Societe = new Societe();
  societeForm: FormGroup;
  isAddMode: boolean = true;

  //++
  types : string[] = Object.values(ClientType);
  socialList :Array<Social>
  secteurList :Secteur[]

  constructor(
    private formBuilder: FormBuilder,
    private societeService: SocieteService,
    private router: Router,
    private route: ActivatedRoute,
    protected navigate : NavigateService,
    //++
    private compteTiersService:CompteTiersService,
    private socialService :SocialService,
    private secteurService:SecteurService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.initializeForms();
    this.initSecteurs();

    if (this.route.snapshot.url[0].path == 'edit') {
      this.isAddMode = false;
      this.verifyRouteAndGetSociete();
    }
  }


  async verifyRouteAndGetSociete() {
    [this.id, this.slug] = await this.route.snapshot.params['id-slug'].split('-');
    this.id = +this.id;
    if (this.id) {
      this.societeService.getSocieteById(this.id).subscribe({
        next: (data) => {
          this.societe = data;
          this.socialList = this.societe.socialList;
          this.checkSlug();
          this.setFormValues();
          this.setOtherForms();
        },
        error: (err) => console.log(err),
      });

    } else {
      this.router.navigateByUrl(this.navigate.f_societePath);
    }
  }


  checkSlug() {
    if (this.societe.slug === this.slug) {
    } else {
      this.router.navigateByUrl(this.navigate.toEditPath('S',this.id,this.societe.slug));
    }
  }

  initializeForms() {
    this.societeForm = this.formBuilder.group({
      name: [null, Validators.required],
      ntva: null,
      siren: null,
      codeNaf: null,
      website: ['', [Validators.pattern(this.getWebsiteUrlRegex())]],
      prospect:false,
      language: [this.defaultLang, Validators.required],
      twitter: [null, [Validators.pattern(this.getSocialUrlRegex('twitter'))]],
      facebook: ['', [Validators.pattern(this.getSocialUrlRegex('facebook'))]],
      linkedin: ['', [Validators.pattern(this.getSocialUrlRegex('linkedin'))]],
      secteur:null,
      societeType:null,
      note:null
    });
  }

  initSecteurs(){
    this.secteurService.getAllSecteurs().subscribe({
      next: (data) => (this.secteurList= data),
      error: (err) => console.log(err),
      complete: () => {
      },
    });

  }
  setOtherForms(){
    if(this.societe.address) this.childAddress.setFormValues(this.societe.address)
    if(this.societe.motCleList.length) this.childKeyWord.setFormValues(this.societe.motCleList)
    if(this.societe.phoneList.length)this.childPhone.setFormValues(this.societe.phoneList)
    if(this.societe.clientList.length) this.childSelectClient.setFormValues(this.societe.clientList)
  }

  onSubmit() {

    if (this.societeForm.valid) {
      this.getFormValues();

      if (this.isAddMode) {
        this.createNewSociete();
      } else {
        this.updateSociete();
      }
    } else {
      console.log('Invalid Form');
    }
  }

  createNewSociete() {
    this.societeService.addSociete(this.societe).subscribe({
      next: (data) => (this.societe = data),
      error: (e) => console.log(e),
      complete: () => {
        this.setSoial()
        this.submitOtherForms();

      },
    });
  }

  updateSociete(){
    this.societeService.updateSocieteById(this.societe.id,this.societe).subscribe({
      next: (data) => (this.societe = data),
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
      social.societe = this.societe
      if(social.id)
      {
        this.socialService.updateSocialById(social.id,social).subscribe({
          next:(res) =>{
            this.socialList[index]=res
          },
        })

      }else{
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
    var societe : Societe = new Societe()
    societe.id = this.societe.id
    await this.childAddress.onSubmit(societe,this.isAddMode);
    await this.childKeyWord.onSubmit(societe,this.isAddMode);
    await this.childPhone.onSubmit(societe,this.isAddMode);
    await this.childSelectClient.onSubmit(societe,this.isAddMode);
    this.router.navigateByUrl(this.navigate.f_societePath);
  }

  getFormValues() {


    this.societe.name = this.societeForm.controls['name'].value;
    this.societe.ntva = this.societeForm.controls['ntva'].value;
    this.societe.siren = this.societeForm.controls['siren'].value;
    this.societe.codeNaf = this.societeForm.controls['codeNaf'].value;
    this.societe.website = this.societeForm.controls['website'].value;
    this.societe.language = this.societeForm.controls['language'].value;

    //++
    this.societe.prospect =this.societeForm.controls['prospect'].value;
    this.societe.secteur =this.societeForm.controls['secteur'].value as Secteur;
    this.societe.societeType= this.societeForm.controls['societeType'].value;
    this.societe.note =this.societeForm.controls['note'].value;



    if(this.isAddMode)
    {
      var twitterSocial =new Social()
      var facebookSocial =new Social()
      var linkedinSocial =new Social()

     twitterSocial.name ='Twitter'
     twitterSocial.link =this.societeForm.controls['twitter'].value
     facebookSocial.name ='Facebook'
     facebookSocial.link =this.societeForm.controls['facebook'].value
     linkedinSocial.name ='LinkedIN'
     linkedinSocial.link =this.societeForm.controls['linkedin'].value
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
              social.link = this.societeForm.controls['twitter'].value
           }
           if(social.name == 'Facebook')
           {
              social.link = this.societeForm.controls['facebook'].value
           }
           if(social.name == 'LinkedIN')
           {
              social.link = this.societeForm.controls['linkedin'].value
           }

          }

        });

      }else
      {

        var twitterSocial =new Social()
        var facebookSocial =new Social()
        var linkedinSocial =new Social()

         twitterSocial.name ='Twitter'
         twitterSocial.link =this.societeForm.controls['twitter'].value
         facebookSocial.name ='Facebook'
         facebookSocial.link =this.societeForm.controls['facebook'].value
         linkedinSocial.name ='LinkedIN'
         linkedinSocial.link =this.societeForm.controls['linkedin'].value

         this.socialList =new Array<Social>()

         this.socialList.push(twitterSocial)
         this.socialList.push(facebookSocial)
         this.socialList.push(linkedinSocial)

      }
    }

  }

  setFormValues() {
    this.societeForm.patchValue({
      name: this.societe.name,
      ntva: this.societe.ntva,
      siren: this.societe.siren,
      codeNaf: this.societe.codeNaf,
      website: this.societe.website,
      language: this.societe.language,

    //++
    prospect:this.societe.prospect,
    societeType:this.societe.societeType,
    secteur:this.societe.secteur,
    note:this.societe.note

  });

  if(this.societe.secteur)
    this.societeForm.controls['secteur'].setValue(this.societe.secteur.name);
    if(this.societe.socialList.length >0)
    {
      this.societeForm.controls['twitter'].setValue(this.societe.socialList[0].link)
      this.societeForm.controls['facebook'].setValue(this.societe.socialList[1].link)
      this.societeForm.controls['linkedin'].setValue(this.societe.socialList[2].link)

    }



  }

  findSecteurById(id: number): Secteur | undefined {
    return this.secteurList.find(secteur => secteur.id === id);
  }

  //++
  setSoial(){

   if(this.socialList)
    this.socialList.forEach( (social) => {

      if(social.link){
        social.societe =this.societe;
        this.socialService.addSocial(social).subscribe({
          next: (data) => (social = data),
          error: (e) => console.log(e),
          complete: () => {
        },
        })
      }
    });

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
