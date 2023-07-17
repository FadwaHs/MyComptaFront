import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConstantUrl } from "src/app/shared/config/constant-url";
import { BonsCommande } from "../models/bons-commande";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class BonCommandeService {

  constructor(private http : HttpClient, private constant : ConstantUrl) { }

  getBonCommandeById(id :number):Observable<BonsCommande>{
    return this.http.get<BonsCommande>(`${this.constant.bonCommandeUrl}/${id}`);
  }

  getAllBonsCommande(): Observable<BonsCommande[]>{
    return this.http.get<BonsCommande[]>(`${this.constant.bonCommandeUrl}`)
  }

  getListBonsCommande(params: any): Observable<any> {
    return this.http.get<any>(`${this.constant.bonCommandeUrl}/pagination`, { params });
  }

  addBonCommande(bonCommande: BonsCommande): Observable<any> {
    return this.http.post(`${this.constant.bonCommandeUrl}`, bonCommande);
  }

  updateBonCommandeById( id :number, bonCommande: BonsCommande) :Observable<BonsCommande>{
    return this.http.put<BonsCommande>(`${this.constant.bonCommandeUrl}/${id}`,bonCommande);
  }
  deleteBonCommandeById(id :number):Observable<string>{
   return this.http.delete(`${this.constant.bonCommandeUrl}/${id}`,{ responseType: 'text'});
  }

}




