
import { DepartementService } from './../../../http/departement.service';
import { Departement } from './../../../models/departement';
import { Component, ViewChild, OnInit, TemplateRef } from '@angular/core';
import { FilterService } from 'src/app/shared/services/filter.service';
import { firstValueFrom, Subject, Subscriber, Subscription } from 'rxjs';
import { Card } from 'src/app/shared/models/card';
import type {ModalTypes, Optional, Modes} from './types'


import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit{

  cards : Card[] = []
  departements :Array<Departement> = [];
  selected: Optional<Departement> = undefined;
  isEmpty : boolean = false;


  currentDepartement: Departement = new Departement();
  currentIndex = -1;
  data :string = '';
  page :number = 1;
  count :number = 0;
  pageSize :number = 8;

  selectSubject = new Subject<{mode: Modes, id: number}>();
  subscriber: Subscription;

  mode: Modes ='add';
  dropMenu: boolean=false;
  closeResult: string;

  deptForm: FormGroup;
  id: number;
  nom: string;
  description: string;
  designation: string;
  departement = new Departement();

  isModalVisible = false;
  selectedModalTemplate: TemplateRef<any>;
  selectedCardId: number;

  @ViewChild('showContent') showContent: TemplateRef<any>;
  @ViewChild('deleteContent') deleteContent: TemplateRef<any>;
  @ViewChild('editContent') editContent: TemplateRef<any>;




  constructor(
    private filterService : FilterService,
    private departementService:DepartementService,
    public dialog: MatDialog,
    public dialogConfig :MatDialogConfig,
    private router: Router,
    protected route: NavigateService ,
    private modalService: NgbModal,
    private formBuilder: FormBuilder)
  {
    this.filterService.methodSearchCalled$.subscribe(
      (data) => {
        this.data = data
        this.searchData()
      }
    );  }

  searchData(): void {
      this.page = 1;
      this.setAllDepts();
  }

  async ngOnInit() {

    this.iniatForm()
    await this.setAllDepts();
      this.setCards()
      if(this.departements.length == 0) this.isEmpty = true


     this.subscriber = this.selectSubject.subscribe(({id, mode}) => {
        this.selected = this.departements.find(d => d.id === id);
      this.mode = mode;
      })


  }

  iniatForm() {

    this.deptForm = this.formBuilder.group({
    nom: [this.departement.nom, Validators.required],
    designation: [this.departement.designation, Validators.required],
    description: this.departement.description,
  });



}

  setCards() {

      this.departements.forEach(departement =>{
        var card : Card  = {} as Card
        card.id = departement.id.toString()
        card.mainIcon= 'societes'
        card.primaryTitle1 = departement.nom
        card.secondaryTitle = '#'+departement.designation
        // card.secondaryData = []
        // card.secondaryData.push({icon : 'par',data : 'Chef Mohamed'})
        this.cards.push(card)
      })
  }
  async setAllDepts() {
  const params = this.getRequestParams(this.data, this.page, this.pageSize);
  await  firstValueFrom(this.departementService.getDepartementList(params))
      .then(res => {
        const { departements, totalItems } = res;
        this.departements = departements;
        this.count = totalItems;

      }
      )
      .catch(console.log)

  }
  getRequestParams(searchData: string, page: number, pageSize: number): any {
      let params: any = {};

      if (searchData) {
        params[`data`] = searchData;
      }

      if (page) {
        params[`page`] = page - 1;
      }

      if (pageSize) {
        params[`size`] = pageSize;
      }

      return params;
  }

  ngOnDestroy(): void {
      this.subscriber.unsubscribe();
  }

  pageChange(page: number) {
      this.page = page;
      this.setAllDepts();
  }

   pageSizeChange(pageSize: number): void {
      this.pageSize = pageSize;
      this.page = 1;
      this.setAllDepts();
    }

  handleClose() {
      console.log('modal close event')
      this.setAllDepts()
      this.setCards()
      location.reload();
    }


  removeDept() {
    var id =this.selected!.id
    this.departementService.deleteDepartementById(id).subscribe(
      res=>{ this.gellAlldepts()
      }
    )
    location.reload()
    this.modalService.dismissAll()
  }

  gellAlldepts(){
    this.setAllDepts()
  }

  toggleDropMenu() {
      this.dropMenu = !this.dropMenu
  }

  closeMenu() {
      this.dropMenu = false
  }

  open(content: any) {
    this.modalService.open(content, {windowClass: 'my-modal',
    backdropClass: 'modal-backdrop'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit() {
    if (this.deptForm.valid) {
      this.getFormValues();
      console.log(this.mode,'submit')
      if (this.mode=='add') {

        this.createNewDept();
      }
    } else {
       console.log('Invalid Form');
    }
  }


  createNewDept() {
    console.log(this.departement,'create');
    this.departementService.addDepartement(this.departement).subscribe({
      next: (data) => (this.departement = data),
      error: (e) => console.log(e),
      complete: () => {
        this.modalService.dismissAll();
        location.reload();
      },
    });
  }

  getFormValues() {
    this.departement.nom = this.deptForm.controls['nom'].value;
    this.departement.description = this.deptForm.controls['description'].value;
    this.departement.designation = this.deptForm.controls['designation'].value;
  }

  openDetails(showContent: any) {
    this.closeMenu()
    this.modalService.open(showContent, {windowClass: 'my-modal',
    backdropClass: 'modal-backdrop'});


  }

  openDelete(deleteContent:any){
    this.modalService.dismissAll()
    this.modalService.open(deleteContent, {windowClass: 'my-modal',
    backdropClass: 'modal-backdrop'});

  }


  openEdit(editContent:any){
    this.modalService.dismissAll()
    this.dropMenu = false;
    this.getDepartmentById(this.selectedCardId);
    this.modalService.open(editContent, {windowClass: 'my-modal',
    backdropClass: 'modal-backdrop'});
    this.isModalVisible = true;
  }

  getDepartmentById(id: number) {
    this.departementService.getDepartementById(id).subscribe({
      next: (data) => {
        this.departement = data;
        this.deptForm.patchValue({
          nom: this.departement.nom,
          description: this.departement.description,
          designation: this.departement.designation,
        });
      },
      error: (e) => console.log(e),
    });
  }


  updateDept() {
    if (this.deptForm.valid) {
      this.getFormValues();
      this.departementService.updateDepartementById(this.selected!.id, this.departement)
        .subscribe({
          next: (data) => {
            this.modalService.dismissAll();
            location.reload();
          },
          error: (e) => console.log(e)
        });
    }
  }


  onCardClicked(event: {mode: Modes, id: number}) {
    // console.log(event.mode,event.id,'dept')
    this.selectedCardId = event.id;
    this.isModalVisible = true;
    switch (event.mode) {
      case 'show':
        this.openDetails(this.showContent)
        break;
        case 'edit':

          this.openEdit(this.editContent);
          break;
      case 'delete':
        this.openDelete(this.deleteContent)
        break;
      default:
        this.selectedModalTemplate = this.showContent;
        break;
    }
  }


  onCloseModal(): void {
    this.isModalVisible = false;
  }
}
