import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnvironmentComponent } from './components/environment/environment.component';
import { EspaceComponent } from './components/environment/espace/espace.component';
import { PrivateComponent } from './private.component';

const routes: Routes = [
    {
      path: '',
      component: PrivateComponent,
      children:[
        {
          path: 'environments',
          component: EnvironmentComponent,
        },
        {
          path:"environment/:id-slug",
          children:[
            {
              path:'espaces',
              component : EspaceComponent,

            },{
              path: 'facturation',
                loadChildren: () =>
                  import('./gestion-facturation/gestion-facturation.module').then(
                    (m) => m.GestionFacturationModule
                  ),
              },
              {
                path: 'personnel',
                loadChildren: () =>
                  import('./gestion-personnel/gestion-personnel.module').then(
                    (m) => m.GestionPersonnelModule
                  ),
              },
          ]
        }
        ,
        {
          path : '',
          redirectTo:'environments',
          pathMatch:"full"

        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
