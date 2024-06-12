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
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private http: HttpClient, private router: Router) {
    this.loginForm = new FormGroup({
      correo: new FormControl('', Validators.required),
      contrasena: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.getValues();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(`Correo: ${this.loginForm.value.correo}, Contraseña: ${this.loginForm.value.contrasena}`);
      this.http.post('http://127.0.0.1:5000/login', this.loginForm.value).pipe(
        catchError((error: any) => {
          if (error.status === 401) {
            Swal.fire({
              title: 'Error',
              text: 'Correo o contraseña inválidos',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error al iniciar sesión',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
          throw error;
        })
      ).subscribe((response: any) => {
        console.log(response);
        if (response['message'] === 'Login exitoso') {
          Swal.fire({
            title: 'Éxito',
            text: 'Inicio de sesión exitoso',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.router.navigate(['/home']);
        } else {
          Swal.fire({
            title: 'Error',
            text: response['message'],
            icon: 'error',
            confirmButtonText: 'OK'
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