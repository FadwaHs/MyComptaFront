import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConstantUrl } from "src/app/shared/config/constant-url";
import { Observable } from "rxjs";
import { CompteTiers } from "../models/compte_tiers";

@Injectable({
  providedIn: 'root'
})
export class CompteTiersService {


  constructor(private http : HttpClient, private constant : ConstantUrl) { }

  getCompteTiersById(id :number):Observable<CompteTiers>{
    return this.http.get<CompteTiers>(`${this.constant.compteTiersUrl}/${id}`);
  }


  getAllCompteTiers(): Observable<CompteTiers[]>{
    return this.http.get<CompteTiers[]>(`${this.constant.compteTiersUrl}`)
  }


  //++
  addCompteTiers(compteTiers: CompteTiers): Observable<any> {
    return this.http.post(`${this.constant.compteTiersUrl}`, compteTiers);
  }

  updateCompteTiersById( id :number, compteTiers: CompteTiers) :Observable<CompteTiers>{
    return this.http.put<CompteTiers>(`${this.constant.compteTiersUrl}/${id}`,compteTiers);
  }

  deleteCompteTiersById(id :number):Observable<string>{
   return this.http.delete(`${this.constant.compteTiersUrl}/${id}`,{ responseType: 'text'});
  }

}
