import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigateService } from '../../services/navigate.service';

@Component({
  selector: 'app-empty-data-message',
  templateUrl: './empty-data-message.component.html',
  styleUrls: ['./empty-data-message.component.scss']
})
export class EmptyDataMessageComponent implements OnInit {

  @Input()
  for: 'C'|'S'|'D'|'F'|'A'|'FA'|'ESP'|'DP'|'O'|'FG'|'FR'|'SF'|'AF'|'BL'|'BC'



  @Output()
  btnClicked : EventEmitter<void> = new EventEmitter()

  constructor(protected navigate  : NavigateService) {  }

  ngOnInit(): void {

  }


}
