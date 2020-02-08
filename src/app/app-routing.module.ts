import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';
import { ChildInfoComponent } from './components/child-info/child-info.component';
import { AuthGuard } from './services/auth-guard.service';
import { PatientLoginComponent } from './components/patient-login/patient-login.component';
import { PatientPreviewComponent } from './components/patient-preview/patient-preview.component';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent  },
  { path: 'patient-login', component: PatientLoginComponent  },
  { path: 'registration', component: RegistrationComponent  },
  { path: 'patient-list', component: PatientListComponent, canActivate: [AuthGuard] },
  { path: 'patient-details', component: PatientDetailsComponent, canActivate: [AuthGuard] },
  { path: 'patient-preview', component: PatientPreviewComponent },
  { path: 'child-info', component: ChildInfoComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
