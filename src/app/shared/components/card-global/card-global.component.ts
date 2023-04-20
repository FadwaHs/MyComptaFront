import { Modes } from './../../../private/gestion-personnel/components/departement/types';
import { Subject } from 'rxjs';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../../models/card';
import { ModalService } from '../../services/modal.service';
import { Departement } from 'src/app/private/models/departement';

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

  // @Output()
  // addClicked : EventEmitter<void> = new EventEmitter();

  @Input() selector: Subject<{id: number; mode: Modes}>;

  // @Input() item:any

  @Output() cardClicked = new EventEmitter<{mode: Modes, id: number}>();


  constructor(private modalService : ModalService){

  }


  toggleDropMenu(){
    this.open = !this.open
  }
  closeMenu(){
    this.open=false

  }


  // onClicked(){
  //   this.open = false
  //   // this.addClicked.emit()
  // }

   openModel(mode: Modes,id: string) {
    const did = +id.split('-')[0];
    const did2 = Number(did);
    this.cardClicked.emit({mode, id:did2});
    this.closeMenu()
    this.selector.next({id:did2, mode:mode});


  }

  closeModal(id: string) {
    this.modalService.close(id);
}
}
