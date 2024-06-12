import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../model/Persona';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  readonly BASE_URL: string = 'https://flask-crud-backend-v2-1.onrender.com/api/v1/personas';
  //'http://localhost:8080/api/v1/personas';
  //'https://sigcon-backend.onrender.com/api/v1/personas';

  constructor(private http: HttpClient) {}

  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.BASE_URL}/listar`);
  }
  registrarPersona(form: any) {
    return this.http.post(`${this.BASE_URL}/agregar`, form);
  }
  //agregado para soporte flask
  actualizarPersona(form: any) {
    return this.http.post(`${this.BASE_URL}/actualizar`, form);
  }

  eliminarPersona(persona: Persona) {
    return this.http.delete(`${this.BASE_URL}/eliminar`, {
      body: persona,
    });
  }
}
