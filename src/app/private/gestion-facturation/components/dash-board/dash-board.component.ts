import { Component } from '@angular/core';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})



export class DashBoardComponent {

  item: string[] = ["Euro (€)"]
  selecteditem = this.item[0];
  activeButton: string = '';


}
