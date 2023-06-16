import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvoirFournisseurRoutingModule } from './avoir-fournisseur-routing.module';
import { AvoirFournisseurComponent } from './avoir-fournisseur.component';
import { ShowAvoirComponent } from './show-avoir/show-avoir.component';
import { AddEditAvoirComponent } from './add-edit-avoir/add-edit-avoir.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AvoirFournisseurComponent,
    ShowAvoirComponent,
    AddEditAvoirComponent
  ],
  imports: [
    CommonModule,
    AvoirFournisseurRoutingModule,
    SharedModule
  ]
})
export class AvoirFournisseurModule { }
