import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipelineRoutingModule } from './pipeline-routing.module';
import { PipelineComponent } from './pipeline.component';
import { AddEditPipelineComponent } from './add-edit-pipeline/add-edit-pipeline.component';
import { SharedModule } from "../../../../shared/shared.module";
import { ShowPipelineComponent } from './show-pipeline/show-pipeline.component';


@NgModule({
    declarations: [
        PipelineComponent,
        AddEditPipelineComponent,
        ShowPipelineComponent
    ],
    imports: [
        CommonModule,
        PipelineRoutingModule,
        SharedModule
    ]
})
export class PipelineModule { }
