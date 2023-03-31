import { Component } from '@angular/core';

@Component({
  selector: 'app-drop-menu-global',
  templateUrl: './drop-menu-global.component.html',
  styleUrls: ['./drop-menu-global.component.scss']
})
export class DropMenuGlobalComponent {

  

  dropMenu:boolean=false

  toggleDropMenu(){
    this.dropMenu = !this.dropMenu
  }
  closeMenu(){
    this.dropMenu = false
  }

}
