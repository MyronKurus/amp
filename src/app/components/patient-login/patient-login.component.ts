import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrls: ['./patient-login.component.scss']
})
export class PatientLoginComponent implements OnInit {

  myForm: FormGroup;
  constructor(private userService: UserService, private router: Router) {
    this.myForm = new FormGroup({
      'userEmail': new FormControl('', [ Validators.required]),
      'userPassword': new FormControl('', [ Validators.required ])
    });
  }

  submit() {
    const formData = {
      data: {
        'personalKey': this.myForm.value.userEmail,
        'password': this.myForm.value.userPassword
      }
    };

    this.userService.patientLogin(formData)
      .subscribe((data: any) => {
        this.userService.setPatient(data.item);
        this.router.navigate(['/patient-preview']);
      });
  }

  ngOnInit() {
  }

}
