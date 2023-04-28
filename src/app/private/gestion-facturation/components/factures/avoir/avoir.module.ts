import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvoirRoutingModule } from './avoir-routing.module';
import { AvoirComponent } from './avoir.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditAvoirComponent } from './add-edit-avoir/add-edit-avoir.component';
import { ShowAvoirComponent } from './show-avoir/show-avoir.component';


@NgModule({
  declarations: [
    AvoirComponent,
    AddEditAvoirComponent,
    ShowAvoirComponent
  ],
  imports: [
    CommonModule,
    AvoirRoutingModule,
    SharedModule
  ]
})
export class AvoirModule { }
