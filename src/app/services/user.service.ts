import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserService {

  private authToken: string;
  private doctor;

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

  public getContentTypeHeaders() {
    return new HttpHeaders({'Content-Type':  'application/json-patch+json'});
  }

  public getAuthHeaders() {
    return new HttpHeaders({'Authorization':  `Bearer ${this.getToken()}`});
  }

  public register(data) {
    const headers = this.getContentTypeHeaders();
    return this.http.post('http://95.47.136.166:51145/api/1.0/User/register', data, {headers});
  }

  public login(data) {
    const headers = this.getContentTypeHeaders();
    return this.http.post('http://95.47.136.166:51145/api/1.0/User/login', data, {headers});
  }

  public getUserMe() {
    const headers = this.getAuthHeaders();
    return this.http.get('http://95.47.136.166:51145/api/1.0/User/Me', {headers})
      .pipe(tap((user: any) => {
        this.doctor = user.item;
        console.log(this.doctor);
      }));
  }

  public getUserList() {
    const headers = this.getAuthHeaders();
    return this.http.get('http://95.47.136.166:51145/api/1.0/User', {headers});
  }

  public getUserById(id) {
    const headers = this.getAuthHeaders();
    return this.http.get(`http://95.47.136.166:51145/api/1.0/User/${id}`, {headers});
  }

  public registerPatient(data) {
    const headers = this.getContentTypeHeaders();
    return this.http.post('http://95.47.136.166:51145/api/1.0/User/register', data, {headers});
  }

  public editPatient(doctorId, patient) {
    const headers = this.getAuthHeaders();
    return this.http.put(`http://95.47.136.166:51145/api/1.0/User/${doctorId}`, patient, {headers});
  }

  public deletePatient(doctorId) {
    const headers = this.getAuthHeaders();
    return this.http.delete(`http://95.47.136.166:51145/api/1.0/User/${doctorId}`, {headers});
  }

  public getPatientList(doctorId) {
    const headers = this.getAuthHeaders();
    return this.http.get(`http://95.47.136.166:51145/api/1.0/User/${doctorId}/patient`, {headers});
  }

  public addPatientFamilyDoc(doctorId, patient) {
    const headers = this.getAuthHeaders();
    return this.http.put(`http://95.47.136.166:51145/api/1.0/User/${doctorId}/patient`, patient, {headers});
  }

  public patientLogin(data) {
    const headers = this.getAuthHeaders();
    return this.http.post('http://95.47.136.166:51145/api/1.0/User/patient/login', data, {headers});
  }

  public addChild(data, id) {
    const headers = this.getAuthHeaders();
    return this.http.post(`http://95.47.136.166:51145/api/1.0/User/${id}/child`, data, {headers});
  }

}
