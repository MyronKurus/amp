import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  addPatientForm: FormGroup;
  user = {
   id: '',
   firstname: '',
   lastname: '',
   middleName: '',
   dateOfBirth: ''
  };
  constructor(private fb: FormBuilder, private modalService: NgbModal) {}
  ngOnInit() {
   this.addPatientForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    middleName: [''],
    dateOfBirth: ['']
   });
  }
  openModal(targetModal, user) {
   this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static'
   });
   this.addPatientForm.patchValue({
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    dateOfBirth: user.dateOfBirth
   });
  }
  onSubmit() {
   this.modalService.dismissAll();
   console.log('res:', this.addPatientForm.getRawValue());
  }
}

