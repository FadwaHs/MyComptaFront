import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConstantUrl } from "src/app/shared/config/constant-url";
import { Observable } from "rxjs";
import { CompteCharge } from "../models/compte_charge";


@Injectable({
  providedIn: 'root'
})
export class CompteChargeService {


  constructor(private http : HttpClient, private constant : ConstantUrl) { }

  getCompteChargeById(id :number):Observable<CompteCharge>{
    return this.http.get<CompteCharge>(`${this.constant.compteChargeUrl}/${id}`);
  }


  getAllCompteCharge(): Observable<CompteCharge[]>{
    return this.http.get<CompteCharge[]>(`${this.constant.compteChargeUrl}`)
  }


  //++
  addCompteCharge(compte_charge: CompteCharge): Observable<any> {
    return this.http.post(`${this.constant.compteChargeUrl}`, compte_charge);
  }

  updateCompteChargeById( id :number, compte_charge: CompteCharge) :Observable<CompteCharge>{
    return this.http.put<CompteCharge>(`${this.constant.compteChargeUrl}/${id}`,compte_charge);
  }

  deleteCompteTiersById(id :number):Observable<string>{
   return this.http.delete(`${this.constant.compteChargeUrl}/${id}`,{ responseType: 'text'});
  }

}

