import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BonsRoutingModule } from './bons-routing.module';
import { BonsComponent } from './bons.component';


@NgModule({
  declarations: [
    BonsComponent
  ],
  imports: [
    CommonModule,
    BonsRoutingModule
  ]
})
export class BonsModule { }
