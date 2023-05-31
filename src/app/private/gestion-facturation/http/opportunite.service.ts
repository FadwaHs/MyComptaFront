import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ConstantUrl } from "src/app/shared/config/constant-url";
import { Opportunite } from "../models/opportunite";
import { Observable } from "rxjs";
import { Devis } from '../models/devis';





@Injectable({
  providedIn: 'root'
})
export class OpportuniteService {

  constructor(private http : HttpClient, private constant : ConstantUrl) { }

  getOpportuniteById(id :number):Observable<Opportunite>{

    return this.http.get<Opportunite>(`${this.constant.opportuniteUrl}/${id}`);
  }

  getAllOpportunites(): Observable<Opportunite[]>{
    return this.http.get<Opportunite[]>(`${this.constant.opportuniteUrl}`)
  }


  addOpportunite(opportunite: Opportunite): Observable<any> {
    return this.http.post(`${this.constant.opportuniteUrl}`, opportunite);
  }


  updateOpportuniteById( id :number, opportunite: Opportunite) :Observable<Opportunite>{
    return this.http.put<Opportunite>(`${this.constant.opportuniteUrl}/${id}`,opportunite);
  }

  deleteOpportuniteById(id :number):Observable<string>{
   return this.http.delete(`${this.constant.opportuniteUrl}/${id}`,{ responseType: 'text'});
  }

  getDevisForOpportunite(id :number):Observable<Devis[]>{
    return this.http.get<Devis[]>(`${this.constant.oppDevisUrl}/${id}`);
  }

//++
getOpprtuniteList(params: any): Observable<any> {
  return this.http.get<any>(`${this.constant.opportuniteUrl}/pagination`, { params });
}
}
