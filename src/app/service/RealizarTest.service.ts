import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RealizarTestService {
  readonly BASE_URL: string = 'http://127.0.0.1:5000/realizartest'
constructor(private http: HttpClient) { }

    registrarRespuestas(form: any) {
    return this.http.post(`${this.BASE_URL}`, form);
    }
}