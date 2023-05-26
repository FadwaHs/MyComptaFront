import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ClientService } from 'src/app/private/gestion-facturation/http/client.service';
import { Address } from 'src/app/private/gestion-facturation/models/address';
import { Client } from 'src/app/private/gestion-facturation/models/client';
import { Societe } from 'src/app/private/gestion-facturation/models/societe';
import { AddressService } from '../../../private/gestion-facturation/http/address.service';


@Component({
  selector: 'app-select-client-form',
  templateUrl: './select-client-form.component.html',
  styleUrls: ['./select-client-form.component.scss'],
})
export class SelectClientFormComponent implements OnInit {

  @Input()
  for: 'S';
  clients: Array<Client> = Array<Client>();
  oldSelectedClients: Array<Client>;
  clientForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private addressService: AddressService
  ){}

  ngOnInit(): void {
    this.inializeForm();
    this.setAllClients();
  }



  inializeForm() {
    this.clientForm = this.formBuilder.group({
      clients: null,
    });
  }

  setAllClients() {
    this.clientService.getClientListPar().subscribe({
      next: (data) => (this.clients = data),
      error: (err) => console.log(err.error),
    });
  }

  setFormValues(clientList: Client[]) {
    this.oldSelectedClients = clientList
    this.clientForm.controls['clients'].setValue(this.oldSelectedClients)
    this.clients = [...this.clients,...this.oldSelectedClients]
  }

  async onSubmit(data: Societe, isAddMode : boolean) {
    if (
      this.clientForm.controls['clients'].value != null &&
      this.clientForm.controls['clients'].value.length != 0
    ) {

      if(!isAddMode && this.oldSelectedClients){
        await this.undefineSocieteOfCLients();
      }

      this.clientForm.controls['clients'].value.forEach((client: Client) => {
        client.societe = data as Societe;
        delete client.website
        this.deleteAddress(client.address)
        this.clientService.updateClientById(client.id, client).subscribe({
          error: (e) => console.log(e),
        });
      });

    }

    else{

      if(this.oldSelectedClients){
        this.undefineSocieteOfCLients()
      }

    }
  }

  async undefineSocieteOfCLients(){

    for (let i = 0; i < this.oldSelectedClients.length; i++) {
      delete this.oldSelectedClients[i].societe
      await firstValueFrom( this.clientService.updateClientById(this.oldSelectedClients[i].id, this.oldSelectedClients[i]))
      .catch( e => console.log(e))
    }


  }

  deleteAddress(address : Address){
    if(address && address.id){
      this.addressService.deleteAddressById(address.id).subscribe({
        error : e=> console.log(e)
      })
    }
  }


}
