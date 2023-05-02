import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashBoardRoutingModule } from './dash-board-routing.module';
import { DashBoardComponent } from './dash-board.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { ActivitesComponent } from './activites/activites.component';
import { DocumentsComponent } from './documents/documents.component';
import { ChiffreComponent } from './chiffre/chiffre.component';
import { DeboursComponent } from './debours/debours.component';


@NgModule({
  declarations: [
    DashBoardComponent,
    DashboardComponent,
    StatistiquesComponent,
    ActivitesComponent,
    DocumentsComponent,
    ChiffreComponent,
    DeboursComponent
  ],
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    NgSelectModule,
    FormsModule,
  ]
})
export class DashBoardModule { }
