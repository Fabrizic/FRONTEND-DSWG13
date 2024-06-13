import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private respuestasSource = new BehaviorSubject<number[]>([]);
  respuestasActuales = this.respuestasSource.asObservable();

  constructor() { }

  actualizarRespuestas(respuestas: number[]): void {
    this.respuestasSource.next(respuestas);
  }
}