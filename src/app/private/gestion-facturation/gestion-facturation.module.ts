import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionFacturationRoutingModule } from './gestion-facturation-routing.module';
import { GestionFacturationComponent } from './gestion-facturation.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    GestionFacturationComponent

  ],
  imports: [
    CommonModule,
    GestionFacturationRoutingModule,
    NgSelectModule

  ]
})
export class GestionFacturationModule { }
