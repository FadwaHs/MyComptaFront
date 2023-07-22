import { ModalComponent } from './directives/modal.components';
import {  NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { SliderComponent } from './components/slider/slider.component';
import { IvyCarouselModule } from 'angular14-responsive-carousel';
import { CardComponent } from './components/card/card.component';
import { DropMenuComponent } from './components/drop-menu/drop-menu.component';
import { RouterModule } from '@angular/router';
import {  TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { LanguageService } from './services/language.service';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ActivityPanelComponent } from './components/activity-panel/activity-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EmptyDataMessageComponent } from './components/empty-data-message/empty-data-message.component';
import { ChipsInputComponent } from './components/chips-input/chips-input.component';
import { DebounceClickDirective } from './directives/debounce-click.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationComponent } from './components/pagination/pagination.component';
import { AllowInputDirective } from './directives/allow-input.directive';
import { PhoneFormComponent } from './components/phone-form/phone-form.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { KeyWordFormComponent } from './components/key-word-form/key-word-form.component';
import { SelectClientFormComponent } from './components/select-client-form/select-client-form.component';
import { SelectRecipientComponent } from './components/select-recipient/select-recipient.component';
import { ArticlePanelComponent } from './components/article-panel/article-panel.component';
import { ReglementFormComponent } from './components/reglement-form/reglement-form.component';
import { TextFieldFormComponent } from './components/text-field-form/text-field-form.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { DropMenuGlobalComponent } from './components/drop-menu-global/drop-menu-global.component';
import { CardGlobalComponent } from './components/card-global/card-global.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { Ng2TelInputModule } from 'ng2-tel-input';




@NgModule({
  declarations: [
    AddressFormComponent,
    KeyWordFormComponent,
    SelectClientFormComponent,
    SelectRecipientComponent,
    ArticlePanelComponent,
    ReglementFormComponent,
    TextFieldFormComponent,
    ClickOutsideDirective,
    SliderComponent,
    CardComponent,
    DropMenuComponent,
    TopBarComponent,
    ActivityPanelComponent,
    PhoneFormComponent,
    EmptyDataMessageComponent,
    EmptyDataMessageComponent,
    ChipsInputComponent,
    DebounceClickDirective,
    PaginationComponent,
    AllowInputDirective,
    CustomInputComponent,
    DropMenuGlobalComponent,
    ModalComponent,
    CardGlobalComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularSvgIconModule,
    HttpClientModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxPaginationModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    OverlayModule,
    NgxIntlTelInputModule,

  ],
  exports : [
    AddressFormComponent,
    KeyWordFormComponent,
    SelectClientFormComponent,
    SelectRecipientComponent,
    ArticlePanelComponent,
    ReglementFormComponent,
    TextFieldFormComponent,
    DebounceClickDirective,
    ClickOutsideDirective,
    AngularSvgIconModule,
    SliderComponent,
    CardComponent,
    TranslateModule,
    HttpClientModule,
    TopBarComponent,
    DropMenuComponent,
    ActivityPanelComponent,
    PhoneFormComponent,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    EmptyDataMessageComponent,
    ChipsInputComponent,
    NgxPaginationModule,
    PaginationComponent,
    AllowInputDirective,
    CustomInputComponent,
    DropMenuGlobalComponent,
    ModalComponent,
    CardGlobalComponent,
    IvyCarouselModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    OverlayModule,
    NgxIntlTelInputModule,






  ],
  providers :[
    LanguageService,
    DatePipe,
    DecimalPipe,

    Ng2TelInputModule,



  ]
})
export class SharedModule {

}
