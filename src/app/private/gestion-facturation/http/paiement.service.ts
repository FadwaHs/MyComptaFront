import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConstantUrl } from "src/app/shared/config/constant-url";
import { Paiement } from "../models/paiement";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  constructor(private http : HttpClient, private constant : ConstantUrl) { }

  getPaiementById(id :number):Observable<Paiement>{
    return this.http.get<Paiement>(`${this.constant.paiementUrl}/${id}`);
  }

  getAllPaiements(): Observable<Paiement[]>{
    return this.http.get<Paiement[]>(`${this.constant.paiementUrl}`);
  }

  addPaiement(paiement: Paiement): Observable<any> {
    return this.http.post(`${this.constant.paiementUrl}`, paiement);
  }

  updatePaiementById( id :number, paiement: Paiement) :Observable<Paiement>{
    return this.http.put<Paiement>(`${this.constant.paiementUrl}/${id}`,paiement);
  }

  deletePaiementById(id :number):Observable<string>{
   return this.http.delete(`${this.constant.paiementUrl}/${id}`,{ responseType: 'text'});
  }
}
