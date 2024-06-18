import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PreguntasService } from '../service/Preguntas.service';
import { RespuestasService } from '../service/Respuestas.service';
import { Respuestas } from '../model/Respuestas'; // Asegúrate de que esta ruta es correcta
import { Pregunta } from '../model/Preguntas'; // Asegúrate de que esta ruta es correcta
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ObtenerRespuestasService } from '../service/ObtenerRespuestas.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  preguntas: Pregunta[] = [];
  respuestas: (Respuestas | null)[] = [];
  respuestasSeleccionadas = [];
  constructor(
    private router: Router,
    private preguntasService: PreguntasService,
    private respuestasService: RespuestasService,
    private obtenerRespuestasService: ObtenerRespuestasService
  ) {}

  ngOnInit() {
    const testid = localStorage.getItem('testid');

    this.preguntasService.getPreguntas(Number(testid)).subscribe((respuesta: any) => {
      this.preguntas = respuesta.data;
      console.log(this.preguntas);
    }, (error: any) => {
      console.error(error);
    });
  
    this.respuestasService.getRespuestas(Number(testid)).subscribe((respuesta: any) => {
      this.respuestas = respuesta.data;
      console.log(this.respuestas);
    }, (error: any) => {
      console.error(error);
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  onSubmit(): void {
    console.log(this.respuestasSeleccionadas);
    if (
      this.respuestasSeleccionadas.length === 20 &&
      !this.respuestas.includes(null)
    ) {
      this.obtenerRespuestasService.cambiarRespuestas(this.respuestasSeleccionadas);
      this.router.navigate(['/resultados']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, responde a todas las preguntas antes de continuar.',
      });
    }
  }
}