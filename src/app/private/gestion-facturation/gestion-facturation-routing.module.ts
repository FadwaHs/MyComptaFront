import { FactureFournisseurComponent } from './components/facture-fournisseur/facture-fournisseur.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dash-board/dashboard/dashboard.component';
import { GestionFacturationComponent } from './gestion-facturation.component';
import { FacturesModule } from './components/factures/factures.module';

const routes: Routes = [
  {
    path: '',
    component: GestionFacturationComponent,
  },
  {
    path: 'societes',
    loadChildren: () =>
      import('./components/societe/societe.module').then(
        (m) => m.SocieteModule
      ),
  },
  {
    path: 'clients',
    loadChildren: () =>
      import('./components/client/client.module').then((m) => m.ClientModule),
  },
  {
    path: 'fournisseurs',
    loadChildren: ()=>
    import('./components/fournisseur/fournisseur.module').then((m) => m.FournisseurModule),
  },
  {
    path: 'devis',
    loadChildren: () =>
      import('./components/devis/devis.module').then((m) => m.DevisModule),
  },
  {
    path : 'factures',
    loadChildren: () =>
    import('./components/factures/factures.module').then((m) => m.FacturesModule),

  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./components/settings/settings.module').then(
        (m) => m.SettingsModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./components/dash-board/dash-board.module').then(
        (m) => m.DashBoardModule
      ),
  },
  {
    path: 'opportunites',
    loadChildren: () =>
      import('./components/opportunite/opportunite.module').then(
        (m) => m.OpportuniteModule
      ),
  },
  {
    path: 'pipeline',
    loadChildren: () =>
      import('./components/pipeline/pipeline.module').then(
        (m) => m.PipelineModule
      ),
  },
  {
    path: 'bons',
    loadChildren: () =>
      import('./components/bons/bons.module').then(
        (m) => m.BonsModule
      ),
  },

  { 
    path: 'factures-fournisseur',
    loadChildren: ()=>
    import('./components/facture-fournisseur/facture-fournisseur.module').then((m) => m.FactureFournisseurModule),
  },

  {
    path: 'pdf',
    loadChildren: ()=>
    import('./components/pdf/pdf.module').then((m) => m.PdfModule),
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionFacturationRoutingModule {}
