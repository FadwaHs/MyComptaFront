import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigateService } from 'src/app/private/gestion-facturation/services/navigate.service';

@Component({
  selector: 'app-empty-data-message',
  templateUrl: './empty-data-message.component.html',
  styleUrls: ['./empty-data-message.component.scss']
})
export class EmptyDataMessageComponent implements OnInit {

  @Input()
  for: 'C'|'S'|'D'|'F'|'ESP'

  @Output()
  btnClicked : EventEmitter<void> = new EventEmitter()

  constructor(public navigate  : NavigateService) {  }

  ngOnInit(): void {

  }



}
