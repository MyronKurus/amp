import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {

  public authToken: string;
  private doctor: any;
  private patient: any;
  private child: any;

  constructor(private http: HttpClient) { }

  public getToken() {
    return this.authToken;
  }

  public setToken(token: string) {
    this.authToken = token;
  }

  public getDoctor() {
    return this.doctor;
  }

  public setPatient(patient: any) {
    this.patient = patient;
  }

  public getPatient() {
    return this.patient;
  }

  public setChild(child: any) {
    this.child = child;
  }

  public getChild() {
    return this.child;
  }

  public isAuthenticated() {
    return this.authToken != null;
  }

  public getContentTypeHeaders() {
    return new HttpHeaders({'Content-Type':  'application/json-patch+json'});
  }

  public getAuthHeaders() {
    return new HttpHeaders({'Authorization':  `Bearer ${this.getToken()}`});
  }

  public register(data) {
    const headers = this.getContentTypeHeaders();
    return this.http.post(`${environment.appUrl}/User/register`, data, {headers});
  }

  public login(data) {
    const headers = this.getContentTypeHeaders();
    return this.http.post(`${environment.appUrl}/User/login`, data, {headers});
  }

  public getUserMe() {
    const headers = this.getAuthHeaders();
    return this.http.get(`${environment.appUrl}/User/Me`, {headers})
      .pipe(tap((user: any) => this.doctor = user.item));
  }

  public getAllUsersList() {
    const headers = this.getAuthHeaders();
    return this.http.get(`${environment.appUrl}/User`, {headers});
  }

  public getPatientById(id) {
    const headers = this.getAuthHeaders();
    return this.http.get(`${environment.appUrl}/User/${id}`, {headers});
  }

  public editPatient(patientId, patient) {
    const headers = this.getAuthHeaders();
    return this.http.put(`${environment.appUrl}/User/${patientId}`, patient, {headers});
  }

  public deletePatient(doctorId) {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${environment.appUrl}/User/${doctorId}`, {headers});
  }

  public getPatientList(doctorId) {
    const headers = this.getAuthHeaders();
    return this.http.get(`${environment.appUrl}/User/${doctorId}/patient`, {headers});
  }

  public addPatientFamilyDoc(doctorId, patient) {
    const headers = this.getAuthHeaders();
    return this.http.put(`${environment.appUrl}/User/${doctorId}/patient`, patient, {headers});
  }

  public patientLogin(data) {
    const headers = this.getAuthHeaders();
    return this.http.post(`${environment.appUrl}/User/patient/login`, data, {headers});
  }

  public addChild(data, id) {
    const headers = this.getAuthHeaders();
    return this.http.post(`${environment.appUrl}/User/${id}/child`, data, {headers});
  }

  public addAssignedMedication(data) {
    const headers = this.getAuthHeaders();
    return this.http.post(`${environment.appUrl}/AssignedMedication`, data, {headers});
  }

  public addAssignedMedicationAnamnesis(data) {
    const headers = this.getAuthHeaders();
    return this.http.post(`${environment.appUrl}/AssignedMedication/anamnes`, data, {headers});
  }

  public saveSerologicalResult(data) {
    const headers = this.getAuthHeaders();
    return this.http.post(`${environment.appUrl}/SerologicalResult`, data, {headers});
  }

  public changeSerologicalResult(id) {
    const headers = {'Authorization':  `Bearer ${this.getToken()}`};
    return this.http.put(`${environment.appUrl}/SerologicalResult/${id}`, {headers});
  }
}
