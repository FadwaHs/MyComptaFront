import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantUrl } from 'src/app/shared/config/constant-url';
import { Facture } from '../models/facture';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactureService {


  constructor(private http : HttpClient, private constant : ConstantUrl) { }

  getAllFacture(): Observable<Facture[]>{
    return this.http.get<Facture[]>(`${this.constant.factureUrl}`)
  }

}
