import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})
export class ModalService {
  // coco   private modal: any
  private modals: any[] = [];

  add(modal: any) {
      // add modal to array of active modals
      // coco this.modal = modal;

      this.modals.push(modal);

  }

  remove(id: string) {
    // remove modal from array of active modals
    this.modals = this.modals.filter(x => x.id !== id);
}

  open(id: string) {
      // open modal specified by id
      let modal: any = this.modals.filter(x => x.id === id)[0];
        modal.open();
     // coco this.modal.open();
  }

  close(id: string) {
      // close modal specified by id
      let modal: any = this.modals.filter(x => x.id === id)[0];
      modal.close();
    // coco  this.modal.close();
  }

  // destroy(){
  //   this.modal.
  // }
}

