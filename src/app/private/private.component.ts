import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {

  ngOnInit(): void {
  }
  // @ViewChild('sliderRef') sliderRef: ElementRef;

  isSidenavOpen: boolean = true;
  isSmallScreen: boolean;
  isdropMenuMobile: boolean;
  constructor() {
    this.checkScreenSize();
    // this.ngAfterViewInit() ;
  }

// nav bar height
  @ViewChild('navbarRef') navbarRef!: ElementRef;
  navbarHeight: number =0;

  ngAfterViewInit() {
    this.navbarHeight = this.navbarRef.nativeElement.offsetHeight;
    console.log(this.navbarHeight);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 696;
  }



  onSidenavOpenChange(value: boolean) {
    this.isSidenavOpen = value;
    console.log('isSidenavOpen:', value);

  }

  onDropMenu(value: boolean) {
    this.isdropMenuMobile = value;
    console.log('isdropMenuMobile', value);
  }



}
