import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {

  doctor: any;
  patient: any;
  patientDetailsForm: FormGroup;
  childrenForm: FormGroup;
  editMode = false;
  child = {
    id: '',
    firstname: '',
    lastname: '',
    middleName: '',
    dateOfBirth: ''
  };

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.patient = this.userService.getPatient();
    console.log('patient', this.patient);
    this.doctor = this.userService.getDoctor();
    console.log('doctor', this.doctor);
    this.patientDetailsForm = this.fb.group({
      height: [''],
      weight: [''],
      pregnancyNumber: [''],
      gestationPeriod: ['']
    });
    this.childrenForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      middleName: [''],
      dateOfBirth: ['']
    });
  }

  onEditModeToggle() {
    this.editMode = !this.editMode;
  }

  onPatientDetailsSubmit() {
    this.patient.user = {...this.patient.user, ...this.patientDetailsForm.getRawValue()};
    this.editMode = false;
    const userData = { data: {...this.patient.user} };
    this.userService.editPatient(this.patient.user.id, userData)
      .subscribe(res => console.log(res));
  }

  onDeletePatient() {
    const result = confirm('Ви справді хочете видалити пацієнта?');
    if (result) {
      this.userService.deletePatient(this.patient.user.id)
        .subscribe(data => {
          console.log(data);
          this.router.navigate(['patient-list']);
        });
    }
  }

  openChildrenModal(targetModal, user) {
    this.childrenForm.reset();

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.childrenForm.patchValue({
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      dateOfBirth: user.dateOfBirth
    });
  }

  onAddChildSubmit() {
    this.modalService.dismissAll();
    const child = {...this.childrenForm.getRawValue()};
    const patientData = {
      data: {
        familyDoctorId: this.doctor.id,
        motherId: this.patient.user.id,
        firstName: child.firstName,
        lastName: child.lastName,
        middleName: child.middleName,
        birthDate: '2018-02-08T18:08:21.335Z'
      }
    };

    this.userService.addChild(patientData, this.patient.user.id)
      .subscribe((data: any) => this.patient.children.push(data.item));
  }

  setChild(index) {
    this.userService.setChild(this.patient.children[index]);
    this.router.navigate(['child-info']);
  }

}
