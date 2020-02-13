import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpHeaders } from '@angular/common/http';



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
  serologyTitle: string;
  serologies: any[] = [];

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

  serologyParams = [
    {
      concentation: '0,00-0,34',
      contentRating: 'IgE відсутні або важко виявляються',
      selectedRating: false,
      eastClass: 0,
      title: '',
      userId: ''
    },
    {
      concentation: '0,35-0,69',
      contentRating: 'Нижній поріг',
      selectedRating: false,
      eastClass: 1,
      title: '',
      userId: ''
    },
    {
      concentation: '0,70-3,49',
      contentRating: 'Дещо підвищений',
      selectedRating: false,
      eastClass: 2,
      title: '',
      userId: ''
    },
    {
      concentation: '3,50-17,49',
      contentRating: 'Значно підвищений',
      selectedRating: false,
      eastClass: 3,
      title: '',
      userId: ''
    },
    {
      concentation: '17,50-49,99',
      contentRating: 'Високий',
      selectedRating: false,
      eastClass: 4,
      title: '',
      userId: ''
    },
    {
      concentation: '50,00-99,99',
      contentRating: 'Дуже високий',
      selectedRating: false,
      eastClass: 5,
      title: '',
      userId: ''
    },
    {
      concentation: '≥100,00',
      contentRating: 'Надзвичайно високий',
      selectedRating: false,
      eastClass: 6,
      title: '',
      userId: ''
    }
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    // console.log(this.userService.getToken());
    // const headers = new HttpHeaders({'Authorization':  `Bearer ${this.userService.authToken}`});

    // console.log(headers);
    this.patient = this.userService.getPatient();
    this.doctor = this.userService.getDoctor();
    if (this.patient.serologicalResults.length) {
      this.patient.serologicalResults.forEach(elem => {
        if (elem.selectedRating) {
          console.log();
          this.serologies.push(elem);
        } else {
          console.log(elem);
        }
      });
    }
    if (!this.patient.anamnes) {
      this.patient.anamnes = [];
    }
    if (!this.patient.user.hypersensitivityLz) {
      this.patient.user.hypersensitivityLz = false;
    }
    this.patientDetailsForm = this.fb.group({
      height: [this.patient.user.height],
      weight: [this.patient.user.weight],
      pregnancyNumber: [this.patient.user.pregnancyNumber],
      gestationPeriod: [this.patient.user.gestationPeriod]
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
        motherId: this.patient.user.id,
        firstName: child.firstName,
        lastName: child.lastName,
        middleName: child.middleName,
        birthDate: new Date(child.dateOfBirth.year, (+child.dateOfBirth.month) - 1, child.dateOfBirth.day),
        role: 4
      }
    };

    this.userService.addChild(patientData, this.patient.user.id)
      .subscribe((data: any) => this.patient.children.push(data.item.user));
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
      .subscribe((data: any) => this.patient.anamnes.push(data.item));
  }

  setChild(id) {
    this.userService.getPatientById(id)
    .subscribe((data: any) => {
      this.userService.setChild(data.item);
      this.router.navigate(['child-info']);
    });
  }

  onGetPatientInfo(patientId) {
    this.userService.getPatientById(patientId)
      .subscribe((data: any) => {
        this.userService.setPatient(data.item);
        this.router.navigate(['patient-details']);
      });
  }

  onLogOut() {
    this.userService.setToken(null);
    this.router.navigate(['/login']);
  }

  checkSerologyValue(event, item) {
    // this.patient.serologicalResults = [];
    // if (event.target.checked) {
    //   this.serologyParams.forEach((elem, index) => {
    //     if (index === id) {
    //       elem.selectedRating = true;
    //     } else {
    //       elem.selectedRating = false;
    //     }
    //     elem = { ...elem, title: this.serologyTitle, userId: this.patient.user.id };
    //     console.log(elem);
    //     this.patient.serologicalResults.push(elem);
    //   });
    // } else if (!event.target.checked) {
    //   this.serologyParams.forEach(elem => {
    //     elem.selectedRating = false;
    //     elem = { ...elem, title: this.serologyTitle, userId: this.patient.user.id };
    //     console.log(elem);
    //     this.patient.serologicalResults.push(elem);
    //   });
    // }

    // if (event.target.checked) {
    //   this.serologyParams.forEach((elem, index) => {
    //     this.
    //   });
    // }

    // if (event.target.checked) {
    //   console.log(item);
    // }


    this.userService.changeSerologicalResult(4)
     .subscribe(data => console.log(data));
  }

  onSaveSerologicalResults() {
    const serologicalData = {
      data: {
        title: this.serologyTitle,
        userId: this.patient.user.id
      }
    };

    // this.userService.saveSerologicalResult(serologicalData)
    //   .subscribe(data => console.log(data));
  }

}
