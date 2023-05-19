import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';


@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {
  // @ViewChild('sliderRef') sliderRef: ElementRef;

  isSidenavOpen: boolean = true;
  isSmallScreen: boolean;
  isdropMenuMobile: boolean;
  constructor() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 696;
  }

  ngOnInit(): void {
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
