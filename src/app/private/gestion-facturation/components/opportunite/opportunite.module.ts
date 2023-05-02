import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpportuniteRoutingModule } from './opportunite-routing.module';
import { OpportuniteComponent } from './opportunite.component';


@NgModule({
  declarations: [
    OpportuniteComponent
  ],
  imports: [
    CommonModule,
    OpportuniteRoutingModule
  ]
})
export class OpportuniteModule { }
