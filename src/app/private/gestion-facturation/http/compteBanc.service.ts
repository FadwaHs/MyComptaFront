import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConstantUrl } from "src/app/shared/config/constant-url";
import { CompteBanc } from "../models/compte-banc";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CompteBcService
{
  constructor(private http : HttpClient, private constant : ConstantUrl) { }

  getCompteBcById(id :number):Observable<CompteBanc>{
    return this.http.get<CompteBanc>(`${this.constant.compteUrl}/${id}`);
  }

  getCompteBancList(): Observable<CompteBanc[]>{
    return this.http.get<CompteBanc[]>(`${this.constant.compteUrl}`);
  }

  addCompteBanc(compteBancs: CompteBanc): Observable<any> {
    return this.http.post(`${this.constant.compteUrl}`, compteBancs);
  }

  updateCompteBancById( id :number, compteBancs: CompteBanc) :Observable<CompteBanc>{
    return this.http.put<CompteBanc>(`${this.constant.compteUrl}/${id}`,compteBancs);
  }

  deleteCompteBancById(id :number):Observable<string>{
   return this.http.delete(`${this.constant.compteUrl}/${id}`,{ responseType: 'text'});
  }


}
