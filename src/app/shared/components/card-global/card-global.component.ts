import { Modes } from './../../../private/gestion-personnel/components/departement/types';
import { Subject } from 'rxjs';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../../models/card';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-card-global',
  templateUrl: './card-global.component.html',
  styleUrls: ['./card-global.component.scss']
})
export class CardGlobalComponent {
  open = false;




  @Input()
  card: Card = {} as Card;

  @Input()
  route : string

  textColor: string = 'text-green'

  @Input()
  typeM: 'addModal'|'showModal'|'editModal'|'delModal'

  @Input()
  size: 'xs' | 'sm' = 'xs'

  @Output()
  addClicked : EventEmitter<void> = new EventEmitter();
@Input() selector: Subject<{id: number; mode: Modes}>;

  dropMenu:boolean=false;

  constructor(private modalService : ModalService){}


  toggleDropMenu(){
    this.open = !this.open
  }
  closeMenu(){
    this.dropMenu = false
  }

  onClicked(){
    this.dropMenu = false
    this.addClicked.emit()
  }

  openModel(mode: Modes,id: string) {
    const did = +id.split('-')[0];
    this.selector.next({mode, id:did});
    // this.modalService.open(id)
  }

  closeModal(id: string) {
    this.modalService.close(id);
}
}
