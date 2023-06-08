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
  languages: string[] = ['Français', 'English'];
  defaultLang: string = 'Français';
  fournisseur: Fournisseur = new Fournisseur();
  societes: Array<Societe> = new Array<Societe>();
  fournisseurForm: FormGroup;
  isAddMode: boolean = true;
  isPar : boolean ;



  constructor(
    private formBuilder: FormBuilder,
    private fournisseurService: FournisseurService,
    private societeService :SocieteService,
    private addressService :AddressService,
    private router: Router,
    private route: ActivatedRoute,
    protected navigate : NavigateService

  ) {}




  async ngOnInit(): Promise<void> {

    if (this.route.snapshot.url[0].path == 'edit') {

      this.isAddMode = false;
      this.verifyRouteAndGetFournisseur();
    }
    this.initializeForms();
  }



  async verifyRouteAndGetFournisseur() {
    [this.id, this.slug] = await this.route.snapshot.params['id-slug'].split('-');
    this.id = +this.id;
    console.log(this.id,'ccc')
    if (this.id) {
      this.fournisseurService.getFournisseurById(this.id).subscribe({
        next: (data) => (this.fournisseur = data),
        error: (err) => console.log(err),
        complete: () => {

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
      language: [this.defaultLang, Validators.required],
      note: null
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
  setSocietes() {
    this.societeService.getAllSocietes().subscribe({
      next : res => this.societes = res,
      error : e => console.log(e),
    })
    // throw new Error('Method not implemented.');
  }
  setOtherForms(){
    setTimeout(() => {
      if(this.isPar && this.fournisseur.address) this.childAddress.setFormValues(this.fournisseur.address)
      if(this.fournisseur.motCleList.length) this.childKeyWord.setFormValues(this.fournisseur.motCleList)
      if(this.fournisseur.phoneList.length)this.childPhone.setFormValues(this.fournisseur.phoneList)
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
      // this.router.navigateByUrl(this.navigate.f_fournisseurPath);
    } else {
      console.log('Invalid Form');
    }
    this.router.navigateByUrl(this.navigate.f_fournisseurPath);
  }




  createNewFournisseur() {
    this.fournisseurService.createFournisseur(this.fournisseur).subscribe({
      next: (data) => (this.fournisseur = data),
      error: (e) => console.log(e),
      complete: () => {
        this.submitOtherForms();

      },
    });
  }
  updateFournisseur() {
    this.fournisseurService.updateFournisseur(this.fournisseur.id,this.fournisseur).subscribe({
      next: (data) => (this.fournisseur = data),
      error: (e) => console.log(e),
      complete: () => {
        this.submitOtherForms();
      },
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
      language: this.fournisseur.language,
      note: this.fournisseur.note,
    });

    if(this.isPar) this.fournisseurForm.controls['website'].setValue(this.fournisseur.website)
    else this.fournisseurForm.controls['societe'].setValue(this.fournisseur.societe)

  }

  getFormValues() {
     this.fournisseur.firstName = this.fournisseurForm.controls['firstName'].value;
    this.fournisseur.lastName = this.fournisseurForm.controls['lastName'].value;
    this.fournisseur.email = this.fournisseurForm.controls['email'].value;
    this.fournisseur.function = this.fournisseurForm.controls['function'].value;
    this.fournisseur.reference = this.fournisseurForm.controls['reference '].value;
    this.fournisseur.language = this.fournisseurForm.controls['language'].value;
    this.fournisseur.note = this.fournisseurForm.controls['note'].value;
    if(this.isPar){
      this.fournisseur.website = this.fournisseurForm.controls['website'].value
      delete this.fournisseur.societe
    }
    else{
      this.fournisseur.societe = this.fournisseurForm.controls['societe'].value;
      delete  this.fournisseur.website

    }
  }

}
