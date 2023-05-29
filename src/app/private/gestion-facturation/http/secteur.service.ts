import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConstantUrl } from "src/app/shared/config/constant-url";
import { Secteur } from "../models/secteur";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SecteurService {

  constructor(private http : HttpClient, private constant : ConstantUrl) { }

  getSecteurById(id :number):Observable<Secteur>{
    return this.http.get<Secteur>(`${this.constant.secteursUrl}/${id}`);
  }

  getAllSecteurs(): Observable<Secteur[]>{
    return this.http.get<Secteur[]>(`${this.constant.secteursUrl}`);
  }

  addSecteur(secteur: Secteur): Observable<any> {
    return this.http.post(`${this.constant.secteursUrl}`, secteur);
  }

  updateSecteurById( id :number, secteur: Secteur) :Observable<Secteur>{
    return this.http.put<Secteur>(`${this.constant.secteursUrl}/${id}`,secteur);
  }

  deleteSecteurById(id :number):Observable<string>{
   return this.http.delete(`${this.constant.secteursUrl}/${id}`,{ responseType: 'text'});
  }
}
