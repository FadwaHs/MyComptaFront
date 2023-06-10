import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleFournisseurComponent } from './simple-fournisseur.component';
import { ShowSimpleComponent } from './show-simple/show-simple.component';
import { AddEditSimpleComponent } from './add-edit-simple/add-edit-simple.component';

const routes: Routes = [{ path: '', component: SimpleFournisseurComponent },
{
  path: 'add',
  component: AddEditSimpleComponent
},
{
  path:'edit/:id-slug',
  component: AddEditSimpleComponent
},
{

  path:'show/:id-slug',
  component: ShowSimpleComponent
}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimpleFournisseurRoutingModule { }
