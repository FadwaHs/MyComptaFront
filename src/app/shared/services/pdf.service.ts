import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor(private http: HttpClient) {}

  getDevisPdfData(devisId: number): Observable<Blob> {
    const url = `http://localhost:8082/api/pdf/devis/${devisId}`;
  console.log('Fetching PDF data from:', url);
  return this.http.get(url, { responseType: 'blob' }).pipe(
    tap((data: Blob) => {
      console.log('Received PDF data in PdfService:', data);
    })
  );
  }
}

