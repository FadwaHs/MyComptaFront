import { Departement } from './../../../../models/departement';
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Optional } from "../types";

@Component({
  selector: 'department-delete-modal',
  template: `
    <modal [isOpen]="isOpen" (onClose)="handleClose()">
      <h1 class="secondary-title text-base">{{'TITLE.DPS'| translate}} </h1>
      <div (click)="$event.stopImmediatePropagation()">
          {{selectedDepartment?.nom}}
      </div>
    <modal>
  `
})
export class DepartmentDeleteModal {
  
  isOpen = true;

  @Output() onClose = new EventEmitter()
  @Input() selectedDepartment: Optional<Departement> = undefined;



  handleClose() {
    this.onClose.emit()

  }
}
