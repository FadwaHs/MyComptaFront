import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  @Input() isdropMenuMobile: boolean;
  @Output() dropMenu: EventEmitter<boolean> = new EventEmitter<boolean>();
  dropMenuMobile = false;
  dropMenuProfile = false;
  dropMenuFacture = false;
  data: string = '';
  navBarType: 'facturation' | 'personnel' | 'global';
  event$: any;

  constructor(
    private filterService: FilterService,
    public navigate: NavigateService, private router: Router
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
    // this.isdropMenuMobile = this.dropMenuMobile;
    // this.dropMenu.emit(this.isdropMenuMobile);
    // console.log(this.isdropMenuMobile);
  }

  toggleDropMenuProfile(event: Event) {
    event.preventDefault();
    if (this.dropMenuProfile) {
      this.dropMenuProfile = false;
    } else {
      this.dropMenuProfile = true;
    }

    this.isdropMenuMobile = this.dropMenuProfile;
    this.dropMenu.emit(this.isdropMenuMobile);
    console.log(this.isdropMenuMobile);
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

//dropdown mobile menu
isMobileLinkActive(link: string): boolean {
  return this.router.isActive(link, false);
}






}
