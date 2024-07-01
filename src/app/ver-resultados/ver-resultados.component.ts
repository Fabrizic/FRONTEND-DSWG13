import { Component, AfterViewInit, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { ResultadoService } from '../service/Resultado.service';
import { NgFor } from '@angular/common';

declare const L: any;

@Component({
  selector: 'app-ver-resultados',
  standalone: true,
  imports: [NgFor],
  templateUrl: './ver-resultados.component.html',
  styleUrls: ['./ver-resultados.component.css']
})
export class VerResultadosComponent implements AfterViewInit {
  diagnosticos: any[] = []; 

  constructor(private router: Router, private resultadoService: ResultadoService) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  ngAfterViewInit(): void {
    this.getResultados();
    if (isDevMode()) {
      this.initMap();
    } else {
      setTimeout(() => this.initMap(), 0);
    }
  }

  private initMap(): void {
    const miMapa = L.map('miMapa').setView([-12.0655, -77.0463], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(miMapa);

    L.circle([-12.0655, -77.0463], {
      color: 'red',      // Color del borde del círculo
      fillColor: '#f03', // Color de relleno del círculo
      fillOpacity: 0.5,  // Opacidad del relleno
      radius: 500        // Radio del círculo en metros
    }).addTo(miMapa);

  }

  getResultados() {
    this.resultadoService.getResultado().subscribe({
      next: (response) => {
        this.diagnosticos = Array.isArray(response.data) ? response.data : [response.data];
        console.log(this.diagnosticos); 
      },
      error: (error) => console.error(error)
    });
  }

  onRowClick(diagnostico: any) {
    // handle row click event
  }
}