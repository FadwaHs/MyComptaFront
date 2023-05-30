import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FournisseurRoutingModule } from './fournisseur-routing.module';
import { AddEditFournisseurComponent } from './add-edit-fournisseur/add-edit-fournisseur.component';
import { ShowFournisseurComponent } from './show-fournisseur/show-fournisseur.component';
import { FournisseurComponent } from './fournisseur.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrivateModule } from 'src/app/private/private.module';


@NgModule({
  declarations: [
    FournisseurComponent,
    AddEditFournisseurComponent,
    ShowFournisseurComponent
  ],
  imports: [
    CommonModule,
    FournisseurRoutingModule,
    SharedModule,

  ]
})
export class FournisseurModule { }
