import { DepartementModule } from './components/departement/departement.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionPersonnelRoutingModule } from './gestion-personnel-routing.module';
import { GestionPersonnelComponent } from './gestion-personnel.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DropMenuPerComponent } from './shared-per/components/drop-menu-per/drop-menu-per.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedPerModule } from './shared-per/shared-per.module';


@NgModule({
  declarations: [
    GestionPersonnelComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    GestionPersonnelRoutingModule,
    DepartementModule,
    SharedPerModule,
    SharedModule
  ],
  exports:[
  ]
})
export class GestionPersonnelModule { }
