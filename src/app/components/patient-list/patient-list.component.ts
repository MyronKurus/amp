import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  doctor: any;
  patientList: any[];
  addHinekologyPatientForm: FormGroup;
  addFamilyPatientForm: FormGroup;

  user = {
    id: '',
    firstname: '',
    lastname: '',
    middleName: '',
    dateOfBirth: ''
  };

  familyUser = {
    personalKey: '',
    password: ''
  };

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.doctor = this.userService.getDoctor();
    this.onGetPatientList();
    this.userService.getAllUsersList()
      .subscribe(data => console.log(data));
    this.addHinekologyPatientForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      middleName: [''],
      dateOfBirth: ['']
    });
    this.addFamilyPatientForm = this.fb.group({
      personalKey: [''],
      password: ['']
    });
  }

  openHinecologyModal(targetModal, user) {
    this.addHinekologyPatientForm.reset();

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.addHinekologyPatientForm.patchValue({
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      dateOfBirth: user.dateOfBirth
    });
  }

  onHinecologySubmit() {
    this.modalService.dismissAll();
    const patient = {...this.addHinekologyPatientForm.getRawValue()};
    const patientData = {
      data: {
        email: '123@mail.com',
        password: '12345!Qa',
        firstName: patient.firstName,
        lastName: patient.lastName,
        middleName: patient.middleName,
        birthDate: '1998-02-06T18:07:51.857Z',
        role: 3,
        doctorId: 11
      }
    };

    this.userService.register(patientData)
      .subscribe((data: any) => this.patientList.push(data.item));
  }

  openFamilyModal(targetModal, familyUser) {
    this.addFamilyPatientForm.reset();

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.addFamilyPatientForm.patchValue({
      personalKey: familyUser.personalKey,
      password: familyUser.password
    });
  }

  onFamilySubmit() {
    this.modalService.dismissAll();
    const patientData = {
      data: {...this.addFamilyPatientForm.getRawValue()}
    };

    this.userService.addPatientFamilyDoc(this.doctor.id, patientData)
      .subscribe((data: any) => this.patientList.push(data.item.user));
  }

  onGetPatientInfo(patientId) {
    this.userService.getPatientById(patientId)
      .subscribe((data: any) => {
        this.userService.setPatient(data.item);
        this.router.navigate(['patient-details']);
      });
  }


  // onGetUserList() {
  //   this.userService.getAllUsersList()
  //     .subscribe(res => {
  //       console.log(res);
  //     });
  // }

  // onSavePatient() {
  //   const formData = {
  //     data: {
  //       firstName: 'Наталія',
  //       lastName: 'Ткачук',
  //       height: 0,
  //       weight: 0,
  //       pregnancyNumber: 0,
  //       gestationPeriod: 0,
  //       hypersensitivityLz: true,
  //       doctorId: 11
  //     }
  //   };
  //   this.userService.editPatient(12, formData)
  //     .subscribe(res => {
  //       console.log(res);
  //     });
  // }

  // onGetUserById() {
  //   this.userService.getUserById(5)
  //     .subscribe(res => console.log(res));
  // }
  onGetPatientList() {
    this.userService.getPatientList(this.doctor.id)
      .subscribe((data: any) => this.patientList = data.items);
  }

  onDeletePatient(id, index) {
    // if (this.doctor.role === 'Gynecologist') {
    //   this.patientList.splice(index, 1);
    //   this.userService.deletePatient(id)
    //     .subscribe(data => console.log(data));
    // }
  }

  onAddFamilyDoc() {
    const patient = {
      data: {
        personalKey: 'VABrAGEAYwBoAHUAawAuAEkAdgBhAG4AbgBhAA==',
        password: 'UYsxft989!'
      }
    };
    this.userService.addPatientFamilyDoc(12, patient)
      .subscribe(data => console.log(data));
  }

  // onGetFamilyPatients() {
  //   this.userService.getPatientList(12)
  //     .subscribe(data => console.log(data));
  // }
}

