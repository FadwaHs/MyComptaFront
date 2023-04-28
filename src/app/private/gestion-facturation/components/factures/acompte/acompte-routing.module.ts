import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcompteComponent } from './acompte.component';
import { AddEditAcompteComponent } from './add-edit-acompte/add-edit-acompte.component';
import { ShowAcompteComponent } from './show-acompte/show-acompte.component';

const routes: Routes = [
  {
    path:'',
    component:AcompteComponent
  },
  {
    path: 'add',
    component: AddEditAcompteComponent
  },
  {
    path:'edit/:id-slug',
    component: AddEditAcompteComponent
  },
  {

    path:'show/:id-slug',
    component: ShowAcompteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcompteRoutingModule { }
