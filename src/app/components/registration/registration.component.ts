import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MustMatch } from '../../helpers/must-match';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  submitted = false;
  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private user: UserService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      role: ['', Validators.required ],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [ '', Validators.required ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.registerForm.controls; }

  submit() {
    this.submitted = true;
    const formData = {
      data: {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        middleName: this.registerForm.value.middleName,
        role: this.registerForm.value.role
      }
    };
    this.user.register(formData)
      .subscribe((data) => {
        this.router.navigate(['/login']);
      }, (error) => { console.log(error); });
  }

  ngOnInit() {
  }

}
