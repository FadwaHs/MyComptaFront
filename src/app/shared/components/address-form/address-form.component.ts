import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { FormGroupService } from 'src/app/shared/services/form-group.service';
import { AddressService } from '../../../private/http/address.service';
import { Address } from '../../../private/models/address';
import { Client } from '../../../private/models/client';
import { Societe } from '../../../private/models/societe';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit {

  @Input()
  for : 'C' | 'S'

  addressForm: FormGroup;
  controls: Array<string> = ['complementAddress0'];
  readonly max = 4;
  readonly min = 1;
  counter: number = 0;
  address: Address = new Address();

  constructor(
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private formSevice : FormGroupService
  ) {}

  ngOnInit(): void {
    this.inisializeForm();
  }

  inisializeForm() {
    this.addressForm = this.formBuilder.group({
      address: null,
      complementAddress0: null,
      codePostal: null,
      city: null,
      country: null,
    });
  }

  addAddressInput(i: number) {
    i++;
    if (this.controls.length < this.max) {
      this.counter++;
      this.controls.splice(i, 0, 'complementAddress' + this.counter);
      this.addressForm.addControl(
        'complementAddress' + this.counter,
        new FormControl('')
      );
    }
  }

  deleteAddressInput(i: number) {
    if (this.controls.length > this.min) {
      this.addressForm.removeControl(this.controls[i]);
      this.controls.splice(i, 1);
    }
  }

  async onSubmit(data: Societe | Client, isAddMode : boolean){

    
    
    this.addressForm = this.formSevice.trimFormValues(this.addressForm)
    if (this.formSevice.checkForm(this.addressForm)) {
      
      if (this.for =='S') this.address.societe = data as Societe
      else if (this.for =='C') this.address.client = data as Client
      else return 
      this.getFormValue()

      if(isAddMode || !this.address.id){
        this.createNewAddress();
      }else{
        this.updateAddress()
      }
    }else{
      if(this.address.id){
        this.deleteAddress()
      }
    }
    
  }

  createNewAddress(){
      this.addressService.addAddress(this.address).subscribe({
        error : e => console.log(e),
      })
  }
  async deleteAddress(){
    if(this.address.id){
      await firstValueFrom( this.addressService.deleteAddressById(this.address.id) )
    .catch(e => console.log(e))
    }
    
  }

  updateAddress(){
    this.addressService.updateAddressById(this.address.id,this.address).subscribe({
      next : res => this.address = res,
      error : e => console.log(e)

    })
  }



  getFormValue(){
    this.address.address = this.addressForm.controls['address'].value;
    this.address.codePostal = this.addressForm.controls['codePostal'].value;
    this.address.city = this.addressForm.controls['city'].value;
    this.address.country = this.addressForm.controls['country'].value;
    this.address.complementAddress = new Array<string>()
    this.controls.forEach(control =>{
      this.address.complementAddress.push(this.addressForm.controls[control].value)
    })
  }

  setFormValues(address : Address) {
    this.address = address
    this.addressForm.patchValue({
      address: this.address.address,
      complementAddress0: this.address.complementAddress[0],
      codePostal: this.address.codePostal,
      city: this.address.city,
      country: this.address.country
    });

    for (let i = 1; i < this.address.complementAddress.length; i++) {
      this.addAddressInput(i)
      this.addressForm.controls['complementAddress'+i].setValue(this.address.complementAddress[i])
    }
    
  }

  test(){
    
  }

}
