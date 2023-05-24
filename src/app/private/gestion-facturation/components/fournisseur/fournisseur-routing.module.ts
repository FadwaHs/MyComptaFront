import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AddEditFournisseurComponent } from './add-edit-fournisseur/add-edit-fournisseur.component';
import { ShowFournisseurComponent } from './show-fournisseur/show-fournisseur.component';
import { FournisseurComponent } from './fournisseur.component';

const routes: Routes = [
  {
    path: '',
    component: FournisseurComponent,
  },
  {
    path: 'add',
    component: AddEditFournisseurComponent,
  },
  {
    path: 'edit/:id',
    component: AddEditFournisseurComponent,
  },
  {
    path: 'show/:id',
    component: ShowFournisseurComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FournisseurRoutingModule {}
