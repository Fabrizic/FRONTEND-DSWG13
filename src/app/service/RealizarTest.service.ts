import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RealizarTestService {
  readonly BASE_URL: string = 'http://127.0.0.1:5000/realizartest'
  readonly BASE_URL2: string = 'http://127.0.0.1:5000/susrespuestas'
constructor(private http: HttpClient) { }

    registrarRespuestas(form: any) {
    return this.http.post(`${this.BASE_URL}`, form);
    }

    obtenerRespuestas(diagnosticoid: number){
      return this.http.get(`${this.BASE_URL2}/${diagnosticoid}`);
    }
}