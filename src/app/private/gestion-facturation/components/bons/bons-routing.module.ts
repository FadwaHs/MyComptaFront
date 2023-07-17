import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BonsComponent } from './bons.component';

const routes: Routes = [{ path: '', component: BonsComponent },
{
  path: 'livraison',
        loadChildren: () =>
          import('./livraison/livraison.module').then(
            (m) => m.LivraisonModule
          ),
}
,
{
  path: 'commande',
        loadChildren: () =>
          import('./commande/commande.module').then(
            (m) => m.CommandeModule
          ),
},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BonsRoutingModule { }
