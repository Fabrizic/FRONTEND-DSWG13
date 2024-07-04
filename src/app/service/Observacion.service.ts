import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObservacionService {

  readonly BASE_URL: string = 'http://127.0.0.1:5000/diagnostico';
  readonly BASE_URL2: string = 'http://127.0.0.1:5000/observacion';
  
  constructor(private http: HttpClient) { }

  getDiagnostico(diagnosticoid: number){ {
    return this.http.get(`${this.BASE_URL}/${diagnosticoid}`);
  }}

  postObservacion(form: any) {
    return this.http.post(this.BASE_URL2, form);
  }

}
