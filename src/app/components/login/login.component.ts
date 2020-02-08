import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  constructor(private userService: UserService, private router: Router) {
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

    this.userService.login(formData)
      .pipe(tap((data: any) => {
        this.userService.setToken(data.item.token); }),
        switchMap(() => this.userService.getUserMe()))
        .subscribe(() => {
          this.router.navigate(['patient-list']);
        }, (error) => { console.log(error); });
  }

  ngOnInit() {
  }

}
