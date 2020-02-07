import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  doctor: any;
  addPatientForm: FormGroup;

  user = {
    id: '',
    firstname: '',
    lastname: '',
    middleName: '',
    dateOfBirth: ''
  };

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.addPatientForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      middleName: [''],
      dateOfBirth: ['']
    });
    this.userService.getUserMe()
      .subscribe((res: any) => {
        this.doctor = { ...res.item };
        console.log(this.doctor);
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
    const patient = {...this.addPatientForm.getRawValue()};
    const patientData = {
      data: {
        email: 'patient2@mail.com',
        password: 'pAssw0rd!',
        firstName: patient.firstName,
        lastName: patient.lastName,
        middleName: patient.middleName,
        birthDate: '1998-02-06T18:07:51.857Z',
        doctorId: 11
      }
    };

    this.userService.register(patientData)
      .subscribe(data => console.log(data));

  }

  // onGetUserMe() {
  //   this.userService.getUserMe()
  //     .subscribe((res: any) => {
  //       // console.log(res);
  //       this.user = {...res.item};
  //       console.log(this.user);
  //     });
  // }

  onGetUserList() {
    this.userService.getUserList()
      .subscribe(res => {
        console.log(res);
      });
  }

  onSavePatient() {
    const formData = {
      data: {
        firstName: 'Наталія',
        lastName: 'Ткачук',
        height: 0,
        weight: 0,
        pregnancyNumber: 0,
        gestationPeriod: 0,
        hypersensitivityLz: true,
        doctorId: 11
      }
    };
    this.userService.editPatient(12, formData)
      .subscribe(res => {
        console.log(res);
      });
  }

  // onGetUserById() {
  //   this.userService.getUserById(5)
  //     .subscribe(res => console.log(res));
  // }
  onGetPatientList() {
    this.userService.getPatientList(11)
      .subscribe(data => console.log(data));
  }
}

