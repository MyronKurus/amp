import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MustMatch } from '../../helpers/must-match';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  submitted = false;
  registerForm: FormGroup;
  error = false;
  errors: any[];

  constructor(private formBuilder: FormBuilder, private user: UserService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      role: ['', Validators.required ],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [ '', Validators.required ],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}')]],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    });
  }
  // regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/'

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
    .pipe(tap((data: any) => {
      this.user.setToken(data.item.token); }),
      switchMap(() => this.user.getUserMe()))
      .subscribe(() => {
        this.router.navigate(['patient-list']);
      }, (err) => {
        this.error = true;
        this.errors = err.error.errors;
       });
  }

  ngOnInit() {
  }

}
