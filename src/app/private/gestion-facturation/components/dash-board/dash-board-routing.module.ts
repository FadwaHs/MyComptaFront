import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { ActivitesComponent } from './activites/activites.component';
import { ChiffreComponent } from './chiffre/chiffre.component';
import { DeboursComponent } from './debours/debours.component';
import { DocumentsComponent } from './documents/documents.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'statistique',
    pathMatch: 'full'
  },
  {
    path: '', component: DashBoardComponent,
    children: [
      { path: 'statistique', component: StatistiquesComponent },
      { path: 'activites', component: ActivitesComponent },
      { path: 'documents', component: DocumentsComponent },
      { path: 'chiffre', component: ChiffreComponent },
      { path: 'debours', component: DeboursComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashBoardRoutingModule { }
