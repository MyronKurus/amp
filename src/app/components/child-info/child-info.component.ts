import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

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

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.child = this.userService.getChild();
    this.patient = this.userService.getPatient();

    this.childrenForm = this.fb.group({
      height: [''],
      weight: [''],
    });
  }

  onEditModeToggle() {
    this.editMode = !this.editMode;
  }

  onPatientDetailsSubmit() {
    this.child = {...this.child, ...this.childrenForm.getRawValue()};
    this.editMode = false;
    const childData = { data: {...this.child} };
    // this.patient.children.array.forEach(element => {
    //   if (element.firstName === this.child.firstname) {
    //     console.log('bingo');
    //   }
    // });
    this.userService.editPatient(this.child.id, childData)
      .subscribe(res => console.log(res));
  }

  onDeletePatient() {
    this.userService.deletePatient(this.patient.user.id)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['patient-list']);
      });
  }

  onLogOut() {
    this.userService.setToken(null);
    this.router.navigate(['/login']);
  }

}
