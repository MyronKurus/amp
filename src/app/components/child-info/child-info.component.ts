import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-child-info',
  templateUrl: './child-info.component.html',
  styleUrls: ['./child-info.component.scss']
})
export class ChildInfoComponent implements OnInit {

  child: any;
  patient: any;
  editMode = false;
  childrenForm: FormGroup;
  addMedicineForm: FormGroup;
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

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.child = this.userService.getChild();
    this.patient = this.userService.getPatient();

    this.childrenForm = this.fb.group({
      height: [''],
      weight: [''],
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
  }

  onEditModeToggle() {
    this.editMode = !this.editMode;
  }

  onPatientDetailsSubmit() {
    this.editMode = false;
    const childData = {
      data: {
        ...this.childrenForm.getRawValue(),
        firstname: this.child.user.firstname,
        lastname: this.child.user.lastname,
      }
    };

    console.log(this.childrenForm.getRawValue());

    this.userService.editPatient(this.child.id, childData)
      .subscribe(res => console.log(res));
  }

  onDeletePatient() {
    this.userService.deletePatient(this.patient.user.id)
      .subscribe(() => this.router.navigate(['patient-list']));
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
        userId: this.child.user.id,
        date: new Date(params.date.year, (+params.date.month) - 1, params.date.day),
      }
    };

    this.userService.addAssignedMedication(medication)
      .subscribe((data: any) => this.child.medicines.push(data.item));
  }

  onLogOut() {
    this.userService.setToken(null);
    this.router.navigate(['/login']);
  }

}
