import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcompteRoutingModule } from './acompte-routing.module';
import { AcompteComponent } from './acompte.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditAcompteComponent } from './add-edit-acompte/add-edit-acompte.component';
import { ShowAcompteComponent } from './show-acompte/show-acompte.component';


@NgModule({
  declarations: [
    AcompteComponent,
    AddEditAcompteComponent,
    ShowAcompteComponent
  ],
  imports: [
    CommonModule,
    AcompteRoutingModule,
    SharedModule
  ]
})
export class AcompteModule { }
