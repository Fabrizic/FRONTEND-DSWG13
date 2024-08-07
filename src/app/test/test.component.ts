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
import { NgFor } from '@angular/common';
import { TestService } from '../service/Test.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [FormsModule, CommonModule, NgFor ],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  preguntas: Pregunta[] = [];
  respuestas: (Respuestas | null)[] = [];
  respuestasSeleccionadas = [];
  testid: number | null = null;
  cantidadPreguntas: number = 0;
  tests: any[] = [];

  constructor(
    private router: Router,
    private preguntasService: PreguntasService,
    private respuestasService: RespuestasService,
    private obtenerRespuestasService: ObtenerRespuestasService,
    private testService: TestService
  ) {}

  ngOnInit() {
    this.testid = Number(localStorage.getItem('testid'));

    this.testService.getTests().subscribe((data: any) => {
      this.tests = data.data;
    });

    this.preguntasService.getPreguntas(this.testid).subscribe((respuesta: any) => {
      this.preguntas = respuesta.data;
      this.cantidadPreguntas = this.preguntas.length;
      console.log(this.preguntas);
    }, (error: any) => {
      console.error(error);
    });
  
    this.respuestasService.getRespuestas(this.testid).subscribe((respuesta: any) => {
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
      this.respuestasSeleccionadas.length === this.cantidadPreguntas &&
      !this.respuestas.includes(null)
    ) {

      let respuestasParaEnviar = this.preguntas.map((pregunta, index) => {
        return {
          preguntaid: pregunta.preguntaid,
          respuestaid: this.respuestasSeleccionadas[index]
        };
      });
      console.log(respuestasParaEnviar);
      this.obtenerRespuestasService.cambiarRespuestas(respuestasParaEnviar);
      this.router.navigate(['/resultados']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, responde a todas las preguntas antes de continuar.',
      });
    }
  }

  getTestName(testid: number): string {
    for (let test of this.tests) {
      if (test.testid === testid) {
        return test.nombre;
      }
    }
    return 'None';
  }

  redireccionarSegunTipoUsuario(event: Event) {
    event.preventDefault(); 
    const tipousuarioid = Number(localStorage.getItem('tipousuarioid'));
  
    switch(tipousuarioid) {
      case 1:
        this.router.navigate(['/home']);
        break;
      case 2:
        this.router.navigate(['/home-psychologist']);
        break;
      case 3:
        this.router.navigate(['/home-admin']);
        break;
      default:
        console.log('Tipo de usuario no reconocido');
    }
  }
}