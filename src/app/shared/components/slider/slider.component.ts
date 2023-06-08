import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigateService } from '../../services/navigate.service';
import { Router } from '@angular/router';

interface Link {
  path: string;
  label: string;
  isActive: boolean;
  hasHoverMenu?: boolean;
  // hoverMenuItem? : string[];
  hoverMenuItem? :  HoverMenuItem[];
  verticalSpacing? :number;
}

interface HoverMenuItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SliderComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @Input() isSidenavOpen: boolean;
  @Output() sidenavOpenChange:EventEmitter<boolean> = new EventEmitter();

  isButtonClicked: any ;
  lastClickedButtonIndex: any;


  constructor(public navigate: NavigateService, private router: Router) {
    this.letters.forEach(() => this.menuVisible.push(false));
  }

  ngOnInit(): void {
    this.setupDropdownPositions();

   }


  menuVisible: boolean[] = [];
  isArrowIcon = true;
  letters = ['TDB', 'CT', 'OP', 'F', 'AC', 'BQ', 'CTG', 'TR', 'CP', 'AB', 'ED', 'RP', 'FCH', 'ST'];

//   links: Link[] = [
//     { path: 'TDB', label: 'DATA_NAME.TDB', isActive: false },
//     { path: 'CT', label: 'DATA_NAME.CT', isActive: false, hasHoverMenu : true, hoverMenuItem: ['DATA_NAME.ACT', 'DATA_NAME.LC', 'DATA_NAME.AP', 'DATA_NAME.LP', 'DATA_NAME.AF', 'DATA_NAME.LF', 'DATA_NAME.ACC', 'DATA_NAME.LCC', 'DATA_NAME.LS', 'DATA_NAME.LPR', 'DATA_NAME.LD', 'DATA_NAME.AS'],verticalSpacing: 47 },
//     { path: 'OP', label: 'DATA_NAME.OP', isActive: false, hasHoverMenu : true, hoverMenuItem: ['DATA_NAME.COP', 'DATA_NAME.LOP', 'DATA_NAME.VP'] ,verticalSpacing: 6},
//     { path: 'F', label: 'DATA_NAME.FC', isActive: false, hasHoverMenu : true, hoverMenuItem: ['DATA_NAME.CD', 'DATA_NAME.LDV', 'DATA_NAME.LB', 'DATA_NAME.CF', 'DATA_NAME.LFC', 'DATA_NAME.CA', 'DATA_NAME.LA', 'DATA_NAME.CAM', 'DATA_NAME.LM', 'DATA_NAME.JF', 'DATA_NAME.DLD', 'DATA_NAME.LE'], verticalSpacing: 1},
//     { path: 'AC', label: 'DATA_NAME.ACH', isActive: false, hasHoverMenu : true, hoverMenuItem: ['DATA_NAME.IF', 'DATA_NAME.SF', 'DATA_NAME.CFF', 'DATA_NAME.LFF', 'DATA_NAME.CAF', 'DATA_NAME.LAF', 'DATA_NAME.CBC', 'DATA_NAME.LBC', 'DATA_NAME.CBL', 'DATA_NAME.LBL', 'DATA_NAME.DLD'], verticalSpacing: 47.7 },
//     { path: 'BQ', label: 'DATA_NAME.BQ', isActive: false, hasHoverMenu : true, hoverMenuItem: ['DATA_NAME.AR', 'DATA_NAME.LR', 'DATA_NAME.LRB'], verticalSpacing: 8 },
//     { path: 'CTG', label: 'DATA_NAME.CTG', isActive: false, hasHoverMenu : true, hoverMenuItem: ['DATA_NAME.APR', 'DATA_NAME.LPRS', 'DATA_NAME.LDT', 'DATA_NAME.ASV', 'DATA_NAME.LSV', 'DATA_NAME.LPM', 'DATA_NAME.CPM', 'DATA_NAME.CCP', 'DATA_NAME.DC', 'DATA_NAME.SC', 'DATA_NAME.CTR'], verticalSpacing: 0.5 },
//     { path: 'TR', label: 'DATA_NAME.TR', isActive: false, verticalSpacing: 42.2 },
//     { path: 'CP', label: 'DATA_NAME.CP', isActive: false, hasHoverMenu : true, hoverMenuItem: ['DATA_NAME.JRV', 'DATA_NAME.JRA', 'DATA_NAME.JRT', 'DATA_NAME.JRO', 'DATA_NAME.BC', 'DATA_NAME.BF', 'DATA_NAME.TVA', 'DATA_NAME.CPT', 'DATA_NAME.CE', 'DATA_NAME.CFP', 'DATA_NAME.PC'], verticalSpacing: 38 },
//     { path: 'AB', label: 'DATA_NAME.AB', isActive: false, hasHoverMenu : true, hoverMenuItem: ['DATA_NAME.CAB', 'DATA_NAME.LAB', 'DATA_NAME.LOC'], verticalSpacing: 49.8 },
//     { path: 'ED', label: 'DATA_NAME.ED', isActive: false, hasHoverMenu : true, hoverMenuItem: ['DATA_NAME.NMR', 'DATA_NAME.LMR', 'DATA_NAME.NDR', 'DATA_NAME.LDR'] },
//     { path: 'RP', label: 'DATA_NAME.RP', isActive: false },
//     { path: 'FCH', label: 'DATA_NAME.FCH', isActive: false },
//     { path: 'ST', label: 'DATA_NAME.ST', isActive: false, hasHoverMenu : true, hoverMenuItem: ['DATA_NAME.SH', 'DATA_NAME.SR', 'DATA_NAME.LEN', 'DATA_NAME.T']  },
//  ];

links: Link[] = [
  { path: 'TDB', label: 'DATA_NAME.TDB', isActive: false },
  { path: 'CT', label: 'DATA_NAME.CT', isActive: false, hasHoverMenu : true, hoverMenuItem: [{label:'DATA_NAME.ACT', path:"/environment/1/facturation/clients/add"}, {label:'DATA_NAME.LC', path:"/environment/1/facturation/clients"},   {label:'DATA_NAME.AS', path:"/environment/1/facturation/societes/add"}, {label:'DATA_NAME.LS', path:"/environment/1/facturation/societes"} ],verticalSpacing: 47 },
  { path: 'OP', label: 'DATA_NAME.OP', isActive: false, hasHoverMenu : true, hoverMenuItem: [{label:'DATA_NAME.COP', path:"/environment/1/facturation/opportunites/add"} ,{label:'DATA_NAME.LOP', path:"/environment/1/facturation/opportunites"} , {label:'DATA_NAME.VP', path:"/environment/1/facturation/pipeline"}] ,verticalSpacing: 6},
  { path: 'F', label: 'DATA_NAME.FC', isActive: false, hasHoverMenu : true, hoverMenuItem: [ {label:'DATA_NAME.CD', path:"/environment/1/facturation/devis/add"},  {label:'DATA_NAME.LDV', path:"/environment/1/facturation/devis/"},   {label:'DATA_NAME.CF', path:"/environment/1/facturation/factures/simple/add"},  {label:'DATA_NAME.LFC', path:"/environment/1/facturation/factures/simple"},  {label:'DATA_NAME.CA', path:"/environment/1/facturation/factures/avoir/add"},  {label:'DATA_NAME.LA', path:"/environment/1/facturation/factures/avoir"}, {label:'DATA_NAME.CAC', path:"/environment/1/facturation/factures/acompte/add"},  {label:'DATA_NAME.LAC', path:"/environment/1/facturation/factures/acompte"} ], verticalSpacing: 1},
  { path: 'AC', label: 'DATA_NAME.ACH', isActive: false, hasHoverMenu : false, hoverMenuItem: [ {label:'DATA_NAME.IF', path:""}, {label:'DATA_NAME.SF', path:""}, {label:'DATA_NAME.CFF', path:""}, {label:'DATA_NAME.LFF', path:""}, {label:'DATA_NAME.CAF', path:""} , {label:'DATA_NAME.LAF', path:""}, {label:'DATA_NAME.CBC', path:""}, {label:'DATA_NAME.LBC', path:""}, {label:'DATA_NAME.CBL', path:""}, {label:'DATA_NAME.LBL', path:""}, {label:'DATA_NAME.DLD', path:""}, {label:'DATA_NAME.CBC', path:""}, {label:'DATA_NAME.CBC', path:""}], verticalSpacing: 47.7 },
  { path: 'BQ', label: 'DATA_NAME.BQ', isActive: false, hasHoverMenu : false, hoverMenuItem: [{label:'DATA_NAME.AR', path:""}, {label:'DATA_NAME.LR', path:""}, {label:'DATA_NAME.LRB', path:""}], verticalSpacing: 8 },
  { path: 'CTG', label: 'DATA_NAME.CTG', isActive: false, hasHoverMenu : false, hoverMenuItem: [{label:'DATA_NAME.APR', path:""}, {label:'DATA_NAME.LPRS', path:""}, {label:'DATA_NAME.LDT', path:""}, {label:'DATA_NAME.ASV', path:""}, {label:'DATA_NAME.LSV', path:""}, {label:'DATA_NAME.LPM', path:""}, {label:'DATA_NAME.CPM', path:""}, {label:'DATA_NAME.CCP', path:""}, {label:'DATA_NAME.DC', path:""}, {label:'DATA_NAME.SC', path:""}, {label:'DATA_NAME.CTR', path:""}], verticalSpacing: 0.5 },
  { path: 'TR', label: 'DATA_NAME.TR', isActive: false, verticalSpacing: 42.2 },
  { path: 'CP', label: 'DATA_NAME.CP', isActive: false, hasHoverMenu : false, hoverMenuItem: [{label:'DATA_NAME.JRV', path:""}, {label:'DATA_NAME.JRA', path:""}, {label:'DATA_NAME.JRT', path:""}, {label:'DATA_NAME.JRO', path:""}, {label:'DATA_NAME.BC', path:""}, {label:'DATA_NAME.BF', path:""}, {label:'DATA_NAME.TVA', path:""}, {label:'DATA_NAME.CPT', path:""}, {label:'DATA_NAME.CE', path:""}, {label:'DATA_NAME.CFP', path:""}, {label:'DATA_NAME.PC', path:""}], verticalSpacing: 38 },
  { path: 'AB', label: 'DATA_NAME.AB', isActive: false, hasHoverMenu : false, hoverMenuItem: [{label:'DATA_NAME.CAB', path:""}, {label:'DATA_NAME.LAB', path:""}, {label:'DATA_NAME.LOC', path:""}], verticalSpacing: 49.8 },
  { path: 'ED', label: 'DATA_NAME.ED', isActive: false, hasHoverMenu : false, hoverMenuItem: [{label:'DATA_NAME.NMR', path:""}, {label:'DATA_NAME.LMR', path:""}, {label:'DATA_NAME.NDR', path:""}, {label:'DATA_NAME.lDR', path:""} ] },
  { path: 'RP', label: 'DATA_NAME.RP', isActive: false },
  { path: 'FCH', label: 'DATA_NAME.FCH', isActive: false },
  { path: 'ST', label: 'DATA_NAME.ST', isActive: false, hasHoverMenu : false, hoverMenuItem: [{label:'DATA_NAME.SH', path:""}, {label:'DATA_NAME.SR', path:""}, {label:'DATA_NAME.LEN', path:""}, {label:'DATA_NAME.T', path:""}]  },
];

    getLinkIsActive(link: Link, letter: string) {
      return this.links.filter(l => l.path === letter)[0].isActive && link.path === letter;
    }

  navigateTopath(path: string, letter: string, buttonIndex: number) {
    this.links.forEach((l) => (l.isActive = false));
    this.links.filter(l => l.path === letter)[0].isActive = true;

    // this.isButtonClicked = true;
    this.lastClickedButtonIndex = this.isButtonClicked;
  this.isButtonClicked = buttonIndex;

    if (path === 'TDB') {
      // this.router.navigate([this.navigate.environmentListPath]);
      this.router.navigate([this.navigate.dashboardPath]);
      // this.isButtonClicked = buttonIndex;
    } else if (path === 'CT') {
      // this.router.navigate([this.navigate.environmentPath, 'facturation', 'clients']);

    } else if (path === 'OP') {
      this.router.navigate([this.navigate]);
    } else if (path === 'F') {
      // this.router.navigate([this.navigate.environmentPath + '/facturation']);
    } else if (path =='AC'){
      this.router.navigate([this.navigate]);
    } else if (path == 'BQ'){
      this.router.navigate([this.navigate]);
    } else if (path == 'CTG'){
      this.router.navigate([this.navigate]);
    } else if (path == 'TR'){
      this.router.navigate([this.navigate]);
    } else if(path == 'CP'){
      this.router.navigate([this.navigate]);
    } else if (path == 'AB'){
      this.router.navigate([this.navigate]);
    } else if (path == 'ED'){
      this.router.navigate([this.navigate]);
    }
    else if ( path == 'RP'){
      this.router.navigate([this.navigate]);
    } else if ( path == 'FCH'){
      this.router.navigate([this.navigate]);
    } else if (path == 'ST'){
      this.router.navigate([this.navigate]);
    }
  }

  getSvgIconName(letter: string): string{

      switch (letter) {
        case 'TDB':
          return 'dashboard';

        case 'CT':
          return 'par';

        case 'F':
          return 'facturation';

        case 'OP':
          return 'opportunites';

        case 'AC':
          return 'achats';

        case 'BQ':
          return 'banque';

        case 'CTG':
          return 'catalog';

        case 'TR':
          return 'tresorerie';

        case 'CP':
          return 'comptabilite';

        case 'AB':
          return 'abonnements';

        case 'ED':
          return 'editeur';


        case 'RP':
          return 'rapports';

        case 'FCH':
          return 'fichiers';

        case 'ST':
          return 'time';

        default:
          return 'add';

    }
  }

  // setupDropdownPositions(): void {
  //   this.links.forEach((link, index) => {
  //     const initialTop = 138 + index * (link.verticalSpacing || 50);



  //     window.addEventListener('mouseover' && 'scroll'  , () => {
  //       const dropdownContent = document.querySelectorAll('.dropdown-content')[index] as HTMLElement;
  //       if (!dropdownContent) {
  //         return;
  //       }

  //       const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  //       const newTop = initialTop - scrollTop;

  //       dropdownContent.style.top = newTop + 'px';
  //     });
  //   });
  // }

  // setupDropdownPositions(): void {
  //   this.links.forEach((link, index) => {
  //     const initialTop = 138 + index * (link.verticalSpacing || 50);

  //     window.addEventListener('mouseover', handleDropdownPosition);
  //     window.addEventListener('scroll', handleDropdownPosition);

  //     function handleDropdownPosition() {
  //       const dropdownContent = document.querySelectorAll('.dropdown-content')[index] as HTMLElement;
  //       if (!dropdownContent) {
  //         return;
  //       }

  //       const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  //       const newTop = initialTop - scrollTop;

  //       dropdownContent.style.top = newTop + 'px';
  //     }
  //   });
  // }
  setupDropdownPositions(): void {
    this.links.forEach((link, index) => {
      const initialTop = 138 + index * (link.verticalSpacing || 50);

      document.addEventListener('mouseover' && 'scroll', handleDropdownPosition, true);

      function handleDropdownPosition() {
        const dropdownContent = document.querySelectorAll('.dropdown-content')[index] as HTMLElement;
        if (!dropdownContent) {
          return;
        }

        const rect = dropdownContent.getBoundingClientRect();
        const newTop = initialTop - rect.top;

        dropdownContent.style.top = newTop + 'px';
      }
    });
  }




  showMenu(index: number, event: MouseEvent) {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const dropdownLeftOffset = rect.left;
    const dropdownTopOffset = rect.top ;
    document.documentElement.style.setProperty('--dropdown-left-offset', `${dropdownLeftOffset}px`);
    document.documentElement.style.setProperty('--dropdown-top-offset', `${dropdownTopOffset}px`);

    const currentDropbtn = document.getElementById(`dropbtn-${index}`);
    if (currentDropbtn) {
      currentDropbtn.style.backgroundColor = '#dbdbdb';
      currentDropbtn.style.width = '200px';
      currentDropbtn.style.borderRadius = '0.375rem';
    }

    // this.activeIndex = index;
    this.lastClickedButtonIndex = index;
    this.menuVisible[index] = true
  }


  hideMenu(index: number) {
    const currentDropbtn = document.getElementById(`dropbtn-${index}`);
    if (currentDropbtn && !this.getLinkIsActive(this.links[index], this.letters[index]) ) {
      currentDropbtn.style.backgroundColor = 'transparent';
    }

    // this.activeIndex = -1;
    this.menuVisible[index] = false;
  }

  toggleBackground(index: number) {
    const currentDropbtn = document.getElementById(`dropbtn-${index}`);
    if (currentDropbtn) {

      if (this.getLinkIsActive(this.links[index], this.letters[index])) {
        // currentDropbtn.style.backgroundColor = 'black';
      }


      this.links.forEach((link, i) => {
        if (i != index) {
          const dropbtn = document.getElementById(`dropbtn-${i}`);
          if (dropbtn) {
            dropbtn.style.backgroundColor = 'transparent';
          }
        }
      });
    }
  }



  // toggleBackground(index: number) {
  //   const currentDropbtn = document.getElementById(`dropbtn-${index}`);
  //   if (currentDropbtn && this.getLinkIsActive(this.links[index], this.letters[index])) {
  //     currentDropbtn.style.backgroundColor = 'black';
  //   } else if (currentDropbtn && this.isButtonClicked != index) {
  //     currentDropbtn.style.backgroundColor = 'transparent';
  //   }
  // }


  // toggleBackground(index: number) {
  //   const currentDropbtn = document.getElementById(`dropbtn-${index}`);
  //   if (currentDropbtn  && this.getLinkIsActive(this.links[index], this.letters[index])) {
  //     currentDropbtn.style.backgroundColor= 'black';
  //   }
  // }

  toggleSidenav() {
    this.sidenav.toggle();
    this.isArrowIcon = !this.isArrowIcon;
    const toggleBtn = document.getElementById("toggleBtn");
    if (this.sidenav.opened) {
      toggleBtn!.style.marginLeft = '-14px';
      toggleBtn!.style.marginTop = '0px';
      // this.isSidenavOpen = this.sidenav.opened;
      this.isSidenavOpen = true;
      console.log(this.isSidenavOpen);

    } else {
      toggleBtn!.style.margin = '14px';
      toggleBtn!.style.marginTop = '0px';
      this.isSidenavOpen = false;
      console.log(this.isSidenavOpen);

    }
    this.sidenavOpenChange.emit(this.isSidenavOpen);
  }

}
