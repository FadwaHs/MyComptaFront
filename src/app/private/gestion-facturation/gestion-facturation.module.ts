import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionFacturationRoutingModule } from './gestion-facturation-routing.module';
import { GestionFacturationComponent } from './gestion-facturation.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';


@NgModule({
  declarations: [
    GestionFacturationComponent

  ],
  imports: [
    CommonModule,
    GestionFacturationRoutingModule,
    NgSelectModule,
    MatDialogModule

  ],
  providers: [
    MatDialogConfig,
    {provide: MatDialogRef, useValue: {} },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],




  exports:[

    MatDialogModule,

]

})


export class GestionFacturationModule { }
