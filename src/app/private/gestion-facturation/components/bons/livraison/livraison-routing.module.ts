import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivraisonComponent } from './livraison.component';
import { AddEditLivraisonComponent } from './add-edit-livraison/add-edit-livraison.component';
import { ShowLivraisonComponent } from './show-livraison/show-livraison.component';

const routes: Routes = [{ path: '', component: LivraisonComponent },
{
  path: 'add',
  component: AddEditLivraisonComponent
},
{
  path:'edit/:id-slug',
  component: AddEditLivraisonComponent
},
{

  path:'show/:id-slug',
  component: ShowLivraisonComponent
}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivraisonRoutingModule { }
