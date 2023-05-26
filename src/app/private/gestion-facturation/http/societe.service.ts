import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantUrl } from 'src/app/shared/config/constant-url';
import { Societe } from '../models/societe';
import { Opportunite } from '../models/opportunite';
import { Devis } from '../models/devis';
import { Facture } from '../models/facture';

@Injectable({
  providedIn: 'root'
})
export class SocieteService {

  constructor(private http : HttpClient, private constant : ConstantUrl) { }

  getSocieteById(id :number):Observable<Societe>{
    return this.http.get<Societe>(`${this.constant.societeUrl}/${id}`);
  }

  getAllSocietes(): Observable<Societe[]>{
    return this.http.get<Societe[]>(`${this.constant.societeUrl}`);
  }

  getSocieteList(params?: any): Observable<any> {
    return this.http.get<any>(`${this.constant.societeUrl}/pagination`, { params });
  }

  addSociete(societe: Societe): Observable<any> {
    return this.http.post(`${this.constant.societeUrl}`, societe);
  }

  updateSocieteById( id :number, societe: Societe) :Observable<Societe>{
    return this.http.put<Societe>(`${this.constant.societeUrl}/${id}`,societe);
  }

  deleteSocieteById(id :number):Observable<string>{
   return this.http.delete(`${this.constant.societeUrl}/${id}`,{ responseType: 'text'});
  }


  getSocieteByName(): Observable<Societe[]>{
    return this.http.get<Societe[]>(`${this.constant.societeUrl}/recipient`)
  }


    //++
    getOpportunitesForSociete(id :number):Observable<Opportunite[]>{
      return this.http.get<Opportunite[]>(`${this.constant.societeOppUrl}/${id}`);
    }
    getDevisForSociete(id :number):Observable<Devis[]>{
      return this.http.get<Devis[]>(`${this.constant.societeDevisUrl}/${id}`);
    }

    getFactureForSociete(id :number):Observable<Facture[]>{
      return this.http.get<Facture[]>(`${this.constant.societeFactureUrl}/${id}`);
    }



}
