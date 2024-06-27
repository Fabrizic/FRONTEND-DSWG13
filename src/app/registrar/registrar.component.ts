import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { RegistrarService } from '../service/Register.service';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
})
export class RegistrarComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});

  constructor(
    private registerService: RegistrarService,
    private formBuilder: FormBuilder,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidopaterno: ['', Validators.required],
      apellidomaterno: ['', Validators.required],
      fechanacimiento: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      tipousuarioid: 1
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.registerService.registrarRegistrar(this.registerForm.value).subscribe(
        (response: any) => {
          console.log(response);
          Swal.fire('Éxito', 'Registro completado con éxito', 'success').then(() => {
            this.router.navigate(['']);
          });
        },
        (error: any) => {
          console.log(error);
          Swal.fire('Error', 'Hubo un error al registrar', 'error');
        }
      );
    } else {
      Swal.fire('Advertencia', 'Por favor, completa todos los campos', 'warning');
    }
  }
}
