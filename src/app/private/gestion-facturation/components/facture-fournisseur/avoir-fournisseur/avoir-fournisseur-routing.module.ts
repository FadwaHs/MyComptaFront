import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvoirFournisseurComponent } from './avoir-fournisseur.component';
import { AddEditAvoirComponent } from './add-edit-avoir/add-edit-avoir.component';
import { ShowAvoirComponent } from './show-avoir/show-avoir.component';

const routes: Routes = [{ path: '', component: AvoirFournisseurComponent} ,
{
  path: 'add',
  component: AddEditAvoirComponent
},
{
  path:'edit/:id-slug',
  component: AddEditAvoirComponent
},
{

  path:'show/:id-slug',
  component: ShowAvoirComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvoirFournisseurRoutingModule { }
