import { DeptDeleteModalComponent } from './modals/dept-delete-modal/dept-delete-modal.component';
import { DepartmentDeleteModal } from './modals/department-delete-modal.component';
import { SharedPerModule } from './../../shared-per/shared-per.module';
import { GestionPersonnelModule } from './../../gestion-personnel.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartementRoutingModule } from './departement-routing.module';
import { DepartementComponent } from './departement.component';
import { SharedModule } from "../../../../shared/shared.module";
import { AddEditDeptModalComponent } from './add-edit-dept-modal/add-edit-dept-modal.component';


@NgModule({
    declarations: [
        DepartementComponent,
        AddEditDeptModalComponent,
        DepartmentDeleteModal,
        DeptDeleteModalComponent





    ],
    imports: [
        CommonModule,
        DepartementRoutingModule,
        SharedPerModule,
        SharedModule
      ]
})
export class DepartementModule { }
