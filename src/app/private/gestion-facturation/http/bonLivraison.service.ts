import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConstantUrl } from "src/app/shared/config/constant-url";
import { BonLivraison } from "../models/bons-livraison";


@Injectable({
  providedIn: 'root'
})

export class BonLivraisonService {

  constructor(private http : HttpClient, private constant : ConstantUrl) { }

  getBonLivraisonById(id :number):Observable<BonLivraison>{
    return this.http.get<BonLivraison>(`${this.constant.bonLivraisonUrl}/${id}`);
  }

  getAllBonLivraison(): Observable<BonLivraison[]>{
    return this.http.get<BonLivraison[]>(`${this.constant.bonLivraisonUrl}`)
  }

  getListBonLivraison(params: any): Observable<any> {
    return this.http.get<any>(`${this.constant.bonLivraisonUrl}/pagination`, { params });
  }

  addBonLivraison(bonslivraison: BonLivraison): Observable<any> {
    return this.http.post(`${this.constant.bonLivraisonUrl}`, bonslivraison);
  }

  updateBonLivraisonById( id :number, bonslivraison: BonLivraison) :Observable<BonLivraison>{
    return this.http.put<BonLivraison>(`${this.constant.bonLivraisonUrl}/${id}`,bonslivraison);
  }
  deleteBonLivraisonById(id :number):Observable<string>{
   return this.http.delete(`${this.constant.bonLivraisonUrl}/${id}`,{ responseType: 'text'});
  }

}




