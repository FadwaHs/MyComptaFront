import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-drop-menu-per',
  templateUrl: './drop-menu-per.component.html',
  styleUrls: ['./drop-menu-per.component.scss']
})
export class DropMenuPerComponent {

  constructor(private modalService : ModalService){}

  @Input()
  for : 'DP'

  @Input()
  type : 'list'|'edit'|'show'

  @Input()
  typeM: 'addModal'|'showModal'|'editModal'|'delModal'

  @Input()
  size: 'xs' | 'sm' = 'xs'

  @Output()
  addClicked : EventEmitter<void> = new EventEmitter()

  dropMenu:boolean=false

  toggleDropMenu(){
    this.dropMenu = !this.dropMenu
  }
  closeMenu(){
    this.dropMenu = false
  }

  onClicked(){
    this.dropMenu = false
    this.addClicked.emit()
  }

  openModel(id:string) {
    this.modalService.open(id)
  }

  closeModal(id: string) {
    this.modalService.close(id);
}
}



