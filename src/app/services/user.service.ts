import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {

  private authToken: string;

  constructor(private http: HttpClient) { }

  public getToken() {
    return this.authToken;
  }

  public setToken(token: string) {
    this.authToken = token;
  }

  public register(data) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json-patch+json'
    });
    return this.http.post('http://95.47.136.166:51145/api/1.0/User/register', data, {headers});
  }

  public login(data) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json-patch+json'
    });
    return this.http.post('http://95.47.136.166:51145/api/1.0/User/login', data, {headers});
  }

}
