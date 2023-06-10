import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConstantUrl } from "src/app/shared/config/constant-url";
import { AvoireFournisseur } from "../models/avoir-fournisseur";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AvoirFournisseurService{

  constructor(private http : HttpClient, private constant : ConstantUrl) { }


  getAvoirFourById(id :number):Observable<AvoireFournisseur>{
    return this.http.get<AvoireFournisseur>(`${this.constant.avoirfournisseurUrl}/${id}`);
  }

  getAllSAvoirsFour(): Observable<AvoireFournisseur[]>{
    return this.http.get<AvoireFournisseur[]>(`${this.constant.avoirfournisseurUrl}`)
  }

  addSAvoirFour(avoirFournisseur: AvoireFournisseur): Observable<any> {
    return this.http.post(`${this.constant.avoirfournisseurUrl}`, avoirFournisseur);
  }

  updateAvoirFourById( id :number, avoirFournisseur: AvoireFournisseur) :Observable<AvoireFournisseur>{
    return this.http.put<AvoireFournisseur>(`${this.constant.avoirfournisseurUrl}/${id}`,avoirFournisseur);
  }

  deleteAvoirFourById(id :number):Observable<string>{
   return this.http.delete(`${this.constant.avoirfournisseurUrl}/${id}`,{ responseType: 'text'});
  }

  getAvoirFourList(params: any): Observable<any> {
    return this.http.get<any>(`${this.constant.avoirfournisseurUrl}/pagination`, { params });
  }
}
