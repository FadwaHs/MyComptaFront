import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivraisonRoutingModule } from './livraison-routing.module';
import { LivraisonComponent } from './livraison.component';
import { AddEditLivraisonComponent } from './add-edit-livraison/add-edit-livraison.component';
import { ShowLivraisonComponent } from './show-livraison/show-livraison.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LivraisonComponent,
    AddEditLivraisonComponent,
    ShowLivraisonComponent
  ],
  imports: [
    CommonModule,
    LivraisonRoutingModule,
    SharedModule,
  ]
})
export class LivraisonModule { }
