import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  patients: any[];

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
    this.addHinekologyPatientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });
    this.addFamilyPatientForm = this.fb.group({
      personalKey: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSearch(event) {
    this.patients = this.patientList.filter((el: any) => {
      return el.lastName.toLowerCase().indexOf(event.target.value) >= 0;
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
        birthDate: new Date(patient.dateOfBirth.year, (+patient.dateOfBirth.month) - 1, patient.dateOfBirth.day),
        role: 3,
        doctorId: this.doctor.id
      }
    };

    this.userService.register(patientData)
      .subscribe((data: any) => {
        // this.patientList.push(data.item);
        this.patients.push(data.item);
      });
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
      .subscribe((data: any) => {
        // this.patientList.push(data.item.user);
        this.patients.push(data.item.user);
      });
  }

  onGetPatientInfo(patientId) {
    this.userService.getPatientById(patientId)
      .subscribe((data: any) => {
        if (data.item.user.role === 'Kid') {
          this.userService.setChild(data.item);
          this.userService.getPatientById(data.item.user.motherId)
            .subscribe((result: any) => {
              this.userService.setPatient(result.item);
              this.router.navigate(['child-info']);
            });
        } else {
          this.userService.setPatient(data.item);
          this.router.navigate(['patient-details']);
        }
      });
  }

  onGetPatientList() {
    this.userService.getPatientList(this.doctor.id)
      .subscribe((data: any) => {
        this.patientList = data.items;
        this.patients = data.items;
      });
  }

  onDeletePatient(id, index) {
    const result = confirm('Ви справді хочете видалити пацієнта?');
    if (result) {
      this.patientList.splice(index, 1);
      this.patients.splice(index, 1);
      this.userService.deletePatient(id)
        .subscribe();
    }
  }

  onLogOut() {
    this.userService.setToken(null);
    this.router.navigate(['/login']);
  }
}

