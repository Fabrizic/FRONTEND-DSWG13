import { Component, OnInit } from '@angular/core';
import { TestService } from '../service/Test.service'; 
import { Router } from '@angular/router'; // Import the Router module

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit{
  respuestas: number[] = []; 

  constructor(private testService: TestService, private router: Router) { // Inject the Router module
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
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