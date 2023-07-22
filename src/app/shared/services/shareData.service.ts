import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class ShareDataService {
  private pdfDataSubject = new BehaviorSubject<Blob | null>(null);
  pdfData$ = this.pdfDataSubject.asObservable();

  showPdf(data: Blob) {
    console.log('Received PDF data in ShareDataService:', data);
    this.pdfDataSubject.next(data);
  }
}
