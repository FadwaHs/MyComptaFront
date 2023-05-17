import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { FilterService } from 'src/app/shared/services/filter.service';
import { NavigateService } from '../../../shared/services/navigate.service';
// import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

// import { CdkOverlayOrigin } from '@angular/cdk/overlay';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  // @ViewChild('menuTrigger', { static: true, read: CdkOverlayOrigin })
  // menuTrigger!: CdkOverlayOrigin;
  dropMenuMobile = false;
  dropMenuProfile = false;
  dropMenuFacture = false;
  data: string = '';
  navBarType: 'facturation' | 'personnel' | 'global';
  event$: any;

  constructor(
    private filterService: FilterService,
    private router: Router,
    protected navigate: NavigateService,
    // @Inject('ajoutToken') ajout: boolean,
  ) {}

  ngOnInit(): void {
    this.setNavBarType();
  }


  checkfacturesRouteIsActive() : boolean{
    return this.router.isActive(this.navigate.f_facturePath,{paths: 'subset', queryParams: 'subset', fragment: 'ignored', matrixParams: 'subset'})
  }

  setNavBarType() {
    if (/.*\/facturation.*/g.test(this.router.url)) {
      this.navBarType = 'facturation';
      return;
    } else if (/.*\/personnel.*/g.test(this.router.url)) {
      this.navBarType = 'personnel';
      return;
    }

    this.navBarType = 'global';
  }

  dataSearchChange() {
    this.filterService.callMethodSearch(this.data);
  }

  toggleDropMenuMobile(event: Event) {
    event.preventDefault();
    if (this.dropMenuMobile) {
      this.dropMenuMobile = false;
    } else {
      this.dropMenuMobile = true;
    }
  }

  toggleDropMenuProfile(event: Event) {
    event.preventDefault();
    if (this.dropMenuProfile) {
      this.dropMenuProfile = false;
    } else {
      this.dropMenuProfile = true;
    }
  }


//  ajout

isMenuOpen = false;
isNestedMenu1Open = false;
isNestedMenu2Open = false;

openMenu(): void {
  this.isMenuOpen = true;
}

closeMenu(): void {
  this.isMenuOpen = false;
  this.isNestedMenu1Open = false;
  this.isNestedMenu2Open = false;
}



openNestedMenu1(): void {
  this.isNestedMenu1Open = true;
}

closeNestedMenu1(): void {
  this.isNestedMenu1Open = false;
}

openNestedMenu2(): void {
  this.isNestedMenu2Open = true;
}

closeNestedMenu2(): void {
  this.isNestedMenu2Open = false;
}







}
