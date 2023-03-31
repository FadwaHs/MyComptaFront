import { Card } from './../../../shared/models/card';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';
import { EnvironmentService } from '../../http/environment.service';
import { Environment } from '../../models/environment';

@Component({
  selector: 'app-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.scss']
})
export class EnvironmentComponent implements OnInit{

  cards : Card[] = []

  enviroments : Environment[]

  constructor(private modalService : ModalService, private environmentService : EnvironmentService){}

  ngOnInit(): void {
    this.setEnvironments()
  }

  setEnvironments(){
    this.environmentService.getAllEnvironments().subscribe({
      next : res => this.enviroments = res,
      error : e => console.log(e),
      complete: () => this.setCards()
    })
  }

  setCards() {
      this.enviroments.forEach(e =>{
        var card : Card  = {} as Card
        card.id = e.id+'-'+e.slug
        card.mainIcon= 'par'
        card.primaryTitle1 = e.nom
        this.cards.push(card)
      })

  }

  // openModel() {
  //   this.modalService.open()
  // }



}
