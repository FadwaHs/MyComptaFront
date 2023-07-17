import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandeRoutingModule } from './commande-routing.module';
import { CommandeComponent } from './commande.component';
import { AddEditCommandeComponent } from './add-edit-commande/add-edit-commande.component';
import { ShowCommandeComponent } from './show-commande/show-commande.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CommandeComponent,
    AddEditCommandeComponent,
    ShowCommandeComponent
  ],
  imports: [
    CommonModule,
    CommandeRoutingModule,
    SharedModule,

  ]
})
export class CommandeModule { }
