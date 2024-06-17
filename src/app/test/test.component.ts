import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TestService } from '../service/Test.service'; 

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent {

  constructor(private router: Router, private testService: TestService) {} 

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
  
  preguntas = [
    'Me siento más nervioso y ansioso de lo normal',
    'Me siento asustado sin ninguna razón',
    'Me asusto fácilmente o me coge el pánico',
    'Me siento destrozado y me parece que estoy por derrumbarme',
    'Me parece que va todo bien y que no me pasará nada malo',
    'Me tiemblan los brazos y las piernas',
    'Me atormentan el dolor de cabeza, del cuello y de la espalda',
    'Me siento débil y me canso fácilmente',
    'Me siento calmo y puedo estar sentado fácilmente',
    'Siento que mi corazón late rápido',
    'Sufro de vértigo',
    'Me parece que estoy por desmayarme',
    'Respiro con dificultad',
    'Tengo sensaciones de entorpecimiento y hormigueo en los dedos de las manos y de los pies',
    'Sufro de dolor de estómago o de indigestión',
    'Necesito orinar a menudo',
    'Mis manos están secas y calientes por lo general',
    'Mi cara se calienta y se pone roja fácilmente',
    'Me duermo fácilmente y me despierto descansado',
    'Tengo pesadillas',
  ];

  respuestas = Array(this.preguntas.length).fill(null);

  onSubmit(): void {
    this.testService.actualizarRespuestas(this.respuestas);
    if (this.respuestas.length === this.preguntas.length && !this.respuestas.includes(null)) {
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