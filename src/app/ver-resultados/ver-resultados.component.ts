import { Component, AfterViewInit, isDevMode, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResultadoService } from '../service/Resultado.service';
import { NgFor } from '@angular/common';
import { UbigeoService } from '../service/Ubigeo.service';
import { TestService } from '../service/Test.service';
import { FormsModule, NgModel } from '@angular/forms';

declare const L: any;

@Component({
  selector: 'app-ver-resultados',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './ver-resultados.component.html',
  styleUrls: ['./ver-resultados.component.css'],
})
export class VerResultadosComponent implements OnInit, AfterViewInit {
  diagnosticos: any[] = [];
  miMapa: any;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  paginatedDiagnosticos: any[] = [];
  pages: number[] = [];
  tests: any[] = [];
  testSeleccionado: any;
  circulos: any[] = [];
  fechaSeleccionada: any;
  testsFiltrados: any[] = [];

  constructor(
    private router: Router,
    private resultadoService: ResultadoService,
    private ubigeoService: UbigeoService,
    private testService: TestService
  ) {}

  ngOnInit(): void {
    this.getTests();
  }

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
    this.miMapa = L.map('miMapa').setView([-12.0655, -77.0463], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.miMapa);

    this.getCirculos();
  }

  getResultados() {
    this.resultadoService.getResultado().subscribe({
      next: (response) => {
        if (response.data !== undefined && response.data !== null) {
          this.diagnosticos = Array.isArray(response.data) ? response.data : [response.data];
          if (!this.diagnosticos.length) {
            alert('No se encontraron resultados.');
          } else {
            this.applyPagination();
            this.updatePages();
          }
        } else {
          this.diagnosticos = [];
          alert('No se encontraron resultados.');
        }
      },
      error: (error) => console.error(error),
    });
  }

  private updatePages() {
    const totalPages = Math.ceil(this.diagnosticos.length / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  private applyPagination() {
    const filteredDiagnosticos = this.filtrarDiagnosticos();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedDiagnosticos = filteredDiagnosticos.slice(startIndex, endIndex);
  }

  private filtrarDiagnosticos() {
    return this.diagnosticos.filter(diagnostico => {
      let coincideTest = true;
      let coincideFecha = true;

      if (this.testSeleccionado) {
        coincideTest = diagnostico.testid.toString() === this.testSeleccionado.toString();
      }
      if (this.fechaSeleccionada) {
        coincideFecha = diagnostico.fecha === this.fechaSeleccionada; // Ajusta según el formato de fecha
      }

      return coincideTest && coincideFecha;
    });
  }

  onRowClick(diagnostico: any) {
    this.router.navigate(['/observacion', diagnostico.diagnosticoid]);
  }

  getCirculos() {
    this.ubigeoService.getCirculos().subscribe({
      next: (response: any) => {
        this.circulos.forEach(circulo => circulo.remove());
        this.circulos = [];

        let data = response.data;
        if (!Array.isArray(data)) {
          console.error('La respuesta no es un array:', data);
          return;
        }

        const filteredData = this.filtrarUbigeos(data);

        filteredData.forEach((ubigeo: any) => {
          const popupContent = `
            <b>Nombre:</b> ${ubigeo.nombre}<br>
            <b>Apellido Paterno:</b> ${ubigeo.apellidopaterno}<br>
            <b>Apellido Materno:</b> ${ubigeo.apellidomaterno}<br>
            <b>Diagnóstico:</b> ${ubigeo.diagnostico}
          `;
          const circulo = L.circle([parseFloat(ubigeo.y), parseFloat(ubigeo.x)], {
            color: ubigeo.color,
            fillColor: ubigeo.color,
            fillOpacity: 0.5,
            radius: 500,
          })
            .bindPopup(popupContent)
            .addTo(this.miMapa);

          this.circulos.push(circulo);
        });
      },
      error: (error: any) => console.error(error),
    });
  }

  private filtrarUbigeos(data: any[]) {
    return data.filter(ubigeo => {
      let coincideTest = true;
      let coincideFecha = true;

      if (this.testSeleccionado) {
        coincideTest = ubigeo.testid.toString() === this.testSeleccionado.toString();
      }
      if (this.fechaSeleccionada) {
        coincideFecha = ubigeo.fecha === this.fechaSeleccionada; // Ajusta según el formato de fecha
      }

      return coincideTest && coincideFecha;
    });
  }

  navigatePage(page: number) {
    this.currentPage = page;
    this.applyPagination();
    this.updatePages();
  }

  getTests() {
    this.testService.getTests().subscribe((data: any) => {
      if (data && Array.isArray(data.data)) {
        this.tests = data.data.map((test: any) => ({
          testid: test.testid,
          nombre: test.nombre
        }));
      } else {
        this.tests = [];
      }
    });
  }

  onFilterChange(type: string, newValue: any) {
    if (type === 'test') {
      this.testSeleccionado = newValue;
    } else if (type === 'fecha') {
      this.fechaSeleccionada = newValue;
    }

    this.applyPagination();
    this.updatePages();
    this.getCirculos();
  }

  resetFilters(): void {
    this.testSeleccionado = undefined;
    this.fechaSeleccionada = undefined;
    this.currentPage = 1;
    this.applyPagination();
    this.updatePages();
    this.getCirculos();
  }
}