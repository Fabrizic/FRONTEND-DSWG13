import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registrar } from '../model/Registrar';

@Injectable({
  providedIn: 'root',
})
export class RegistrarService {
  readonly BASE_URL: string =
    'https://sysvita-dswg13.onrender.com/register';
  constructor(private http: HttpClient) {}

  getRegistrar(): Observable<Registrar[]> {
    return this.http.get<Registrar[]>(`${this.BASE_URL}/listar`);
  }

  registrarRegistrar(form: any) {
    return this.http.post(`${this.BASE_URL}`, form);
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
