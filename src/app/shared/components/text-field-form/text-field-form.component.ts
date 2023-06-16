import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Devis } from 'src/app/private/gestion-facturation/models/devis';
import { Facture } from 'src/app/private/gestion-facturation/models/facture';

@Component({
  selector: 'app-text-field-form',
  templateUrl: './text-field-form.component.html',
  styleUrls: ['./text-field-form.component.scss']
})
export class TextFieldFormComponent implements OnInit {

  @Input()
  for : 'D'|'F'|'A'|'FA'|'O'|'SF'|'AF'

  textForm :FormGroup
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.iniatTextForm()
  }

  iniatTextForm(){
    this.textForm = this.formBuilder.group({
      textIntro :null,
      textCond : null,
      piedPage : null,
      condVente : null
    })
  }

  getTextForm(data : any) : any{
    data.textIntro = this.textForm.controls['textIntro'].value
    data.textCond = this.textForm.controls['textCond'].value
    data.piedPage = this.textForm.controls['piedPage'].value
    data.condVente = this.textForm.controls['condVente'].value
    return data
  }

  setTextForm(data : any) {
      this.textForm.controls['textIntro'].setValue(data.textIntro)
      this.textForm.controls['textCond'].setValue(data.textCond)
      this.textForm.controls['piedPage'].setValue(data.piedPage)
      this.textForm.controls['condVente'].setValue(data.condVente)
  }
}
