import { Component, OnInit } from '@angular/core';
import { TestService } from '../service/Test.service'; 

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit{
  respuestas: number[] = []; 

  constructor(private testService: TestService) { 
  }

  ngOnInit(): void {
    this.testService.respuestasActuales.subscribe(respuestas => this.respuestas = respuestas);
  }

  getResultado(): string {
    const suma = this.getSumaRespuestas();

    if (suma < 45) {
      return 'Ansiedad normal';
    } else if (suma >= 45 && suma < 60) {
      return 'Ansiedad mínima moderada';
    } else if (suma >= 60 && suma < 75) {
      return 'Ansiedad moderada severa';
    } else {
      return 'Ansiedad en grado máximo';
    }
  }

  getSumaRespuestas(): number {
    return this.respuestas.reduce((a, b) => Number(a) + Number(b), 0);
  }
}