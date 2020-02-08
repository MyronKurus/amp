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
  patientList: any[];
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
    this.doctor = this.userService.getDoctor();
    if (this.doctor.role === 'Gynecologist') {
      this.onGetPatientList();
    }
    this.addPatientForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      middleName: [''],
      dateOfBirth: ['']
    });
  }

  openModal(targetModal, user) {
    this.addPatientForm.reset();

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

    this.userService.registerPatient(patientData)
      .subscribe((data: any) => this.patientList.push(data.item));

  }

  onGetUserList() {
    this.userService.getUserList()
      .subscribe(res => {
        console.log(res);
      });
  }

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
      .subscribe((data: any) => { this.patientList = data.items; });
  }

  onDeletePatient() {
    this.userService.deletePatient(15)
      .subscribe(data => console.log(data));
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

  onGetFamilyPatients() {
    this.userService.getPatientList(12)
      .subscribe(data => console.log(data));
  }
}

