import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from '../service/Login.service';
import { TipoUsuarioService } from '../service/TipoUsuario.service';
import { CommonModule } from '@angular/common';
import { TipoUsuario } from '../model/Tipo_usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup
  tiposUsuario: TipoUsuario[] = [];

  constructor(private loginService: LoginService, private tipoUsuario: TipoUsuarioService, private http: HttpClient, private router: Router) {
    this.loginForm = new FormGroup({
      correo: new FormControl('', Validators.required),
      contrasena: new FormControl('', Validators.required),
      tipousuarioid: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.getValues();
    this.getTipoUsuario();
  }

  onSubmit() {
    if (this.loginForm.valid) {

       const data = {
        correo: this.loginForm.value.correo,
        contrasena: this.loginForm.value.contrasena,
        tipousuarioid: this.loginForm.value.tipousuarioid,
      };

      console.log(
        `Correo: ${data.correo}, Contraseña: ${data.contrasena}, TipoUsuarioID: ${data.tipousuarioid}`
      );

      
      this.http
        .post('http://127.0.0.1:5000/login', data)
        .pipe(
          catchError((error: any) => {
            if (error.status === 401) {
              Swal.fire({
                title: 'Error',
                text: 'Correo o contraseña inválidos',
                icon: 'error',
                confirmButtonText: 'OK',
              });
            } else {
              Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al iniciar sesión',
                icon: 'error',
                confirmButtonText: 'OK',
              });
            }
            throw error;
          })
        )
        .subscribe((response: any) => {
          console.log(response);
          if (response['message'] === 'Login exitoso') {
            let ruta =  '/home'
            if(response['data']['tipousuarioid']==1){
              ruta = '/home';

            }else if(response['data']['tipousuarioid']==2){
                ruta = '/home-psychologist';
              }
            Swal.fire({
              title: 'Éxito',
              text: 'Inicio de sesión exitoso',
              icon: 'success',
              confirmButtonText: 'OK',
            });
            localStorage.setItem('persona_id', JSON.stringify(response['data']['persona_id']));
            localStorage.setItem('tipousuarioid', JSON.stringify(response['data']['tipousuarioid']));
            let persona_id = localStorage.getItem('persona_id');
          } else {
            Swal.fire({
              title: 'Error',
              text: response['message'],
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        });
    }
  }

  getValues() {
    this.loginService.getLogin().subscribe((response: any) => {
      console.log(response);
    });
  }

  getTipoUsuario() {
    this.tipoUsuario.getTipoUsuarios().subscribe((response: any) => {
      console.log(response);
      this.tiposUsuario = response.data;
    });
  }
  
}