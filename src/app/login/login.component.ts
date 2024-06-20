import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginFormUser: FormGroup;
  loginFormPsychologist: FormGroup;

  constructor(private http: HttpClient, private router: Router) {
    this.loginFormUser = new FormGroup({
      correo: new FormControl('', Validators.required),
      contrasena: new FormControl('', Validators.required),
    });

    this.loginFormPsychologist = new FormGroup({
      correo: new FormControl('', Validators.required),
      contrasena: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.getValues();
  }

  onSubmitUser() {
    if (this.loginFormUser.valid) {

       const data = {
        correo: this.loginFormUser.value.correo,
        contrasena: this.loginFormUser.value.contrasena,
        tipousuarioid: 1,
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
            Swal.fire({
              title: 'Éxito',
              text: 'Inicio de sesión exitoso',
              icon: 'success',
              confirmButtonText: 'OK',
            });
            localStorage.setItem('persona_id', JSON.stringify(response['data']['persona_id']));
            let persona_id = localStorage.getItem('persona_id');
            if (persona_id) {
              console.log(JSON.parse(persona_id));
            }
            this.router.navigate(['/home']);
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

  onSubmitPsychologist() {
    if (this.loginFormPsychologist.valid) {

      const data = {
       correo: this.loginFormPsychologist.value.correo,
       contrasena: this.loginFormPsychologist.value.contrasena,
       tipousuarioid: 2,
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
           Swal.fire({
             title: 'Éxito',
             text: 'Inicio de sesión exitoso',
             icon: 'success',
             confirmButtonText: 'OK',
           });
           localStorage.setItem('persona_id', JSON.stringify(response['data']['persona_id']));
           let persona_id = localStorage.getItem('persona_id');
           if (persona_id) {
             console.log(JSON.parse(persona_id));
           }
           this.router.navigate(['/home-psychologist']);
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
    this.http.get('http://127.0.0.1:5000/login').subscribe((response: any) => {
      console.log(response);
    });
  }
}