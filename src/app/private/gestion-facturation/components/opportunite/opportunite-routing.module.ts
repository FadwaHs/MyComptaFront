import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpportuniteComponent } from './opportunite.component';
import { AddEditOpportuniteComponent } from './add-edit-opportunite/add-edit-opportunite.component';
import { ShowOpportuniteComponent } from './show-opportunite/show-opportunite.component';

const routes: Routes = [
  { path: '', component: OpportuniteComponent }
  , {
    path: 'add',
    component: AddEditOpportuniteComponent
  },
  {
    path:'edit/:id-slug',
    component: AddEditOpportuniteComponent
  }
  ,
  {
    path:'show/:id-slug',
    component: ShowOpportuniteComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpportuniteRoutingModule { }
