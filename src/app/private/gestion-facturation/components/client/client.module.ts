import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { AddEditClientComponent } from './add-edit-client/add-edit-client.component';
import { ShowClientComponent } from './show-client/show-client.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrivateModule } from 'src/app/private/private.module';


@NgModule({
  declarations: [
    ClientComponent,
    AddEditClientComponent,
    ShowClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
  ]
})
export class ClientModule {

}
