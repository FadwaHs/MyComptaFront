import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimpleFournisseurRoutingModule } from './simple-fournisseur-routing.module';
import { SimpleFournisseurComponent } from './simple-fournisseur.component';

import { ShowSimpleComponent } from './show-simple/show-simple.component';
import { AddEditSimpleComponent } from './add-edit-simple/add-edit-simple.component';
import { SharedModule } from "../../../../../shared/shared.module";


@NgModule({
    declarations: [
        SimpleFournisseurComponent,
        AddEditSimpleComponent,
        ShowSimpleComponent
    ],
    imports: [
        CommonModule,
        SimpleFournisseurRoutingModule,
        SharedModule
    ]
})
export class SimpleFournisseurModule { }
