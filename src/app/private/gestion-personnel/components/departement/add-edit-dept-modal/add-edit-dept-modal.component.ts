import { Card } from 'src/app/shared/models/card';
import { ModalService } from './../../../../../shared/services/modal.service';
import { Departement } from './../../../../models/departement';
import { DepartementService } from './../../../../http/departement.service';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ModalTypes, Modes, Optional } from '../types';

@Component({
  selector: 'app-add-edit-dept-modal',
  templateUrl: './add-edit-dept-modal.component.html',
  styleUrls: ['./add-edit-dept-modal.component.scss'],
})
export class AddEditDeptModalComponent implements OnInit {
  deptForm: FormGroup;
  id: number;
  nom: string;
  description: string;
  designation: string;
  departement = new Departement();

  @Input() data: Optional<Departement> = undefined;

  @Input()
  isAddMode: boolean = true;

  @Input()
  for: 'list' | 'edit';

  @Input()
  typeM: ModalTypes;
  modalSubject: Subject<{id: number; mode: Modes}>;

  constructor(
    private formBuilder: FormBuilder,
    private deptService: DepartementService,
    private router: Router,
    protected route: NavigateService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.iniatForm();
  }

  iniatForm() {
    this.deptForm = this.formBuilder.group({
      nom: [this.departement.nom, Validators.required],
      designation: [this.departement.designation, Validators.required],
      description: this.departement.description,
    });
  }

  onSubmit() {
    if (this.deptForm.valid) {
      this.getFormValues();

      if (this.isAddMode) {
        this.typeM == 'addModal';
        this.createNewDept();
      } else {
        this.typeM == 'editModal';
        this.updateDept();
      }

      console.log(this.typeM);
      // } else {
      //   console.log('Invalid Form');
    }
  }

  updateDept() {
    this.deptService
      .updateDepartementById(this.departement.id, this.departement)
      .subscribe({
        next: (data) => (this.departement = data),
        error: (e) => console.log(e),
        complete: () => {
          this.closeModal('editModal');

          //   this.submitOtherForms();
        },
      });
  }
  createNewDept() {
    console.log(this.departement);
    this.deptService.addDepartement(this.departement).subscribe({
      next: (data) => (this.departement = data),
      error: (e) => console.log(e),
      complete: () => {
        this.closeModal('addModal');
        // console.log(this.departement)
      },
    });
  }
  getFormValues() {
    this.departement.nom = this.deptForm.controls['nom'].value;
    this.departement.description = this.deptForm.controls['description'].value;
    this.departement.designation = this.deptForm.controls['designation'].value;
  }

  closeModal(id: string) {
    this.modalService.close(id);
    // this.deptForm.reset()
    // this.departement = new Departement()
  }
}
