import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObtenerRespuestasService {
  private respuestasSource = new BehaviorSubject<any[]>([]);
  respuestasActuales = this.respuestasSource.asObservable();

  constructor() { }

  cambiarRespuestas(respuestas: any[]) {
    this.respuestasSource.next(respuestas);
  }
}