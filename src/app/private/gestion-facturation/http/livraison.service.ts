import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConstantUrl } from "src/app/shared/config/constant-url";
import { Livraison } from "../models/livraison";

@Injectable({
  providedIn: 'root'
})

export class LivraisonService {

  constructor(private http : HttpClient, private constant : ConstantUrl) { }

  getLivraisonById(id :number):Observable<Livraison>{
    return this.http.get<Livraison>(`${this.constant.livraisonUrl}/${id}`);
  }

  getAllLivraison(): Observable<Livraison[]>{
    return this.http.get<Livraison[]>(`${this.constant.livraisonUrl}`)
  }

  // getListLivraison(params: any): Observable<any> {
  //   return this.http.get<any>(`${this.constant.livraisonUrl}/pagination`, { params });
  // }

  addLivraison(livraison: Livraison): Observable<any> {
    return this.http.post(`${this.constant.livraisonUrl}`, livraison);
  }

  updateLivraisonById( id :number, livraison:Livraison) :Observable<Livraison>{
    return this.http.put<Livraison>(`${this.constant.livraisonUrl}/${id}`,livraison);
  }
  deleteLivraisonById(id :number):Observable<string>{
   return this.http.delete(`${this.constant.livraisonUrl}/${id}`,{ responseType: 'text'});
  }

}




