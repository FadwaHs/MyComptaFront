import { Component, OnInit } from '@angular/core';
import { Pipeline } from '../../models/pipeline';
import { PipelineService } from '../../http/pipeline.service';
import { EtapeService } from '../../http/etape.service';
import { Etape } from '../../models/etape';
import { NavigateService } from 'src/app/shared/services/navigate.service';

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.scss']
})
export class PipelineComponent implements OnInit{

  pipeline :Pipeline[] = [];
  etapelist : Etape[] = [];
  isEmpty : boolean = false;
  selectedPipeline: number | undefined;

  constructor(private pipelineService:PipelineService , private etapeService : EtapeService , public navigate: NavigateService,  )
  {

  }


  ngOnInit(): void {

    this.getAllPipeline();

  }

  getAllPipeline() {

    this.pipelineService.getAllPipelines().subscribe({
      next: res => {
        this.pipeline = res;
        if (this.pipeline.length > 0) {
          this.selectedPipeline = this.pipeline[0].id; // Set the first pipeline as selected by default
        }
        this.retrieveEtapesForPipelines();
      },
      error:e=> console.log(e),
      complete: () =>  { if(this.pipeline.length == 0) this.isEmpty = true }
    }
    )
  }

  retrieveEtapesForPipelines() {

    for (let pipeline of this.pipeline) {
      this.pipelineService.getEtapeForPipeline(pipeline.id).subscribe({
        next: etapes => {
          pipeline.etapeList = etapes;
          this.retrieveOpportunitesForEtapes(pipeline);
        },
        error: e => {
          console.log(e);
        }
      });
    }
  }


  retrieveOpportunitesForEtapes(pipeline: Pipeline) {

    let opportunityCount = 0;
    let etapeCount = pipeline.etapeList.length;
    let completedRequests = 0;

    for (let etape of pipeline.etapeList) {
      this.etapeService.getOpportuniteForEtape(etape.id).subscribe({
        next: opportunites => {
          etape.opportunite = opportunites;
          opportunityCount += opportunites.length;
        },
        error: e => {
          console.log(e);
        },
        complete: () => {
          completedRequests++;

          if (completedRequests === etapeCount) {
            pipeline.opportunityCount = opportunityCount;
          }
        }
      });
    }
  }


}
