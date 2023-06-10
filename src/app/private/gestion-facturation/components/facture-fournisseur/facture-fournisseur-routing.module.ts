import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactureFournisseurComponent } from './facture-fournisseur.component';

const routes: Routes = [{ path: '', component: FactureFournisseurComponent },
{
  path: 'simple',
        loadChildren: () =>
          import('./simple-fournisseur/simple-fournisseur.module').then(
            (m) => m.SimpleFournisseurModule
          ),
},
  {
    path: 'avoir',
    loadChildren: () =>
      import('./avoir-fournisseur/avoir-fournisseur.module').then(
        (m) => m.AvoirFournisseurModule
      ),
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactureFournisseurRoutingModule {

 }
