import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ConditionReglementService } from 'src/app/private/gestion-facturation/http/condition-reglement.service';
import { DevisService } from 'src/app/private/gestion-facturation/http/devis.service';
import { InteretService } from 'src/app/private/gestion-facturation/http/interet.service';
import { ModeReglementService } from 'src/app/private/gestion-facturation/http/mode-reglement.service';
import { ConditionReglement } from 'src/app/private/gestion-facturation/models/condition-reglement';
import { Devis } from 'src/app/private/gestion-facturation/models/devis';
import { Facture } from 'src/app/private/gestion-facturation/models/facture';
import { Interet } from 'src/app/private/gestion-facturation/models/interet';
import { ModeReglement } from 'src/app/private/gestion-facturation/models/mode-reglement';


@Component({
  selector: 'app-reglement-form',
  templateUrl: './reglement-form.component.html',
  styleUrls: ['./reglement-form.component.scss']
})
export class ReglementFormComponent implements OnInit {

  @Input()
  for : 'D' |'F'|'A'|'FA'|'SF'|'AF'|'BC'

  reglementForm :FormGroup
  phoneForm : FormGroup
  conditionsReglement : ConditionReglement[]
  modesReglement : ModeReglement[]
  interets : Interet[]

  constructor(
    private modeReglementService : ModeReglementService,
    private conditionReglementService : ConditionReglementService,
    private interetService : InteretService,
    private devisService : DevisService,
    private formBuilder : FormBuilder
  ) {}
  ngOnInit(): void {
    this.iniatReglementForm()
    this.setReglements()
  }



  iniatReglementForm() {
    this.reglementForm = this.formBuilder.group({
      conditionReglement : null,
      modeReglement :null,
      interet : null
    })
  }


  setReglements(){
      forkJoin({
        res1: this.modeReglementService.getModeReglementList(),
        res2 : this.conditionReglementService.getConditionReglementList(),
        res3 : this.interetService.getInteretList()
      })
      .subscribe({
        next : ({ res1 , res2 ,res3}) =>{
          this.modesReglement = res1
          this.conditionsReglement = res2
          this.interets = res3
        },
        error : e => console.log(e),
        complete : () =>{
          this.reglementForm.patchValue({
            conditionReglement : this.conditionsReglement[0],
            modeReglement :this.modesReglement[0],
            interet : this.interets[0]
          })
        }
      })
  }

  getReglementForm(data : any) : any{
    data.conditionReglement = this.reglementForm.controls['conditionReglement'].value
    data.modeReglement = this.reglementForm.controls['modeReglement'].value
    data.interet = this.reglementForm.controls['interet'].value
    return data
  }

  setReglementForm(data : any) {
    this.reglementForm.controls['conditionReglement'].setValue(data.conditionReglement)
    this.reglementForm.controls['modeReglement'].setValue(data.modeReglement)
    this.reglementForm.controls['interet'].setValue(data.interet)
  }


}
