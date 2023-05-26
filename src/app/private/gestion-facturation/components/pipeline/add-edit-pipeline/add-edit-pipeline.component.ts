import { Component } from '@angular/core';
import { Etape } from '../../../models/etape';
import { Pipeline } from '../../../models/pipeline';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OpportuniteService } from '../../../http/opportunite.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import { PipelineService } from '../../../http/pipeline.service';
import { EtapeService } from '../../../http/etape.service';


@Component({
  selector: 'app-add-edit-pipeline',
  templateUrl: './add-edit-pipeline.component.html',
  styleUrls: ['./add-edit-pipeline.component.scss']
})

export class AddEditPipelineComponent {

  id: number;
  slug: string;
  isAddMode: boolean = true;
  pipeline : Pipeline = new Pipeline();
  etapepipeline: Array<Etape>;
  pipForm: FormGroup;
  etapeForms: FormGroup[] = []; // Array to store etape form groups
  probabiliteOptions: number[] = [];


  constructor(private formBuilder: FormBuilder,
    private opportuniteSerivce:OpportuniteService,
    private router: Router,
    private route: ActivatedRoute,
    protected navigate : NavigateService,
    private pipelineService :PipelineService,
    private etapeService  : EtapeService) {
  }

 ngOnInit() {

  // Remplir les options de probabilité de 0 à 100
  for (let i = 0; i <= 100; i += 10) {
    this.probabiliteOptions.push(i);
  }
  this.initializeForms();

  if (this.route.snapshot.url[0].path == 'edit') {
    this.isAddMode = false;
    this.verifyRouteAndGetpipeline();
  }

  }


// get pipeline and also list of etapes for this pipeline
async verifyRouteAndGetpipeline() {

    [this.id, this.slug] = await this.route.snapshot.params['id-slug'].split('-');
    this.id = +this.id;

    if (this.id) {
      this.pipelineService.getPipelineById(this.id).subscribe({
        next: (data) => {
          this.pipeline = data;
        },
        error: (err) => console.log(err),
        complete: () => {
          // Fetch the etapes for the pipeline
          this.pipelineService.getEtapeForPipeline(this.id).subscribe({
            next: (etapes) => {

              this.etapepipeline = etapes;
              this.checkSlug();
              this.setFormValues();
            },
            error: (err) => console.log(err)
          });
        },
      });
    } else {
      this.router.navigateByUrl(this.navigate.PipePath);
    }
  }

///////////// initialise forms start ////////

  initializeForms() {
     // Initialize the form
     this.pipForm = this.formBuilder.group({
      namepipeline: ['', Validators.required],
    });
    // Initialize the etape forms
    this.etapeForms.push(this.createEtapeForm());
  }

  createEtapeForm(): FormGroup {
    return this.formBuilder.group({
      etapename: null,
      probabilite: null,
    });
  }
///////////// initialise forms ends ////////

  // add new etape form in etapeForms array:
  addAdditionalInput(): void {
    const etapeForm: FormGroup = this.formBuilder.group({
      etapename: [null, Validators.required],
      probabilite: [null, Validators.required],
    });
    this.etapeForms.push(etapeForm);
  }

  removeAdditionalInput(index: number): void {
    this.etapeForms.splice(index, 1);

    // to remove steps : but maybe that cause problems
    const etapeToRemove = this.etapepipeline[index];
    if (etapeToRemove.id) {

      this.etapeService.deleteEtapeById(etapeToRemove.id).subscribe({
        next: () => {
          this.etapeForms.splice(index, 1);
          this.etapepipeline.splice(index, 1);
        },
        error: (err) => console.log(err)
      });
    } else {

    }
  }

  onSubmit() {
    if (this.pipForm.valid) {
      this.getFormValues();
      if (this.isAddMode) {
        this.createNewPip();
      } else {
         this.updatePip();
      }
    } else {
      console.log('Invalid Form');
    }
  }

  ////////// Update Pipeline with Etapes start ////////////////

  updatePip() {
    this.pipelineService.updatePipelineById(this.pipeline.id,this.pipeline).subscribe({
      next: (data) => (this.pipeline = data),
      error: (e) => console.log(e),
      complete: () => {
         // Update etapes
         this.updateEtapes();
         this.router.navigateByUrl(this.navigate.PipePath);
      },
    });
  }

  updateEtapes() {
    this.etapepipeline.forEach((etape, index) => {

      const etapeId = etape.id; // Store the current etape's id
      etape.pipeline = this.pipeline; // Set the pipeline reference

      this.etapeService.updateEtapeById(etapeId, etape).subscribe({
        next: (res) => {
          this.etapepipeline[index] = res; // Update the etape in the array
        },
        error: (e) => console.log(e),
      });
    });
  }

  ////////// Update Pipeline with Etapes end ////////////////


  //////  Create new pipeline with all etapes start /////////

  createNewPip() {
    this.pipelineService.addPipeline(this.pipeline).subscribe({
      next: (pipeline) => {
        this.pipeline = pipeline;
        this.saveEtapes();
      },
      error: (e) => console.log(e),
      complete: () => {
        this.router.navigateByUrl(this.navigate.PipePath);
      },
    });
  }

  // for Add
  saveEtapes() {

    this.etapepipeline.forEach((etape) => {
      etape.pipeline = this.pipeline; // Set the pipeline reference
      this.etapeService.addEtape(etape).subscribe({
        next: (res) => {
          etape = res;
        },
        error: (e) => console.log(e),
      });
    });
  }

 //////  Create new pipeline with all etapes end /////////

 /*
    handles the form values
    and updates the existing etapes, as well as adds new etapes to the pipeline.
 */
  getFormValues() {

    this.pipeline.name = this.pipForm.controls['namepipeline'].value;

    if(this.isAddMode)
    {
      /*
        creates a new Array<Etape> called this.etapepipeline
        and iterates over the etapeForms array (representing the form controls for etapes).
        For each etapeForm, a new Etape object is created, its attributes are set based on the form values, and it is pushed into the this.etapepipeline array.
      */
      this.etapepipeline = new Array<Etape>();

      this.etapeForms.forEach((etapeForm: FormGroup) => {
      var etape = new Etape();

      etape.etapename = etapeForm.controls['etapename'].value;
      etape.probabilite = etapeForm.controls['probabilite'].value;
      etape.pipeline = this.pipeline;

      this.etapepipeline.push(etape);
    });
    }else // update mod
    {
        /*
          need to update existing etapes
          and potentially add new etapes.
          The code initializes an empty array called newEtapes to collect the new etapes that need to be added
        */
        const newEtapes: Etape[] = [];

        this.etapeForms.forEach((etapeForm: FormGroup, index) => {

          if (index < this.etapepipeline.length) {

            const etape = this.etapepipeline[index]; // Get the existing etape from the array

            if (etape.id) {
              // Modify the attributes of the existing etape in data base
              etape.etapename = etapeForm.controls['etapename'].value;
              etape.probabilite = etapeForm.controls['probabilite'].value;
              etape.pipeline = this.pipeline;
            }
          } else {

            /*
              If the index is outside the range of existing etapes,
              it means a new etape needs to be added.
              In this case, a new Etape object is created, its attributes are set based on the form values, and it is pushed into the newEtapes array.

            */
            const newEtape = new Etape();
            newEtape.etapename = etapeForm.controls['etapename'].value;
            newEtape.probabilite = etapeForm.controls['probabilite'].value;
            newEtape.pipeline = this.pipeline;
            newEtapes.push(newEtape); // Collect the new etape in the array
          }
      });

      if (newEtapes.length > 0) {
        // Make API call to add the new etapes to the database
        newEtapes.forEach((etape) => {
          // Make API call to add the etape to the database
          this.etapeService.addEtape(etape).subscribe({
            next: (res) => {
              console.log('New etape added:', res);
            },
            error: (e) => console.log(e),
          });
        });
      }

    }

  }



  // for Edit
  checkSlug(){
      if (this.pipeline.slug === this.slug) {
      } else {
        this.router.navigateByUrl(this.navigate.toEditPath('P',this.id,this.pipeline.slug));
      }
  }


 // for Edit
 setFormValues() {

  this.pipForm.controls['namepipeline'].setValue(this.pipeline.name);

  // Clear the existing etapeForms array
  this.etapeForms = [];

  // Create etape form groups for each etape in etapepipeline
  this.etapepipeline.forEach((etape) => {

    const etapeForm: FormGroup = this.formBuilder.group({

      etapename: [etape.etapename, Validators.required],
      probabilite: [etape.probabilite, Validators.required],
    });

    this.etapeForms.push(etapeForm);
  });

}




}
