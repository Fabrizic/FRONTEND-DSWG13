import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ObservacionService } from '../service/Observacion.service';
import { RealizarTestService } from '../service/RealizarTest.service';
import { NgFor, NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-observacion',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './observacion.component.html',
  styleUrls: ['./observacion.component.css']
})
export class ObservacionComponent implements OnInit {

  diagnosticoid: number | undefined = undefined;
  diagnostico: any = {};
  preguntasYRespuestas: any;
  observacion: string = '';
  recomendacion: string = '';

  form: FormGroup; // Declare the 'form' property
  
  constructor(private route: ActivatedRoute, private router: Router, private observacionService: ObservacionService, private realizartestService: RealizarTestService) {
      this.form = new FormGroup({
        diagnosticoid: new FormControl(this.diagnosticoid),
        observacion: new FormControl(this.observacion, [Validators.required]),
        recomendacion: new FormControl(this.recomendacion, [Validators.required])
      });
  }

  ngOnInit(): void {
    this.diagnosticoid = parseInt(this.route.snapshot.paramMap.get('diagnosticoid') || '0');
    console.log('Diagnostic ID:', this.diagnosticoid);
    this.form.patchValue({
      diagnosticoid: this.diagnosticoid
    });
    this.getDiagnostico();
    this.getRespuestas();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  onSubmit() {
    this.enviarObservacion();
  }

  getDiagnostico() {
    if (this.diagnosticoid !== undefined) {
      this.observacionService.getDiagnostico(this.diagnosticoid).subscribe((data: any) => {
        this.diagnostico = data;
        console.log('Diagnostico:', data);
      });
    } else {
      console.log('Diagnostic ID is undefined.');
    }
  }

  getRespuestas() {
    if (this.diagnosticoid !== undefined ) {
      this.realizartestService
      .obtenerRespuestas(this.diagnosticoid)
      .subscribe((resultado: any) => {
        const preguntasYRespuestas = resultado.data.map((item: any) => ({
          textopregunta: item.textopregunta,
          textorespuesta: item.textorespuesta,
        }));
        this.preguntasYRespuestas = preguntasYRespuestas;
      });
    } else {
      console.log('Diagnostic ID is undefined.');
    }
  }

  enviarObservacion() {
    // Actualiza el FormGroup con los valores actuales
    this.form.patchValue({
      diagnosticoid: this.diagnosticoid,
      observacion: this.observacion,
      recomendacion: this.recomendacion
    });
  
    console.log('Diagnostic ID:', this.diagnosticoid);
    console.log('Observacion:', this.observacion);
    console.log('Recomendacion:', this.recomendacion);
    if (this.form.valid) {
      console.log('Formulario:', this.form.value); // Corregido para usar this.form.value
      this.observacionService.postObservacion(this.form.value).subscribe({
        next: (response) => {
          console.log('Observación enviada', response);
          Swal.fire({
            title: '¡Éxito!',
            text: 'Observación enviada correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        },
        error: (error) => {
          console.error('Error al enviar observación', error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al enviar la observación.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
    } else {
      // Manejo de formulario inválido.
      Swal.fire({
        title: 'Error',
        text: 'Por favor, completa todos los campos requeridos.',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
    }
  }

  regresar() {
    this.router.navigate(['/ver-resultados']);
  }

  
}
