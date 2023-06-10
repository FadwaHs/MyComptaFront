import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Fournisseur } from '../../../models/fournisseur';
import { Societe } from '../../../models/societe';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import { AddressFormComponent } from 'src/app/shared/components/address-form/address-form.component';
import { KeyWordFormComponent } from 'src/app/shared/components/key-word-form/key-word-form.component';
import { PhoneFormComponent } from 'src/app/shared/components/phone-form/phone-form.component';
import { FournisseurService } from '../../../http/fournisseur.service';
import { AddressService } from '../../../http/address.service';
import { SocieteService } from '../../../http/societe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Social } from '../../../models/social';
import { SocialService } from '../../../http/social.service';
import { CompteChargeService } from '../../../http/compteCharge.service';
import { CompteTiersService } from '../../../http/compteTiers.service';
import { CompteCharge } from '../../../models/compte_charge';
import { CompteTiers } from '../../../models/compte_tiers';

@Component({
  selector: 'app-add-edit-fournisseur',
  templateUrl: './add-edit-fournisseur.component.html',
  styleUrls: ['./add-edit-fournisseur.component.scss']
})
export class AddEditFournisseurComponent {
  @ViewChild(AddressFormComponent)
  childAddress: AddressFormComponent;

  @ViewChild(PhoneFormComponent)
  childPhone:PhoneFormComponent;

  @ViewChild(KeyWordFormComponent)
  childKeyWord: KeyWordFormComponent;

  id: number;
  slug: string;
  fournisseur: Fournisseur = new Fournisseur();
  societes: Array<Societe> = new Array<Societe>();
  fournisseurForm: FormGroup;
  isAddMode: boolean = true;
  isPar : boolean ;
  //++
  socialList :Array<Social>
  compteTiersList:CompteTiers[]
  comptechargeList:CompteCharge[]


  constructor(
    private formBuilder: FormBuilder,
    private fournisseurService: FournisseurService,
    private societeService :SocieteService,
    private addressService :AddressService,
    private socialService : SocialService,
    private compteChargeService :CompteChargeService,
    private compteTiersService : CompteTiersService,
    private router: Router,
    private route: ActivatedRoute,
    protected navigate : NavigateService
  ) {}




  async ngOnInit(): Promise<void> {

    this.initializeForms();
    this.initCompteTiers();
    this.initComptecharge();

    // for edit url
    if (this.route.snapshot.url[0].path == 'edit') {

      this.isAddMode = false;

     this.verifyRouteAndGetFournisseur();
    }

  }



  initComptecharge() {
    this.compteChargeService.getAllCompteCharge().subscribe({
      next: (data) => (this.comptechargeList= data),
      error: (err) => console.log(err),
      complete: () => {
      },
    });

  }

  initCompteTiers() {
    this.compteTiersService.getAllCompteTiers().subscribe({
      next: (data) => (this.compteTiersList= data),
      error: (err) => console.log(err),
      complete: () => {
      },
    });

  }


  async verifyRouteAndGetFournisseur() {


    const idSlug = this.route.snapshot.url[1].path;
    const [id] = idSlug.split('-');
    this.id = parseInt(id, 10);


    if (this.id) {
      this.fournisseurService.getFournisseurById(this.id).subscribe({
        next: (data) => (this.fournisseur = data),
        error: (err) => console.log(err),
        complete: () => {

          this.socialList = this.fournisseur.socialList

          this.checkSlug();
          if(this.fournisseur.societe) this.toProfessionel()
          else this.toParticulier();
           this.setFormValues();
           this.setOtherForms()
        },
      });

    } else {
      this.router.navigateByUrl(this.navigate.f_fournisseurPath);
    }
  }

  checkSlug() {
    if (this.fournisseur.slug != this.slug)
      this.router.navigateByUrl(this.navigate.toEditPath('FR',this.id,this.fournisseur.slug));

  }


  initializeForms() {
    this.fournisseurForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: null,
      function: null,
      reference: null,
      note: null,
      twitter:null,
      facebook:null,
      linkedin:null,
      societe:null,
      compteTiers:null,
      compteCharge : null
    });
  }


  toParticulier(){
    this.isPar = true;
    if(this.fournisseurForm.controls['societe']){
      this.fournisseurForm.removeControl('societe')
    }
    if(!this.fournisseurForm.controls['website']){
      this.fournisseurForm.addControl('website' ,new FormControl(null))
    }
    if(!this.isAddMode) {
      this.setOtherForms()
    }
  }

  toProfessionel(){
    this.isPar = false;
    if(!this.fournisseurForm.controls['societe']){
      this.fournisseurForm.addControl('societe' ,new FormControl( null,Validators.required))
      if(!this.societes.length){
        this.setSocietes();

        console.log(this.societes,'s')
      }
    }
    if(this.fournisseurForm.controls['website']){
      this.fournisseurForm.removeControl('website')
    }

    if(!this.isAddMode){
      this.setFormValues()
      this.setOtherForms()
    }
  }

  // import all societes
  setSocietes() {
    this.societeService.getAllSocietes().subscribe({
      next : res => this.societes = res,
      error : e => console.log(e),
    })
  }

  // for edit mode
  setOtherForms(){
    setTimeout(() => {
      if(this.isPar && this.fournisseur.address) this.childAddress.setFormValues(this.fournisseur.address)
      if(this.fournisseur.phoneList.length)this.childPhone.setFormValues(this.fournisseur.phoneList)
      if(this.fournisseur.motCleList.length) this.childKeyWord.setFormValues(this.fournisseur.motCleList)

    }, 1);

  }

  onSubmit() {

    if (this.fournisseurForm.valid) {

      this.getFormValues();
      if (this.isAddMode) {
        this.createNewFournisseur();
      } else {
       this.updateFournisseur();
      }
    } else {
      console.log('Invalid Form');
    }

  }


  createNewFournisseur() {
    this.fournisseurService.createFournisseur(this.fournisseur).subscribe({
      next: (data) => (this.fournisseur = data),
      error: (e) => console.log(e),
      complete: () => {

        this.setSoial();
        this.submitOtherForms();

      },
    });
  }


  updateFournisseur() {
    this.fournisseurService.updateFournisseur(this.fournisseur.id,this.fournisseur).subscribe({
      next: (data) => (this.fournisseur = data),
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
      social.fournisseur = this.fournisseur
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


  // add social object
  setSoial(){
    if(this.socialList)
    this.socialList.forEach( (social) => {

      if(social.link){
        social.fournisseur =this.fournisseur; //affectation du fournisser
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

    var fournisseur : Fournisseur = new Fournisseur()
    fournisseur.id = this.fournisseur.id

    if(this.isPar) await this.childAddress.onSubmit(fournisseur,this.isAddMode);
    else this.deleteAddress();
    await this.childKeyWord.onSubmit(fournisseur,this.isAddMode);
    await this.childPhone.onSubmit(fournisseur,this.isAddMode);
    this.router.navigateByUrl(this.navigate.f_fournisseurPath);
  }

  deleteAddress(){
    if(this.fournisseur.address && this.fournisseur.address.id){
      this.addressService.deleteAddressById(this.fournisseur.address.id).subscribe({
        error : e=> console.log(e)
      })
    }
  }

  setFormValues() {
    this.fournisseurForm.patchValue({
      firstName: this.fournisseur.firstName,
      lastName: this.fournisseur.lastName,
      email: this.fournisseur.email,
      function: this.fournisseur.function,
      reference: this.fournisseur.reference,
      note: this.fournisseur.note,
      compteTiers:this.fournisseur.compteTiers,
      compteCharge:this.fournisseur.compteCharge,


    });

    if(this.isPar) this.fournisseurForm.controls['website'].setValue(this.fournisseur.website)
    else this.fournisseurForm.controls['societe'].setValue(this.fournisseur.societe)
    if(this.fournisseur.socialList.length >  0 )
    {
      this.fournisseurForm.controls['twitter'].setValue(this.fournisseur.socialList[0].link)
      this.fournisseurForm.controls['facebook'].setValue(this.fournisseur.socialList[1].link)
      this.fournisseurForm.controls['linkedin'].setValue(this.fournisseur.socialList[2].link)

    }


  }



  getFormValues() {

    this.fournisseur.firstName = this.fournisseurForm.controls['firstName'].value;
    this.fournisseur.lastName = this.fournisseurForm.controls['lastName'].value;
    this.fournisseur.email = this.fournisseurForm.controls['email'].value;
    this.fournisseur.function = this.fournisseurForm.controls['function'].value;
    this.fournisseur.reference = this.fournisseurForm.controls['reference'].value;
    this.fournisseur.note = this.fournisseurForm.controls['note'].value;
    this.fournisseur.compteTiers = this.fournisseurForm.controls['compteTiers'].value as CompteTiers;
    this.fournisseur.compteCharge = this.fournisseurForm.controls['compteCharge'].value as CompteCharge;

    if(this.isPar){
      this.fournisseur.website = this.fournisseurForm.controls['website'].value
      delete this.fournisseur.societe
    }
    else{
      this.fournisseur.societe = this.fournisseurForm.controls['societe'].value;
      delete  this.fournisseur.website

    }

    if(this.isAddMode)
    {
      var twitterSocial =new Social()
      var facebookSocial =new Social()
      var linkedinSocial =new Social()

       twitterSocial.name ='Twitter'
       twitterSocial.link =this.fournisseurForm.controls['twitter'].value
       facebookSocial.name ='Facebook'
       facebookSocial.link =this.fournisseurForm.controls['facebook'].value
       linkedinSocial.name ='LinkedIN'
       linkedinSocial.link =this.fournisseurForm.controls['linkedin'].value

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
              social.link = this.fournisseurForm.controls['twitter'].value
           }
           if(social.name == 'Facebook')
           {
              social.link = this.fournisseurForm.controls['facebook'].value
           }
           if(social.name == 'LinkedIN')
           {
              social.link = this.fournisseurForm.controls['linkedin'].value
           }

          }

        });

      }else
      {

        var twitterSocial =new Social()
        var facebookSocial =new Social()
        var linkedinSocial =new Social()

         twitterSocial.name ='Twitter'
         twitterSocial.link =this.fournisseurForm.controls['twitter'].value
         facebookSocial.name ='Facebook'
         facebookSocial.link =this.fournisseurForm.controls['facebook'].value
         linkedinSocial.name ='LinkedIN'
         linkedinSocial.link =this.fournisseurForm.controls['linkedin'].value

         this.socialList =new Array<Social>()

         this.socialList.push(twitterSocial)
         this.socialList.push(facebookSocial)
         this.socialList.push(linkedinSocial)

      }
    }
  }

}
