import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpportuniteService } from '../../../http/opportunite.service'
import currencies from 'src/assets/json/currencies.json';
import { Opportunite } from '../../../models/opportunite';
import { SelectRecipientComponent } from 'src/app/shared/components/select-recipient/select-recipient.component';
import { KeyWordFormComponent } from 'src/app/shared/components/key-word-form/key-word-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import { Pipeline } from '../../../models/pipeline';
import { PipelineService } from '../../../http/pipeline.service';
import { firstValueFrom } from 'rxjs';
import { Etape } from '../../../models/etape';
import { EtapeService } from '../../../http/etape.service';
import { HttpHeaders } from '@angular/common/http';
import { OppStatus } from '../../../enums/OppStatus';

@Component({
  selector: 'app-add-edit-opportunite',
  templateUrl: './add-edit-opportunite.component.html',
  styleUrls: ['./add-edit-opportunite.component.scss']
})
export class AddEditOpportuniteComponent  implements OnInit{

  @ViewChild(SelectRecipientComponent)
  childSelectRecipient: SelectRecipientComponent;

  @ViewChild(KeyWordFormComponent)
  childKeyWord: KeyWordFormComponent;

  id: number;
  slug: string;
  oppForm: FormGroup;
  isSelected : boolean = false;
  isAddMode: boolean = true;
  intitule:string;
  currencies : any[] = currencies;
  opportunite : Opportunite = new Opportunite();
  pipeline: Pipeline[] ;
  etapepipeline: Etape[];
  source = ['interne', 'site web', 'tel/Mail'];


  constructor(private formBuilder: FormBuilder,
    private opportuniteSerivce:OpportuniteService,
    private router: Router,
    private route: ActivatedRoute,
    protected navigate : NavigateService,
    private pipelineService :PipelineService,
    private etapeService  : EtapeService){}


    async ngOnInit(): Promise<void> {

    this.initializeForms();
    await this.initPipeline()

    if (this.route.snapshot.url[0].path == 'edit') {
      this.isAddMode = false;
      this.verifyRouteAndGetOpportunite();
    }
  }


  async initPipeline() {

    this.pipeline  = await firstValueFrom(this.pipelineService.getAllPipelines())

  }


  async onPipelineSelected(event: any) {

    var pip = this.oppForm.controls['pipeline'].value as Pipeline;
    this.etapepipeline = (await firstValueFrom(this.pipelineService.getEtapeForPipeline(pip.id))).sort((a, b) => a.id - b.id);
  }

  async onEtapeSelected( event: any) {

    var etape = this.oppForm.controls['etapepipeline'].value as Etape;
  }


  async verifyRouteAndGetOpportunite() {

    [this.id, this.slug] = await this.route.snapshot.params['id-slug'].split(
      '-'
    );
    this.id = +this.id;
    if (this.id) {
      this.opportuniteSerivce.getOpportuniteById(this.id).subscribe({
        next: (data) => {
          this.opportunite = data
        },
        error: (err) => console.log(err),
        complete: () => {
          // for Edit
          this.checkSlug();
          this.setOtherForms();
          this.setFormValues();
        },
      });
    } else {
      this.router.navigateByUrl(this.navigate.f_opportunitePath);
    }
  }

  // for Edit
  checkSlug(){
    if (this.opportunite.slug === this.slug) {
    } else {
      this.router.navigateByUrl(this.navigate.toEditPath('O',this.id,this.opportunite.slug));
    }
  }
  // for Edit
  setOtherForms(){
      if(this.opportunite.motCleList.length) this.childKeyWord.setFormValues(this.opportunite.motCleList)
  }


  initializeForms() {

    this.oppForm = this.formBuilder.group({

      devise: [this.currencies[0].name_symbol, Validators.required],
      intitule: ['', Validators.required],
      mantantHT: ['', Validators.required],
      probabilite:null,
      note:null,
      pipeline:null,
      etapepipeline:null,
      dateFin : null,
      source:null
    });
  }



  onSubmit() {

    if (this.oppForm.valid && ( this.isSelected || !this.isAddMode)) {
      this.getFormValues();
      this.checkstatus();
      if (this.isAddMode) {
        this.createNewOPP();
      } else {
       this.updateOPP();
      }
    } else {
      console.log('Invalid Form');
     }
  }



  updateOPP() {
    this.opportuniteSerivce.updateOpportuniteById(this.opportunite.id,this.opportunite).subscribe({
      next: (data) => (this.opportunite = data),
      error: (e) => console.log(e),
      complete: () => {
        this.submitOtherForms();
      },
    });
  }

  createNewOPP() {
    this.opportuniteSerivce.addOpportunite(this.opportunite).subscribe({
      next: (data) => (this.opportunite = data),
      error: (e) => console.log(e),
      complete: () => {
        this.submitOtherForms();
      },
    });
  }

  // for Add and Edit
  async submitOtherForms() {
    var opportunite : Opportunite = new Opportunite()
    opportunite.id = this.opportunite.id

    await this.childKeyWord.onSubmit(opportunite,this.isAddMode);
    this.router.navigateByUrl(this.navigate.f_opportunitePath);
  }

  // For Add
  getFormValues() {

   this.opportunite = this.childSelectRecipient.getRecipient(this.opportunite) as Opportunite
   this.opportunite.intitule=this.oppForm.controls['intitule'].value;
   this.opportunite.devise = this.oppForm.controls['devise'].value;
   this.opportunite.mantantHT = this.oppForm.controls['mantantHT'].value;
   this.opportunite.probabilite = this.oppForm.controls['probabilite'].value;
   this.opportunite.note = this.oppForm.controls['note'].value;
   this.opportunite.datecreation = new Date()
   this.opportunite.dateFin =  this.oppForm.controls['dateFin'].value;
   this.opportunite.source = this.oppForm.controls['source'].value;
   this.opportunite.etape = this.oppForm.controls['etapepipeline'].value as Etape;

  }

  // for Edit
  setFormValues() {
    this.oppForm.controls['intitule'].setValue(this.opportunite.intitule)
    this.oppForm.controls['devise'].setValue(this.opportunite.devise)
    this.oppForm.controls['mantantHT'].setValue(this.opportunite.mantantHT)
    this.oppForm.controls['probabilite'].setValue(this.opportunite.probabilite)
    this.oppForm.controls['note'].setValue(this.opportunite.note)
    this.childSelectRecipient.setRecipient(this.opportunite)
    this.oppForm.controls['dateFin'].setValue(this.opportunite.dateFin)
    this.oppForm.controls['source'].setValue(this.opportunite.source)
    this.oppForm.controls['etapepipeline'].setValue(this.opportunite.etape)
    this.oppForm.controls['pipeline'].setValue(this.opportunite.etape.pipeline)
  }


  // Status Update Note Globale
  checkstatus() {

    if(this.opportunite.etape.etapename === "Affaire conclue" )
    {
           this.opportunite.oppStatus = OppStatus.WON

           const dateAujourdhui = new Date();
           const dateFin = new Date(this.opportunite.dateFin);

             if (dateFin.toDateString() === dateAujourdhui.toDateString())
             {
                this.opportunite.oppStatus = OppStatus.CLOSED
             }
     }
     else
     {
         const dateAujourdhui = new Date();
         const dateFin = new Date(this.opportunite.dateFin);

         if (dateFin.toDateString() === dateAujourdhui.toDateString())
          {
             this.opportunite.oppStatus = OppStatus.LATE
           }


     }
  }



}
