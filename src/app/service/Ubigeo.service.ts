import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

constructor(private http: HttpClient) { }

readonly BASE_URL: string = 'http://127.0.0.1:5000';

  getUbigeo() {
    return this.http.get(this.BASE_URL + '/ubigeo');
  }

  getDepartamento() {
    return this.http.get(this.BASE_URL + '/departamento');
  }

  getProvincia(departamento: string) {
    return this.http.get(this.BASE_URL + '/provincia/' + departamento);
  }

  getDistrito(provincia: string, departamento: string) {
    return this.http.get(this.BASE_URL + '/distrito/' + departamento + '/' + provincia);
  }

  getUbigeoById(ubigeoid: number) {
    return this.http.get(this.BASE_URL + '/ubigeo/' + ubigeoid);
  }

  getCirculos() {
    return this.http.get(this.BASE_URL + '/circulos');
  }
}
