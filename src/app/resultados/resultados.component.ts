import { Component, OnInit } from '@angular/core'; // Importa el servicio RealizarTestService
import { ObtenerRespuestasService } from '../service/ObtenerRespuestas.service';
import { Router } from '@angular/router'; // Import the Router module
import { RealizarTestService } from '../service/RealizarTest.service';
import { Observable, of } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

declare var $: any; // Add the type declaration for jQuery

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css'],
})
export class ResultadosComponent implements OnInit {
  respuestas: number[] = [];
  puntaje: number = 0;
  diagnostico: string = '';
  isLoading: boolean = false;
  preguntasYRespuestas: any[] = [];
  diagnosticoid: number = 0;
  mostrarModal: boolean = false;
  preguntasYRespuestasIzquierda: any[] = [];
  preguntasYRespuestasDerecha: any[] = [];
  tipousuarioid: number = 0;

  constructor(
    private obtenerRespuestasService: ObtenerRespuestasService, // Inyecta el servicio RealizarTestService
    private realizarTestService: RealizarTestService,
    private router: Router // Inyecta el módulo Router
  ) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  ngOnInit() {
    const testid = localStorage.getItem('testid');
    const personaid = localStorage.getItem('persona_id');
    const tipousuarioid = Number(localStorage.getItem('tipousuarioid'));
    this.tipousuarioid = tipousuarioid;
    console.log(testid);
    console.log(personaid);
    this.obtenerRespuestasService.respuestasActuales.subscribe(
      (respuestasSeleccionadas) => {
        console.log(respuestasSeleccionadas);

        const respuestas = [];
        for (let i = 0; i < respuestasSeleccionadas.length; i++) {
          respuestas.push({
            preguntaid: i + 1,
            respuestaid: respuestasSeleccionadas[i].respuestaid, // Usa el respuestaid almacenado
          });
        }

        const form = {
          personaid: personaid,
          testid: testid,
          respuestas: respuestas,
        };

        this.isLoading = true;
        this.realizarTestService.registrarRespuestas(form).subscribe(
          (response: any) => {
            console.log(response);
            this.puntaje = response.puntaje;
            this.diagnostico = response.diagnostico;
            this.diagnosticoid = Number(response.diagnosticoid);
            if (!this.diagnostico) {
              console.log('No se encontró un diagnóstico');
            }
            console.log(this.puntaje);
            console.log(this.diagnostico);
            this.isLoading = false;
          },
          (error: any) => {
            console.error(error);
            this.isLoading = false;
          }
        );
      }
    );
  }

  abrirModal(diagnosticoid: number) {
    this.realizarTestService
      .obtenerRespuestas(diagnosticoid)
      .subscribe((resultado: any) => {
        const preguntasYRespuestas = resultado.data.map((item: any) => ({
          textopregunta: item.textopregunta,
          textorespuesta: item.textorespuesta,
        }));
        console.log(preguntasYRespuestas);
        this.preguntasYRespuestas = preguntasYRespuestas;
  
        // Aquí divides el array en dos
        const mitad = Math.ceil(this.preguntasYRespuestas.length / 2);
        this.preguntasYRespuestasIzquierda = this.preguntasYRespuestas.slice(0, mitad);
        this.preguntasYRespuestasDerecha = this.preguntasYRespuestas.slice(mitad);
  
        this.mostrarModal = true; // Modificado para usar la propiedad mostrarModal
      });
  }

  cerrarModal() {
    this.mostrarModal = false; // Método para cerrar el modal
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
