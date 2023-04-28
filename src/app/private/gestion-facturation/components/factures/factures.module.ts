import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturesRoutingModule } from './factures-routing.module';
import { FacturesComponent } from './factures.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FacturesComponent
  ],
  imports: [
    CommonModule,
    FacturesRoutingModule,
    SharedModule
  ]
})
export class FacturesModule { }
