import { Component, OnInit } from '@angular/core'; // Importa el servicio RealizarTestService
import { ObtenerRespuestasService } from '../service/ObtenerRespuestas.service';
import { Router } from '@angular/router'; // Import the Router module
import { RealizarTestService } from '../service/RealizarTest.service';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css'],
})
export class ResultadosComponent implements OnInit {
  respuestas: number[] = [];
  puntaje$: Observable<number> = new Observable<number>();
  diagnostico$: Observable<string> = new Observable<string>();

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
    this.obtenerRespuestasService.respuestasActuales.subscribe(
      (respuestasSeleccionadas) => {
        console.log(respuestasSeleccionadas);

        const respuestas = [];
        for (let i = 0; i < respuestasSeleccionadas.length; i++) {
          respuestas.push({
            preguntaid: i + 1,
            respuestaid: respuestasSeleccionadas[i],
          });
        }

        const form = {
          personaid: personaid,
          testid: testid,
          respuestas: respuestas,
        };

        this.realizarTestService.registrarRespuestas(form).subscribe(
          (response: any) => {
            console.log(response);
            this.puntaje$ = of(response.puntaje);
            this.diagnostico$ = of(response.diagnostico);
            console.log(this.puntaje$);
            console.log(this.diagnostico$);
          },
          (error: any) => {
            console.error(error);
          }
        );
      }
    );
  }
}
