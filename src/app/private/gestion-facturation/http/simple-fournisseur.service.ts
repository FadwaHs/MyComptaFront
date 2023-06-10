import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConstantUrl } from "src/app/shared/config/constant-url";
import { SimpleFournisseur } from "../models/simple-fournisseur";

@Injectable({
  providedIn: 'root'
})
export class SimpleFournisseurService{

  constructor(private http : HttpClient, private constant : ConstantUrl) { }

  getSimpleFourById(id :number):Observable<SimpleFournisseur>{
    return this.http.get<SimpleFournisseur>(`${this.constant.simplefournisseurUrl}/${id}`);
  }

  getAllSimplesFour(): Observable<SimpleFournisseur[]>{
    return this.http.get<SimpleFournisseur[]>(`${this.constant.simplefournisseurUrl}`)
  }

  addSimpleFour(simpleFournisseur: SimpleFournisseur): Observable<any> {
    return this.http.post(`${this.constant.simplefournisseurUrl}`, simpleFournisseur);
  }

  updateSimpleFourById( id :number, simpleFournisseur: SimpleFournisseur) :Observable<SimpleFournisseur>{
    return this.http.put<SimpleFournisseur>(`${this.constant.simplefournisseurUrl}/${id}`,simpleFournisseur);
  }

  deleteSimpleFourById(id :number):Observable<string>{
   return this.http.delete(`${this.constant.simplefournisseurUrl}/${id}`,{ responseType: 'text'});
  }

  getSimpleFourList(params: any): Observable<any> {
    return this.http.get<any>(`${this.constant.simplefournisseurUrl}/pagination`, { params });
  }
}
