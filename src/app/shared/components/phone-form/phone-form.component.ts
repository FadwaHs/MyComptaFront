import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { PhoneService } from 'src/app/private/gestion-facturation/http/phone.service';
import { Client } from 'src/app/private/gestion-facturation/models/client';
import { Fournisseur } from 'src/app/private/gestion-facturation/models/fournisseur';
import { Phone } from 'src/app/private/gestion-facturation/models/phone';
import { Societe } from 'src/app/private/gestion-facturation/models/societe';
import { FormGroupService } from 'src/app/shared/services/form-group.service';


@Component({
  selector: 'app-phone-form',
  templateUrl: './phone-form.component.html',
  styleUrls: ['./phone-form.component.scss'],
})
export class PhoneFormComponent implements OnInit {

  @Input()
  for: 'C' | 'S'| 'FR'; // added fr here

  phoneForm: FormGroup;
  controls: Array<string> = ['phoneNumber0'];
  readonly max = 4;
  readonly min = 1;
  counter: number = 0;
  phones: Array<Phone>

  constructor(
    private formBuilder: FormBuilder,
    private phoneService: PhoneService,
    private formService: FormGroupService
  ) {}

  ngOnInit(): void {
    this.inisializeForm();
  }

  inisializeForm() {
    this.phoneForm = this.formBuilder.group({
      phoneNumber0: '',
    });
  }

  addPhoneInput(i: number) {
    i++;
    if (this.controls.length < this.max) {
      this.counter++;
      this.controls.splice(i, 0, 'phoneNumber' + this.counter);
      this.phoneForm.addControl(
        'phoneNumber' + this.counter,
        new FormControl('')
      );
    }
  }

  deletePhoneInput(i: number) {
    if (this.controls.length > this.min) {
      this.phoneForm.removeControl(this.controls[i]);
      this.controls.splice(i, 1);
    }
  }

  setFormValues(phoneList: Phone[]) {

    this.phones = phoneList
    this.phoneForm.patchValue({
      phoneNumber0: this.phones[0].phoneNumber,
    });

    for (let i = 1; i < this.phones.length; i++) {
      this.addPhoneInput(i)
      this.phoneForm.controls['phoneNumber'+i].setValue(this.phones[i].phoneNumber)

    }
  }
// added fournisseur here
  async onSubmit(data: Societe | Client | Fournisseur, isAddMode : boolean) {
    this.phoneForm = this.formService.trimFormValues(this.phoneForm);
    if(this.formService.checkForm(this.phoneForm)){

      if(!isAddMode && this.phones){
        await this.deleteOldPhones();
      }

      this.getFormValue();

      this.phones.forEach((phone) => {

        if (this.for == 'S') phone.societe = data as Societe;
        else if (this.for == 'C') phone.client = data as Client;
        else if(this.for == 'FR') phone.fournisseur = data as Fournisseur
        else return

        this.phoneService.addPhone(phone).subscribe({
          next: (res) => phone = res,
          error: (e) => console.log(e),
        });

      });
    }
    else{

      if(this.phones){
        this.deleteOldPhones()
      }

    }
  }

  getFormValue() {
    this.phones = new Array<Phone>()
    this.controls.forEach((control) => {
      if (
        this.formService.checkOneControl(this.phoneForm.controls[control].value as string)
      ) {
        var phone = new Phone();
        phone.phoneNumber = this.phoneForm.controls[control].value;
        this.phones.push(phone);
      }
    });
  }

  async deleteOldPhones(){
    for(let i = 0; i < this.phones.length; i++) {
      await firstValueFrom( this.phoneService.deletePhoneById(this.phones[i].id) ).catch( e =>{
        console.log(e)
      })
    }
  }

  // numberOnly(event : any): boolean {
  //   const charCode = event.which ? event.which : event.keyCode;
  //   if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 43) {
  //     return false;
  //   }
  //   return true;
  // }

}
