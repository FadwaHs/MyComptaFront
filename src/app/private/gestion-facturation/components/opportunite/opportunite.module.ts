import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpportuniteRoutingModule } from './opportunite-routing.module';
import { OpportuniteComponent } from './opportunite.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditOpportuniteComponent } from './add-edit-opportunite/add-edit-opportunite.component';
import { ShowOpportuniteComponent } from './show-opportunite/show-opportunite.component';


@NgModule({
  declarations: [
    OpportuniteComponent,
    AddEditOpportuniteComponent,
    ShowOpportuniteComponent
  ],
  imports: [
    CommonModule,
    OpportuniteRoutingModule,
    SharedModule
  ]
})
export class OpportuniteModule { }
