import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../model/Login';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly BASE_URL: string = 'https://flask-crud-backend-v2-1.onrender.com/login';

  constructor(private http: HttpClient) { }

  getLogin(): Observable<Login[]> {
    return this.http.get<Login[]>(`${this.BASE_URL}/listar`);
  }

  registrarLogin(form: any) {
    return this.http.post(`${this.BASE_URL}/agregar`, form);
  }

  actualizarLogin(form: any) {
    return this.http.post(`${this.BASE_URL}/actualizar`, form);
  }

  eliminarLogin(login: Login) {
    return this.http.delete(`${this.BASE_URL}/eliminar`, {
      body: login,
    });
  }

}
