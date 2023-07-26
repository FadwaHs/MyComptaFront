import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DevisService } from '../../http/devis.service';
import { ShareDataService } from 'src/app/shared/services/shareData.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PdfService } from 'src/app/shared/services/pdf.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent  {

  pdfSrc: SafeResourceUrl | null = null;
  private pdfSubscription: Subscription | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private shareDataService: ShareDataService
  ) {}

  ngOnInit() {
    this.pdfSubscription = this.shareDataService.pdfData$.subscribe(
      (data: Blob | null) => this.showPdf(data),
      (error) => console.error('Error in PdfComponent subscription:', error)
    );
  }

  ngOnDestroy() {
    if (this.pdfSubscription) {
      this.pdfSubscription.unsubscribe();
    }
  }

  showPdf(data: Blob | null) {

    if (data) {
      const blob = new Blob([data], { type: 'application/pdf' });
      const unsafeUrl = window.URL.createObjectURL(blob);

      // Sanitize the URL to obtain a safe resource URL
      this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
    } else {
      // Handle the case when data is null, e.g., show a default message or hide the iframe
      this.pdfSrc = null;
    }
  }

}
