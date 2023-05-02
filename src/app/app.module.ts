import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';
import { PrivateComponent } from './private/private.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeEn from '@angular/common/locales/en';
import { MatDialog } from '@angular/material/dialog';
import { FacturesModule } from './private/gestion-facturation/components/factures/factures.module';
import { NgSelectModule } from '@ng-select/ng-select';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
export function createTranslateLoader(http: HttpClient) {    return new TranslateHttpLoader(http, './assets/i18n/', '.json');}

function defaultLang() {
  if(localStorage.getItem('lang')){
    if(localStorage.getItem('lang') != 'fr' && localStorage.getItem('lang') != 'en'){
      localStorage.removeItem('lang')
      localStorage.setItem('lang','fr');
      return 'fr';
    }
    else{
      return localStorage.getItem('lang') || 'fr';
    }
  }
  else{
    localStorage.setItem('lang','fr');
    return 'fr';
  }
}


function getCurrentLocal(){
  if(localStorage.getItem('lang') == 'en'){
    registerLocaleData(localeEn)
    return 'en-EN'
  }
  else{
    registerLocaleData(localeFr)
    return 'fr-FR'
  }
}


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularSvgIconModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      defaultLanguage: defaultLang(),
    }),
    FacturesModule,
    NgSelectModule,

  ],
  providers: [
    { provide: LOCALE_ID, useValue: getCurrentLocal() },
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
