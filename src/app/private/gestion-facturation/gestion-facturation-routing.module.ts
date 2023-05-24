import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GestionFacturationComponent } from './gestion-facturation.component';

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
    children:[
      {
        path: 'simple',
        loadChildren: () =>
          import('./components/facture/simple/simple.module').then(
            (m) => m.SimpleModule
          ),
      },
      {
        path: 'avoir',
        loadChildren: () =>
          import('./components/facture/avoir/avoir.module').then(
            (m) => m.AvoirModule
          ),
      },
      {
        path: 'acompte',
        loadChildren: () =>
          import('./components/facture/acompte/acompte.module').then(
            (m) => m.AcompteModule
          ),
      },
      {
        path: '',
        redirectTo:'simple',
        pathMatch:'full'
      }
    ]
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./components/settings/settings.module').then(
        (m) => m.SettingsModule
      ),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionFacturationRoutingModule {}
