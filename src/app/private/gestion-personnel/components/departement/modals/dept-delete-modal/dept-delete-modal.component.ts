import { Component, EventEmitter, Input,Output} from '@angular/core';
import { Departement } from 'src/app/private/models/departement';
import { Optional } from '../../types';


@Component({
  selector: 'app-dept-delete-modal',
  templateUrl: './dept-delete-modal.component.html',
  styleUrls: ['./dept-delete-modal.component.scss']
})
export class DeptDeleteModalComponent {
  isOpen = true;

  @Output() onClose = new EventEmitter()
  @Input() selectedDepartment: Optional<Departement> = undefined;



  handleClose() {
    this.onClose.emit()

  }

}
