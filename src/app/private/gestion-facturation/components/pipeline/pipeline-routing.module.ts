import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PipelineComponent } from './pipeline.component';
import { AddEditPipelineComponent } from './add-edit-pipeline/add-edit-pipeline.component';
import { ShowPipelineComponent } from './show-pipeline/show-pipeline.component';



const routes: Routes = [

  { path: '', component: PipelineComponent }
  ,
  {
    path: 'add',
    component: AddEditPipelineComponent
  },
  {
    path:'edit/:id-slug',
    component: AddEditPipelineComponent
  },
  {
    path:'show/:id-slug',
    component: ShowPipelineComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PipelineRoutingModule { }
