import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./private/private.module').then((m) => m.PrivateModule),
  },
  {
     path: 'departement',
     loadChildren: () =>
      import('./private/gestion-personnel/components/departement/departement.module').then(m => m.DepartementModule)

  },
  {
    path: 'factures',
    loadChildren: () =>
       import('./private/gestion-facturation/components/factures/factures.module').then(m => m.FacturesModule)
  },
  {
    path: 'DashBoard',
    loadChildren: () =>
     import('./private/gestion-facturation/components/dash-board/dash-board.module').then(m => m.DashBoardModule)

  },
  { path: 'opportunite', loadChildren: () => import('./private/gestion-facturation/components/opportunite/opportunite.module').then(m => m.OpportuniteModule) },
  { path: 'pipeline', loadChildren: () => import('./private/gestion-facturation/components/pipeline/pipeline.module').then(m => m.PipelineModule) },
  { path: 'facture-fournisseur', loadChildren: () => import('./private/gestion-facturation/components/facture-fournisseur/facture-fournisseur.module').then(m => m.FactureFournisseurModule) },
  { path: 'simple-fournisseur', loadChildren: () => import('./private/gestion-facturation/components/facture-fournisseur/simple-fournisseur/simple-fournisseur.module').then(m => m.SimpleFournisseurModule) },
  { path: 'avoir-fournisseur', loadChildren: () => import('./private/gestion-facturation/components/facture-fournisseur/avoir-fournisseur/avoir-fournisseur.module').then(m => m.AvoirFournisseurModule) },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
