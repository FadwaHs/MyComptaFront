import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionFacturationRoutingModule } from './gestion-facturation-routing.module';
import { GestionFacturationComponent } from './gestion-facturation.component';




@NgModule({
  declarations: [
    GestionFacturationComponent
  ],
  imports: [
    CommonModule,
    GestionFacturationRoutingModule
  ]
})
export class GestionFacturationModule { }
