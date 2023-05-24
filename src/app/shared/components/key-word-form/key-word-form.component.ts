import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { MotCleService } from 'src/app/private/gestion-facturation/http/mot-cle.service';
import { Client } from 'src/app/private/gestion-facturation/models/client';
import { Devis } from 'src/app/private/gestion-facturation/models/devis';
import { Facture } from 'src/app/private/gestion-facturation/models/facture';
import { FactureAcompte } from 'src/app/private/gestion-facturation/models/facture-acompte';
import { FactureAvoir } from 'src/app/private/gestion-facturation/models/facture-avoir';
import { FactureSimple } from 'src/app/private/gestion-facturation/models/facture-simple';
import { Fournisseur } from 'src/app/private/gestion-facturation/models/fournisseur';
import { MotCle } from 'src/app/private/gestion-facturation/models/mot-cle';
import { Societe } from 'src/app/private/gestion-facturation/models/societe';


@Component({
  selector: 'app-key-word-form',
  templateUrl: './key-word-form.component.html',
  styleUrls: ['./key-word-form.component.scss']
})
export class KeyWordFormComponent implements OnInit {

  @Input()
  for : 'C' | 'S' | 'D' | 'F' |'A' | 'FA'| 'FR' // added FR

  motsCle : Array<MotCle>= []
  motCleForm :FormGroup;
  oldSelectedMotsCle : Array<MotCle>
  constructor( private formBuilder : FormBuilder, private motCleService : MotCleService) { }

  ngOnInit(): void {

    this.inializeForm()
    this.setAllMotCle();
  }

  inializeForm(){
    this.motCleForm = this.formBuilder.group({
      mots :null
    })
  }

  setAllMotCle() {
    this.motCleService.getMotCleList().subscribe({
    next : data => {
      this.motsCle = data

    },
    error : err => console.log(err.error),
    complete : () =>{
      this.removeDuplicateMots()
    }
    })
  }

  removeDuplicateMots(){
    this.motsCle = this.motsCle.reduce((accumulator : MotCle[], current : MotCle) => {
      if (
        !accumulator.some(
          (item : MotCle)  =>  item.mot === current.mot
        )
      ) {
        accumulator.push(current);
      }
      return accumulator;
    }, []);
  }

  createNewMot(event : any){
    var motCle : MotCle  = new MotCle()
    motCle.mot = event;
    return motCle;
  }

  setFormValues(motCleList: MotCle[]) {
    this.oldSelectedMotsCle = motCleList
    this.motCleForm.controls['mots'].setValue(this.oldSelectedMotsCle)
  }

  // added fournisseur here
  async onSubmit(data : Societe | Client | Devis | Facture| Fournisseur, isAddMode : boolean ){

    if (
      this.motCleForm.controls['mots'].value  &&
      this.motCleForm.controls['mots'].value.length
    ){

      if(!isAddMode){
        await this.deleteOldMotsCle();
      }

      this.motCleForm.controls['mots'].value.forEach((motCle: MotCle) => {
        if(this.for == 'S') motCle.societe = data as Societe
        else if(this.for == 'C') motCle.client = data as Client
        else if(this.for == 'FR') motCle.fournisseur = data as Fournisseur
        else if(this.for == 'D') motCle.devis = data as Devis
        else if(this.for == 'F') motCle.factureSimple = data as FactureSimple
        else if(this.for == 'A') motCle.factureAvoir = data as FactureAvoir
        else if(this.for == 'FA') motCle.factureAcompte = data as FactureAcompte
        else return

        if(motCle.id != null){
          delete motCle.id
        }

        this.motCleService.addMotCle(motCle).subscribe({
          error: (e) => console.log(e),
        })
      })
    }
    else{
      await this.deleteOldMotsCle()
    }

  }


  async deleteOldMotsCle(){
    if(this.oldSelectedMotsCle ){
      for(let i = 0; i < this.oldSelectedMotsCle.length; i++) {
          await firstValueFrom( this.motCleService.deleteMotCleById(this.oldSelectedMotsCle[i].id!)).catch( e =>{
            console.log(e)
          })
      }
    }

  }

}
