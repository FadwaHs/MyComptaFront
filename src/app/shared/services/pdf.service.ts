import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ConstantUrl } from '../config/constant-url';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor(private http: HttpClient,private constant :ConstantUrl) {}

  getDevisPdfData(devisId: number): Observable<Blob> {

    //const url = `${this.constant.pdfDevissUrl}/${devisId}`;
 // console.log('Fetching PDF data from:', url);
    return this.http.get(`${this.constant.pdfDevissUrl}/${devisId}`, { responseType: 'blob' }).pipe(
      tap((data: Blob) => {
      })
    );
  }



  getSimplePdfData(simpleId: number): Observable<Blob> {
    return this.http.get(`${this.constant.pdfFactSimsUrl}/${simpleId}`, { responseType: 'blob' }).pipe(
      tap((data: Blob) => {
      })
    );
  }

  getAcomptePdfData(acompteId: number): Observable<Blob> {
    return this.http.get(`${this.constant.pdfFactAcomUrl}/${acompteId}`, { responseType: 'blob' }).pipe(
      tap((data: Blob) => {
      })
    );
  }

  getAvoirPdfData(avoirId: number): Observable<Blob> {
    return this.http.get(`${this.constant.pdfFactAvoirUrl}/${avoirId}`, { responseType: 'blob' }).pipe(
      tap((data: Blob) => {
      })
    );
  }
}

