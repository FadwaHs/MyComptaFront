import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimpleRoutingModule } from './simple-routing.module';
import { SimpleComponent } from './simple.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditSimpleComponent } from './add-edit-simple/add-edit-simple.component';
import { ShowSimpleComponent } from './show-simple/show-simple.component';
import { FacturesModule } from '../factures.module';


@NgModule({
  declarations: [
    SimpleComponent,
    AddEditSimpleComponent,
    ShowSimpleComponent
  ],
  imports: [
    CommonModule,
    SimpleRoutingModule,
    SharedModule,
    FacturesModule
  ]
})
export class SimpleModule { }
