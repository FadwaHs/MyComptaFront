import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditSimpleComponent } from './add-edit-simple/add-edit-simple.component';
import { ShowSimpleComponent } from './show-simple/show-simple.component';
import { SimpleComponent } from './simple.component';

const routes: Routes = [
  {
    path:'',
    component:SimpleComponent
  },
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
export class SimpleRoutingModule { }
