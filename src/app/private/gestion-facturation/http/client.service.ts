import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, from, Observable } from 'rxjs';
import { ConstantUrl } from 'src/app/shared/config/constant-url';
import { Client } from '../models/client';
import { Opportunite } from '../models/opportunite';
import { Devis } from '../models/devis';
import { Societe } from '../models/societe';
import { Facture } from '../models/facture';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http : HttpClient, private constant : ConstantUrl) { }

  getClientById(id :number):Observable<Client>{
    return this.http.get<Client>(`${this.constant.clientUrl}/${id}`);
  }

  getAllClients(): Observable<Client[]>{
    return this.http.get<Client[]>(`${this.constant.clientUrl}`)
  }

  getClientList(params: any): Observable<any> {
    return this.http.get<any>(`${this.constant.clientUrl}/pagination`, { params });
  }

  addClient(client: Client): Observable<any> {
    return this.http.post(`${this.constant.clientUrl}`, client);
  }

  updateClientById( id :number, client: Client) :Observable<Client>{
    return this.http.put<Client>(`${this.constant.clientUrl}/${id}`,client);
  }

  deleteClientById(id :number):Observable<string>{
   return this.http.delete(`${this.constant.clientUrl}/${id}`,{ responseType: 'text'});
  }

  getClientListPar(): Observable<Client[]>{
    return this.http.get<Client[]>(`${this.constant.clientUrl}/par`)
  }
  getClientListPro(): Observable<Client[]>{
    return this.http.get<Client[]>(`${this.constant.clientUrl}/pro`)
  }

  getClientsByFirstNameAndLastName(): Observable<Client[]>{
    return this.http.get<Client[]>(`${this.constant.clientUrl}/recipient`)
  }

  getOpportunitesForClient(id :number):Observable<Opportunite[]>{
    return this.http.get<Opportunite[]>(`${this.constant.clientOppUrl}/${id}`);
  }
  getDevisForClient(id :number):Observable<Devis[]>{
    return this.http.get<Devis[]>(`${this.constant.clientDevisUrl}/${id}`);
  }

   //++
   getSocieteForClient(id: number): Observable<any> {
    return this.http.get<Societe>(`${this.constant.clientSocieteUrl}/${id}`);
  }

  getFactureForClient(id :number):Observable<Facture[]>{
    return this.http.get<Facture[]>(`${this.constant.clientFactureUrl}/${id}`);
  }
}
