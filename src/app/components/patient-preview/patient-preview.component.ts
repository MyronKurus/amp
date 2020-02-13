import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-preview',
  templateUrl: './patient-preview.component.html',
  styleUrls: ['./patient-preview.component.scss']
})
export class PatientPreviewComponent implements OnInit {

  patient: any;

  constructor(private userServise: UserService, private router: Router) { }

  ngOnInit() {
    this.patient = this.userServise.getPatient();
  }

  onLogOut() {
    this.userServise.setToken(null);
    this.router.navigate(['/login']);
  }

}
