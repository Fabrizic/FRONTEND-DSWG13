import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TestService } from '../service/Test.service';
import { PreguntasService } from '../service/Preguntas.service';
import { RespuestasService } from '../service/Respuestas.service';
import { PuntajeService } from '../service/Puntaje.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-test',
  standalone: true,
  imports: [RouterModule, FormsModule, NgFor],
  templateUrl: './agregar-test.component.html',
  styleUrls: ['./agregar-test.component.css']
})
export class AgregarTestComponent implements OnInit {

  preguntas: any[] = [];
  respuestas: any[] = [];
  puntajes: any[] = [];

  constructor(private router: Router, private testService: TestService, private preguntasService: PreguntasService, private respuestasService: RespuestasService, private puntajeService: PuntajeService) { }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  agregarPregunta() {
    const nuevaPregunta = { textopregunta: '', numeropregunta: this.preguntas.length + 1 };
    this.preguntas.push(nuevaPregunta);
  }
  
  agregarRespuesta() {
    const nuevaRespuesta = { textorespuesta: '', numerorespuesta: this.respuestas.length + 1 };
    this.respuestas.push(nuevaRespuesta);
  }

  onSubmit(form: any) {
    this.testService.postTest(form.value).subscribe({
      next: (response: any) => {
        Swal.fire('¡Éxito!', 'Formulario enviado con éxito', 'success');
        const testid = response.data.testid;

        this.preguntas.forEach(pregunta => {
          pregunta.testid = testid;
          this.preguntasService.postPregunta({
            testid: pregunta.testid,
            textopregunta: pregunta.textopregunta,
            numeropregunta: pregunta.numeropregunta
          }).subscribe({
            next: (res) => console.log('Pregunta enviada con éxito', res),
            error: (err) => Swal.fire('Error', 'Error al enviar pregunta', 'error')
          });
        });

        this.respuestas.forEach(respuesta => {
          respuesta.testid = testid;
          this.respuestasService.postRespuesta({
            testid: respuesta.testid,
            textorespuesta: respuesta.textorespuesta,
            numerorespuesta: respuesta.numerorespuesta
          }).subscribe({
            next: (res) => console.log('Respuesta enviada con éxito', res),
            error: (err) => Swal.fire('Error', 'Error al enviar respuesta', 'error')
          });
        });

        this.puntajes.forEach(puntaje => {
          puntaje.testid = testid;
          this.puntajeService.postPuntaje({
            testid: puntaje.testid,
            rango_inferior: puntaje.rango_inferior,
            rango_superior: puntaje.rango_superior,
            diagnostico: puntaje.diagnostico,
            css: puntaje.css
          }).subscribe({
            next: (res) => console.log('Puntaje enviado con éxito', res),
            error: (err) => Swal.fire('Error', 'Error al enviar puntaje', 'error')
          });
        });
      },
      error: (error) => Swal.fire('Error', 'Error al enviar el formulario', 'error')
    });
  }

  agregarPuntaje() {
    // Añade un puntaje con valores predeterminados o basados en un formulario
    const nuevoPuntaje = { rango_inferior: 0, rango_superior: 0, diagnostico: '', css: '' };
    this.puntajes.push(nuevoPuntaje);
  }

  eliminarPuntaje(index: number) {
    // Elimina un puntaje basado en el índice
    this.puntajes.splice(index, 1);
  }

  // Opcional: Método para actualizar un puntaje existente
  actualizarPuntaje(index: number, nuevoPuntaje: any) {
    // Asegúrate de validar y actualizar el puntaje correctamente
    this.puntajes[index] = nuevoPuntaje;
  }
}
