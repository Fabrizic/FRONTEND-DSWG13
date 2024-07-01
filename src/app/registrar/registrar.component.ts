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
import { UbigeoService } from '../service/Ubigeo.service';
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
  departamentos: any[] = [];
  provincias: any[] = [];
  distritos: any[] = [];

  constructor(
    private registerService: RegistrarService,
    private formBuilder: FormBuilder,
    private router: Router,
    private ubigeoService: UbigeoService
  ) {}

  ngOnInit(): void {
    this.getDepartamento();
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidopaterno: ['', Validators.required],
      apellidomaterno: ['', Validators.required],
      fechanacimiento: ['', Validators.required],
      departamento: ['', Validators.required],
      provincia: ['', Validators.required],
      distrito: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      tipousuarioid: 1
    });

    this.registerForm.get('departamento')?.valueChanges.subscribe(() => {
      this.onProvinciaChange();
    });
    
    this.registerForm.get('provincia')?.valueChanges.subscribe(() => {
      this.onDistritoChange();
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

  getDepartamento(): void {
    this.ubigeoService.getDepartamento().subscribe(
      (response: any) => {
        this.departamentos = response.data;
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  onProvinciaChange(): void {
    const departamento = this.registerForm.get('departamento')?.value;
    if (!departamento) return; // Asegúrate de que el departamento tenga un valor antes de continuar
  
    this.ubigeoService.getProvincia(departamento).subscribe(
      (response: any) => {
        this.provincias = response.data;
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  onDistritoChange(): void {
    const departamento = this.registerForm.get('departamento')?.value;
    const provincia = this.registerForm.get('provincia')?.value;
    if (!provincia && !departamento) return;
    
    this.ubigeoService.getDistrito(provincia, departamento).subscribe(
      (response: any) => {
        this.distritos = response.data;
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
