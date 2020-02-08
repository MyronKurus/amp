import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-patient-preview',
  templateUrl: './patient-preview.component.html',
  styleUrls: ['./patient-preview.component.scss']
})
export class PatientPreviewComponent implements OnInit {

  patient: any;

  constructor(private userServise: UserService) { }

  ngOnInit() {
    this.patient = this.userServise.getPatient();
    console.log(this.patient);
  }

}
