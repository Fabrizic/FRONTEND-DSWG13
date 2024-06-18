import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  constructor(private http: HttpClient) { }

  readonly BASE_URL: string = 'http://127.0.0.1:5000/tests';

  getTests() {
    return this.http.get(this.BASE_URL);
  }
  
}