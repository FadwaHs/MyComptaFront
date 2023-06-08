import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { PhoneService } from 'src/app/private/gestion-facturation/http/phone.service';
import { Client } from 'src/app/private/gestion-facturation/models/client';
import { Fournisseur } from 'src/app/private/gestion-facturation/models/fournisseur';
import { Phone } from 'src/app/private/gestion-facturation/models/phone';
import { Societe } from 'src/app/private/gestion-facturation/models/societe';
import { FormGroupService } from 'src/app/shared/services/form-group.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';




@Component({
  selector: 'app-phone-form',
  templateUrl: './phone-form.component.html',
  styleUrls: ['./phone-form.component.scss'],
})


export class PhoneFormComponent implements OnInit {

  selectedCountryISO: CountryISO = CountryISO.Morocco;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;

  preferredCountries: CountryISO[] = [CountryISO.Morocco,
   CountryISO.Guinea];

  @Input()
  for: 'C' | 'S' | 'FR'; // added fr here

  phoneForm: FormGroup;
  controls: Array<string> = ['phoneNumber0'];
  readonly max = 4;
  readonly min = 1;
  counter: number = 0;
  phones = new Array<Phone>();

  constructor(
    private formBuilder: FormBuilder,
    private phoneService: PhoneService,
    private formService: FormGroupService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

 initializeForm() {
  this.phoneForm = this.formBuilder.group({});
  for (let i = 0; i < this.controls.length; i++) {
    const controlName = this.controls[i];
    this.phoneForm.addControl(controlName, this.formBuilder.control('', Validators.required));
  }
}




    addPhoneInput(i: number) {
      if (this.controls.length < this.max) {
        const controlName = 'phoneNumber' + (this.controls.length);
        this.controls.push(controlName);

        this.phoneForm.addControl(controlName, this.formBuilder.control('', Validators.required));
      }
  }

  deletePhoneInput(i: number) {
    if (this.controls.length > this.min) {
      this.phoneForm.removeControl(this.controls[i]);
      this.controls.splice(i, 1);
    }
  }



  setFormValues(phoneList: Phone[]) {
    this.phones = phoneList;

    for (let i = 0; i < this.phones.length; i++) {
      const controlName = 'phoneNumber' + i;
      const phoneNumber = this.phones[i].phoneNumber;

      const phoneNumberControl = this.phoneForm.get(controlName);
      if (phoneNumberControl) {
        phoneNumberControl.setValue(phoneNumber);
      } else {
        this.phoneForm.addControl(controlName, this.formBuilder.control(phoneNumber, Validators.required));
        this.controls.push(controlName);
      }
    }
  }



  async onSubmit(data: Societe | Client | Fournisseur, isAddMode: boolean) {
    this.phoneForm = this.formService.trimFormValues(this.phoneForm);

    if (this.formService.checkForm(this.phoneForm)) {
      if (!isAddMode && this.phones) {
        await this.deleteOldPhones();
      }

      this.getFormValue();

      for (let i = 0; i < this.phones.length; i++) {
        const phone = this.phones[i];

        if (this.for == 'S') phone.societe = data as Societe;
        else if (this.for == 'C') phone.client = data as Client;
        else if (this.for == 'FR') phone.fournisseur = data as Fournisseur;
        else return;

        await this.phoneService.addPhone(phone).toPromise().then(res => {
          this.phones[i] = res;
        }).catch(e => {
          console.log(e);
        });
      }
    } else {
      if (this.phones) {
        await this.deleteOldPhones();
      }
    }
  }

  getFormValue() {

    this.phones = [];

    for (let i = 0; i < this.controls.length; i++) {
      const controlName = this.controls[i];
      const phoneNumberControl = this.phoneForm.get(controlName);

      if (phoneNumberControl) {
        const phoneNumber = phoneNumberControl.value.number; // Access the 'number' property

        console.log('Control Name:', controlName);
        console.log('Phone Number Control:', phoneNumberControl);
        console.log('Phone Number:', phoneNumber);

        if (phoneNumber && this.formService.checkOneControl(phoneNumber)) {
          const phone = new Phone();
          phone.phoneNumber = phoneNumber;
          this.phones.push(phone);
        }
      }
    }

    console.log(this.phones, 'ppp');
  }

  async deleteOldPhones() {
    for (let i = 0; i < this.phones.length; i++) {
      await firstValueFrom(this.phoneService.deletePhoneById(this.phones[i].id)).catch((e) => {
        console.log(e);
      });
    }
  }
}

