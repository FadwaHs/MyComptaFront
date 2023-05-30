import { FormsModule } from '@angular/forms';
import { SharedPerModule } from './../../shared-per/shared-per.module';
import { GestionPersonnelModule } from './../../gestion-personnel.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartementRoutingModule } from './departement-routing.module';
import { DepartementComponent } from './departement.component';
import { SharedModule } from "../../../../shared/shared.module";

import { MatDialogModule,MatDialogConfig,MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatLegacyChipsModule} from '@angular/material/legacy-chips';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';








@NgModule({
    declarations: [
        DepartementComponent,


    ],
    providers: [MatDialogConfig],
    imports: [
        CommonModule,
        DepartementRoutingModule,
        SharedPerModule,
        SharedModule,
        FormsModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
        MatChipsModule,
        MatLegacyChipsModule,
        MatCardModule,
        MatDialogModule,
        MatCardModule,
        NgbModalModule

      ],
      exports:[
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
        MatChipsModule,
        MatLegacyChipsModule,
        MatCardModule,
        MatDialogModule,
        NgbModalModule
      ],
      entryComponents: [],




})
export class DepartementModule { }
