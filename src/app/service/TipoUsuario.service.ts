import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService {

constructor(private http: HttpClient) { }

  readonly BASE_URL: string = 'http://127.0.0.1:5000/tipousuario';
  
  getTipoUsuarios() {
    return this.http.get(this.BASE_URL);
  }

}
