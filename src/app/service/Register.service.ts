import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registrar } from '../model/Registrar';

@Injectable({
  providedIn: 'root',
})
export class RegistrarService {
  readonly BASE_URL: string =
    'http://127.0.0.1:5000';
  constructor(private http: HttpClient) {}

  getRegistrar(): Observable<Registrar[]> {
    return this.http.get<Registrar[]>(`${this.BASE_URL}/listar`);
  }

  registrarRegistrar(form: any) {
    return this.http.post(`${this.BASE_URL}/register`, form);
  }

  actualizarRegistrar(form: any) {
    return this.http.post(`${this.BASE_URL}/actualizar`, form);
  }

  eliminarRegistrar(Registrar: Registrar) {
    return this.http.delete(`${this.BASE_URL}/eliminar`, {
      body: Registrar,
    });
  }
}
