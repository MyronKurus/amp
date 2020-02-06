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
    // this.myForm = new FormGroup({
    //   'role': new FormControl('', [ Validators.required ]),
    //   'lastName': new FormControl('', [ Validators.required ]),
    //   'firstName': new FormControl('', [ Validators.required ]),
    //   'middleName': new FormControl('', [ Validators.required ]),
    //   'email': new FormControl('', [ Validators.required, Validators.email ]),
    //   'password': new FormControl('', [ Validators.required, Validators.minLength(6)]),
    //   'confirmPassword': new FormControl('', [ Validators.required ])
    // });

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
    // console.log(this.myForm.value);

    // const formData = {
    //   email: this.myForm.value.email,
    //   password: this.myForm.value.password,
    //   firstName: this.myForm.value.firstName,
    //   lastName: this.myForm.value.lastName,
    //   middleName: this.myForm.value.middleName,
    //   birthDate: '2020-02-01T15:47:08.131Z',
    //   role: this.myForm.value.role,
    //   doctorId: 112
    // };

    // console.log(formData);

    const formData = {
      data: {
        email: 'user5@mail.com',
        password: '12345qA!',
        firstName: 'Jane',
        lastName: 'Smith',
        middleName: 'John',
        birthDate: '2020-02-01T15:47:08.131Z',
        role: this.registerForm.value.role,
        doctorId: 1078
      }
    };

    console.log(this.registerForm.value);



    // this.user.register(formData)
    //   .subscribe((data) => {
    //     console.log(data);
    //     this.router.navigate(['/login']);
    //   }, (error) => { console.log(error); });
  }

  ngOnInit() {
  }

}
