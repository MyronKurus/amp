import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {

  doctor: any;
  patient: any;
  patientDetailsForm: FormGroup;
  editMode = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

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
  }

  onEditModeToggle() {
    this.editMode = !this.editMode;
  }

  onPatientDetailsSubmit() {
    this.patient.user = {...this.patient.user, ...this.patientDetailsForm.getRawValue()};
    // this.patient.user = {...this.patientDetailsForm.getRawValue()};
    this.editMode = false;
    const userData = {
      data: {
        ...this.patient.user
      }
    };
    // console.log(this.patient.user);
    // // const userData = {
    // //   data: {}
    // // }
    this.userService.editPatient(this.patient.user.id, userData)
      .subscribe(res => {
        console.log(res);
      });
  }

  onDeletePatient() {
    this.router.navigate(['patient-list']);
    // this.userService.deletePatient(this.patient.user.id)
    //   .subscribe(data => {
    //     console.log(data);
    //     this.router.navigate(['patient-list']);
    //   });
  }

}
