import { Component, OnInit } from '@angular/core';
import { Pipeline } from '../../../models/pipeline';
import { Etape } from '../../../models/etape';
import { Opportunite } from '../../../models/opportunite';
import { ActivatedRoute, Router } from '@angular/router';
import { OpportuniteService } from '../../../http/opportunite.service';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import { EtapeService } from '../../../http/etape.service';
import { PipelineService } from '../../../http/pipeline.service';

@Component({
  selector: 'app-show-pipeline',
  templateUrl: './show-pipeline.component.html',
  styleUrls: ['./show-pipeline.component.scss']
})

export class ShowPipelineComponent  implements  OnInit{

  id: number;
  slug: string;
  pipeline : Pipeline = new Pipeline();
  etapelist : Etape[] = [];


  constructor(private route: ActivatedRoute,
    private router: Router,
    private opportuniteservice: OpportuniteService ,
    private pipelineService:PipelineService ,
    private etapeService : EtapeService,
    protected navigate : NavigateService) { }


  ngOnInit(): void {

    this.checkRouteAndGetPip();
    this.getEtapeForpipeline();


  }


  async checkRouteAndGetPip() {

    [this.id, this.slug] = await this.route.snapshot.params['id-slug'].split(
      '-'
    );
    this.id = +this.id;
    if (this.id) {
      this.pipelineService.getPipelineById(this.id).subscribe({
        next: (data) => (this.pipeline = data),
        error: (err) => console.log(err),
        complete: () => {
          console.log(this.pipeline,'pip')
          this.checkSlug();
        },
      });
    } else {
      this.router.navigateByUrl(this.navigate.f_opportunitePath); //tester
    }
  }

  checkSlug() {
    if (this.pipeline.slug != this.slug) {
      this.router.navigateByUrl(
        this.navigate.toShowPath('P',this.id,this.pipeline.slug)
      );
    }
  }


    // get etape list
  getEtapeForpipeline() {

      [this.id, this.slug] =  this.route.snapshot.params['id-slug'].split(
        '-'
      );
      this.id = +this.id;
      this.pipelineService.getEtapeForPipeline(this.id).subscribe({
        next: etapes => {
          this.etapelist = etapes
          this.etapelist.sort((a, b) => a.id - b.id); // Sort the etapeList based on the id
          this.retrieveOpportunitesForEtapes(this.etapelist);
        },
        error: (e) => console.log(e),
        complete: () => {
           console.log(this.etapelist,'piplist')
        },
      });

  }

  retrieveOpportunitesForEtapes(etapeList: Etape[]) {

    for (let etape of etapeList) {

      this.etapeService.getOpportuniteForEtape(etape.id).subscribe({
        next: opportunites => {
          etape.opportunite = opportunites;
        },
        error: e => {
          console.log(e);
        },
        complete: () => {
          console.log(etape.opportunite, 'opplist');
        },
      });
    }
  }
}

