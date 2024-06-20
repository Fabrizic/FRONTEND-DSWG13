import { Component, OnInit } from '@angular/core'; // Importa el servicio RealizarTestService
import { ObtenerRespuestasService } from '../service/ObtenerRespuestas.service';
import { Router } from '@angular/router'; // Import the Router module
import { RealizarTestService } from '../service/RealizarTest.service';
import { Observable, of } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

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
            if(!this.diagnostico) {
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
}
