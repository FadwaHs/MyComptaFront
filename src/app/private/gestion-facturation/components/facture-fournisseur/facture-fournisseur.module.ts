import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactureFournisseurRoutingModule } from './facture-fournisseur-routing.module';
import { FactureFournisseurComponent } from './facture-fournisseur.component';


@NgModule({
  declarations: [
    FactureFournisseurComponent
  ],
  imports: [
    CommonModule,
    FactureFournisseurRoutingModule
  ]
})
export class FactureFournisseurModule { }
