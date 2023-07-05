import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConstantUrl } from "src/app/shared/config/constant-url";
import { Fournisseur } from "../models/fournisseur";
import { Observable } from "rxjs";
import { AvoireFournisseur } from "../models/avoir-fournisseur";
import { SimpleFournisseur } from "../models/simple-fournisseur";
import { BonsCommande } from "../models/bons-commande";
import { BonLivraison } from "../models/bons-livraison";


@Injectable({
  providedIn: 'root'
})

export class FournisseurService{
  constructor(private http : HttpClient, private constant : ConstantUrl) { }

  getFournisseurById(id: number):Observable<Fournisseur>{
    return this.http.get<Fournisseur>(`${this.constant.fournisseurUrl}/${id}`);
  }

  getAllFournisseur():Observable<Fournisseur[]>{
    return this.http.get<Fournisseur[]>(`${this.constant.fournisseurUrl}`)
  }

  createFournisseur(fournisseur: Fournisseur):Observable<any>{
    return this.http.post(`${this.constant.fournisseurUrl}`, fournisseur);
  }

  updateFournisseur(id :number, fournisseur: Fournisseur):Observable<Fournisseur>{
    return this.http.put<Fournisseur>(`${this.constant.fournisseurUrl}/${id}`,fournisseur);
  }

  deleteFournisseur(id: number):Observable<string>{
    return this.http.delete(`${this.constant.fournisseurUrl}/${id}`,{ responseType: 'text'});
  }

   getFournisseurList(params: any): Observable<any> {
    return this.http.get<any>(`${this.constant.fournisseurUrl}/pagination`, { params });
  }

  getFournisseursByFirstNameAndLastName(): Observable<Fournisseur[]>{
    return this.http.get<Fournisseur[]>(`${this.constant.fournisseurUrl}/recipient`)
  }

  //
  getAllSimpleForFournisseur(id :number):Observable<SimpleFournisseur[]>{
    return this.http.get<SimpleFournisseur[]>(`${this.constant.fournisseurFUrl}/${id}`);
  }

  getAllAvoirForFournisseur(id :number):Observable<AvoireFournisseur[]>{
    return this.http.get<AvoireFournisseur[]>(`${this.constant.fournisseurFAUrl}/${id}`);
  }
  getAllBonsCommandeForFournisseur(id :number):Observable<BonsCommande[]>{
    return this.http.get<BonsCommande[]>(`${this.constant.fournisseurBCUrl}/${id}`);
  }

  getAllBonLivraisonForFournisseur(id :number):Observable<BonLivraison[]>{
    return this.http.get<BonLivraison[]>(`${this.constant.fournisseurBLUrl}/${id}`);
  }
}


