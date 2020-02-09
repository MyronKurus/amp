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
  addMedicineForm: FormGroup;
  addAnamnesisForm: FormGroup;
  editMode = false;

  child = {
    id: '',
    firstname: '',
    lastname: '',
    middleName: '',
    dateOfBirth: ''
  };

  medicine = {
    date: '',
    medicationName: '',
    internetialMedicationName: '',
    dose: '',
    inputMethod: '',
    periodOfUsing: '',
    indication: '',
    effects: ''
  };

  anamnesis = {
    medicationName: '',
    internetialMedicationName: '',
    dose: '',
    inputMethod: '',
    adverseReactions: '',
    periodsOfEffects: '',
    appliedActivities: ''
  };

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.patient = this.userService.getPatient();
    this.doctor = this.userService.getDoctor();
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

    this.addMedicineForm = this.fb.group({
      date: [''],
      medicationName: [''],
      internetialMedicationName: [''],
      dose: [''],
      inputMethod: [''],
      periodOfUsing: [''],
      indication: [''],
      effects: ['']
    });

    this.addAnamnesisForm = this.fb.group({
      medicationName: [''],
      internetialMedicationName: [''],
      dose: [''],
      inputMethod: [''],
      adverseReactions: [''],
      periodsOfEffects: [''],
      appliedActivities: ['']
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
      .subscribe();
  }

  onDeletePatient() {
    const result = confirm('Ви справді хочете видалити пацієнта?');
    if (result) {
      this.userService.deletePatient(this.patient.user.id)
        .subscribe(() => this.router.navigate(['patient-list']));
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

  openMedicineModal(targetModal, medicine) {
    this.childrenForm.reset();

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.addMedicineForm.patchValue({
      date: medicine.date,
      medicationName: medicine.medicationName,
      internetialMedicationName: medicine.internetialMedicationName,
      dose: medicine.dose,
      inputMethod: medicine.inputMethod,
      periodOfUsing: medicine.periodOfUsing,
      indication: medicine.indication,
      effects: medicine.effects
    });
  }

  onAddMedicineSubmit() {
    this.modalService.dismissAll();
    const params = this.addMedicineForm.getRawValue();
    const medication = {
      data: {
        medicationName: params.medicationName,
        internetialMedicationName: params.internetialMedicationName,
        dose: params.dose,
        inputMethod: params.inputMethod,
        periodOfUsing: params.periodOfUsing,
        indication: params.indication,
        effects: params.effects,
        userId: this.patient.user.id,
        date: new Date(params.date.year, (+params.date.month) - 1, params.date.day),
      }
    };

    this.userService.addAssignedMedication(medication)
      .subscribe((data: any) => this.patient.medicines.push(data.item));
  }

  openAnamnesisModal(targetModal, anamnesis) {
    this.childrenForm.reset();

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.addMedicineForm.patchValue({
      medicationName: anamnesis.medicationName,
      internetialMedicationName: anamnesis.internetialMedicationName,
      dose: anamnesis.dose,
      inputMethod: anamnesis.inputMethod,
      adverseReactions: anamnesis.adverseReactions,
      periodsOfEffects: anamnesis.periodsOfEffects,
      appliedActivities: anamnesis.appliedActivities
    });
  }

  onAnamnesisSubmit() {
    this.modalService.dismissAll();
    const medication = {
      data: {
        ...this.addAnamnesisForm.getRawValue(),
        userId: this.patient.user.id
      }
    };

    this.userService.addAssignedMedicationAnamnesis(medication)
      .subscribe((data: any) => console.log(data));
  }

  setChild(index) {
    this.userService.setChild(this.patient.children[index]);
    this.router.navigate(['child-info']);
  }

  onLogOut() {
    this.userService.setToken(null);
    this.router.navigate(['/login']);
  }

}
