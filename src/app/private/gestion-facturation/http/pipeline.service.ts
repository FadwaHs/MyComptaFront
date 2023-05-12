import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConstantUrl } from "src/app/shared/config/constant-url";
import { Pipeline } from "../models/pipeline";
import { Etape } from "../models/etape";

@Injectable({
  providedIn: 'root'
})

export class PipelineService {

  constructor(private http : HttpClient, private constant : ConstantUrl) { }

  getPipelineById(id :number):Observable<Pipeline>{
    return this.http.get<Pipeline>(`${this.constant.pipelineUrl}/${id}`);
  }

  getPipelineByName(name :string):Observable<Pipeline>{
    return this.http.get<Pipeline>(`${this.constant.pipelineNameUrl}/${name}`);
  }

  getEtapeForPipeline(id :number):Observable<Etape[]>{
    return this.http.get<Etape[]>(`${this.constant.pipelineEtapeUrl}/${id}`);
  }

  getAllPipelines(): Observable<Pipeline[]>{
    return this.http.get<Pipeline[]>(`${this.constant.pipelineUrl}`)
  }


  addPipeline(Pppeline: Pipeline): Observable<any> {
    return this.http.post(`${this.constant.pipelineUrl}`, Pipeline);
  }


  updatePipelineById( id :number, pipeline: Pipeline) :Observable<Pipeline>{
    return this.http.put<Pipeline>(`${this.constant.pipelineUrl}/${id}`,Pipeline);
  }

  deletePipelineById(id :number):Observable<string>{
   return this.http.delete(`${this.constant.pipelineUrl}/${id}`,{ responseType: 'text'});
  }


}
