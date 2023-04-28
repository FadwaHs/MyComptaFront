import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./private/private.module').then((m) => m.PrivateModule),
  },
  { path: 'departement', loadChildren: () => import('./private/gestion-personnel/components/departement/departement.module').then(m => m.DepartementModule) },
  { path: 'factures', loadChildren: () => import('./private/gestion-facturation/components/factures/factures.module').then(m => m.FacturesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
