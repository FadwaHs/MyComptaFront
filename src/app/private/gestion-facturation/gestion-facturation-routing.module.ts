import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
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
