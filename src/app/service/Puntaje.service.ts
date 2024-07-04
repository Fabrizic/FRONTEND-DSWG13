import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PuntajeService {

  readonly BASE_URL: string = 'http://127.0.0.1:5000/puntuacionindividual';

constructor(private http: HttpClient) { }

  postPuntaje(form: any) {
    return this.http.post(this.BASE_URL, form);
  }

}
