import { Component, Injector } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
import { TranslateService } from '@ngx-translate/core';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { forkJoin } from 'rxjs';
const listIconsvg: string[] = [
  'dashboard',
  'clients',
  'societes',
  'devis',
  'factures',
  'search',
  'notification',
  'message',
  'arrowdown',
  'arrowup',
  'help',
  'logout',
  'feedback',
  'settings',
  'add',
  '3dots',
  'plus',
  'minus',
  'export',
  'phone',
  'email',
  'map',
  'edit',
  'delete',
  'par',
  'pro',
  'menu',
  'date',
  'money',
  'time',
  'chart',
  'copy',
  'valid',
  'per',
  'rh',
  'recrute',
  'people'
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'MyCompta-Front';

  constructor(
    private svgIconRegistryService: SvgIconRegistryService,
    private config: NgSelectConfig,
    private translateService: TranslateService,
  ) {

    listIconsvg.forEach((name) => {
      this.svgIconRegistryService
        .loadSvg(`./assets/svg/${name}.svg`, name)
        ?.subscribe((res) => {});
    });

    forkJoin({
      source1: this.translateService.get('FORM.SELECT.NF'),
      source2: this.translateService.get('FORM.SELECT.CN'),
    }).subscribe({
      next: ({ source1, source2 }) => {
        this.config.notFoundText = source1;
        this.config.addTagText = source2;
      },
      error: (e) => console.log(e),
    });
  }
}
