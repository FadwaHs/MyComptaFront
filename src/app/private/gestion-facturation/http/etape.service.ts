import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConstantUrl } from "src/app/shared/config/constant-url";
import { Etape } from "../models/etape";

@Injectable({
  providedIn: 'root'
})

export class EtapeService {

  constructor(private http : HttpClient, private constant : ConstantUrl) { }

  getEtapById(id :number):Observable<Etape>{
    return this.http.get<Etape>(`${this.constant.etapeUrl}/${id}`);
  }


  getAllEtapes(): Observable<Etape[]>{
    return this.http.get<Etape[]>(`${this.constant.etapeUrl}`)
  }


  addEtape(etape: Etape): Observable<any> {
    return this.http.post(`${this.constant.etapeUrl}`, etape);
  }


  updateEtapeById( id :number, etape: Etape) :Observable<Etape>{
    return this.http.put<Etape>(`${this.constant.etapeUrl}/${id}`,etape);
  }


  deleteEtapeById(id :number):Observable<string>{
   return this.http.delete(`${this.constant.etapeUrl}/${id}`,{ responseType: 'text'});
  }


}
