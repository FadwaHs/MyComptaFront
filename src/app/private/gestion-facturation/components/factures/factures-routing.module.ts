import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturesComponent } from './factures.component';

const routes: Routes = [{ path: '', component: FacturesComponent },
{
  path: 'simple',
        loadChildren: () =>
          import('./simple/simple.module').then(
            (m) => m.SimpleModule
          ),
},
  {
    path: 'avoir',
    loadChildren: () =>
      import('./avoir/avoir.module').then(
        (m) => m.AvoirModule
      ),
  },
  {
    path: 'acompte',
    loadChildren: () =>
      import('./acompte/acompte.module').then(
        (m) => m.AcompteModule
      ),
  },
  {
    path: '',
    redirectTo:'factures',
    pathMatch:'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturesRoutingModule { }
