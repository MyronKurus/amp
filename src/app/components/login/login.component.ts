import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  constructor(private user: UserService, private router: Router) {
    this.myForm = new FormGroup({
      'userEmail': new FormControl('', [ Validators.required, Validators.email ]),
      'userPassword': new FormControl('', [ Validators.required ])
    });
  }

  submit() {
    const formData = {
      data: {
        'email': this.myForm.value.userEmail,
        'password': this.myForm.value.userPassword
      }
    };

    /**
      email: 'user@mail.com',
      password: '12345qA!',
      firstName: 'Jane',
      lastName: 'Smith',
      middleName: 'John',
     */

    this.user.login(formData)
      .subscribe((data: any) => {
        console.log(data.item.token);
        this.user.setToken(data.item.token);
        this.router.navigate(['patient-list']);
      }, (error) => { console.log(error); });
  }

  ngOnInit() {
  }

}
