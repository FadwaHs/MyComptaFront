import { Component, OnInit } from '@angular/core';
import { Opportunite } from '../../models/opportunite';
import { OpportuniteService } from '../../http/opportunite.service';

@Component({
  selector: 'app-opportunite',
  templateUrl: './opportunite.component.html',
  styleUrls: ['./opportunite.component.scss']
})
export class OpportuniteComponent implements OnInit {




constructor(private op:OpportuniteService){}


  opp:Opportunite =new Opportunite()


 ngOnInit(): void {

 this.opp.datecreation= new Date()
 this.opp.Intitule= 'opp'

}

create() {

  this.op.addOpportunite(this.opp).subscribe({
    next: (data) => (this.opp = data),
    error: (e) => console.log(e),

  });

}








}
