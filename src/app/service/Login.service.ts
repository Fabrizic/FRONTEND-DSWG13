import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../model/Login';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly BASE_URL: string = 'http://127.0.0.1:5000/login';

  constructor(private http: HttpClient) { }

  getLogin() {
    return this.http.get(this.BASE_URL);
  }

}
