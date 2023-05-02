import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpportuniteComponent } from './opportunite.component';

const routes: Routes = [{ path: '', component: OpportuniteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpportuniteRoutingModule { }
