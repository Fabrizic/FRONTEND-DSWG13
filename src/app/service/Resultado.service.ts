import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, mergeMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ResultadoService {
  constructor(private http: HttpClient) { }

  readonly BASE_URL: string = 'http://127.0.0.1:5000/resultados';

  getResultado(): Observable<any> {
    return this.http.get(this.BASE_URL);
  }
} 
