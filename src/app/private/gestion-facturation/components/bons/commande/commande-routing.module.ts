import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandeComponent } from './commande.component';
import { AddEditCommandeComponent } from './add-edit-commande/add-edit-commande.component';
import { ShowCommandeComponent } from './show-commande/show-commande.component';

const routes: Routes = [{ path: '', component: CommandeComponent },
{
  path: 'add',
  component: AddEditCommandeComponent
},
{
  path:'edit/:id-slug',
  component: AddEditCommandeComponent
},
{

  path:'show/:id-slug',
  component: ShowCommandeComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandeRoutingModule { }
