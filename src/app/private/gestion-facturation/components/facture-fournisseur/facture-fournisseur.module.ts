import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactureFournisseurRoutingModule } from './facture-fournisseur-routing.module';
import { FactureFournisseurComponent } from './facture-fournisseur.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FactureFournisseurComponent
  ],
  imports: [
    CommonModule,
    FactureFournisseurRoutingModule,
    SharedModule
  ]
})
export class FactureFournisseurModule { }
