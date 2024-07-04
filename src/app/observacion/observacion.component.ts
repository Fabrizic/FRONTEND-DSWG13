import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ObservacionService } from '../service/Observacion.service';
import { RealizarTestService } from '../service/RealizarTest.service';
import { NgFor, NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-observacion',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './observacion.component.html',
  styleUrls: ['./observacion.component.css'],
})
export class ObservacionComponent implements OnInit {
  diagnosticoid: number | undefined = undefined;
  diagnostico: any = {};
  preguntasYRespuestas: any;
  observacion: string = '';
  recomendacion: string = '';

  form: FormGroup; // Declare the 'form' property

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private observacionService: ObservacionService,
    private realizartestService: RealizarTestService
  ) {
    this.form = new FormGroup({
      diagnosticoid: new FormControl(this.diagnosticoid),
      observacion: new FormControl(this.observacion, [Validators.required]),
      recomendacion: new FormControl(this.recomendacion, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.diagnosticoid = parseInt(
      this.route.snapshot.paramMap.get('diagnosticoid') || '0'
    );
    console.log('Diagnostic ID:', this.diagnosticoid);
    this.form.patchValue({
      diagnosticoid: this.diagnosticoid,
    });
    this.getDiagnostico();
    this.getRespuestas();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  onSubmit() {
    this.enviarObservacion();
    this.descargarPDFyEnviarEmail();
  }

  getDiagnostico() {
    if (this.diagnosticoid !== undefined) {
      this.observacionService
        .getDiagnostico(this.diagnosticoid)
        .subscribe((data: any) => {
          this.diagnostico = data;
          console.log('Diagnostico:', data);
        });
    } else {
      console.log('Diagnostic ID is undefined.');
    }
  }

  getRespuestas() {
    if (this.diagnosticoid !== undefined) {
      this.realizartestService
        .obtenerRespuestas(this.diagnosticoid)
        .subscribe((resultado: any) => {
          const preguntasYRespuestas = resultado.data.map((item: any) => ({
            textopregunta: item.textopregunta,
            textorespuesta: item.textorespuesta,
          }));
          this.preguntasYRespuestas = preguntasYRespuestas;
        });
    } else {
      console.log('Diagnostic ID is undefined.');
    }
  }

  enviarObservacion() {
    // Actualiza el FormGroup con los valores actuales
    this.form.patchValue({
      diagnosticoid: this.diagnosticoid,
      observacion: this.observacion,
      recomendacion: this.recomendacion,
    });

    console.log('Diagnostic ID:', this.diagnosticoid);
    console.log('Observacion:', this.observacion);
    console.log('Recomendacion:', this.recomendacion);
    if (this.form.valid) {
      console.log('Formulario:', this.form.value); // Corregido para usar this.form.value
      this.observacionService.postObservacion(this.form.value).subscribe({
        next: (response) => {
          console.log('Observación enviada', response);
          Swal.fire({
            title: '¡Éxito!',
            text: 'Observación enviada correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
        },
        error: (error) => {
          console.error('Error al enviar observación', error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al enviar la observación.',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    } else {
      // Manejo de formulario inválido.
      Swal.fire({
        title: 'Error',
        text: 'Por favor, completa todos los campos requeridos.',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
    }
  }

  regresar() {
    this.router.navigate(['/ver-resultados']);
  }

  descargarPDFyEnviarEmail() {
    const pdf = new jsPDF();

    // Título "Información Diagnóstico"
    pdf.setFontSize(16);
    pdf.text('Información Diagnóstico', 105, 20, { align: 'center' });

    // Datos del diagnóstico (nombre y edad)
    pdf.setFontSize(12);
    pdf.text(
      `Nombre: ${this.diagnostico.data?.nombre} ${this.diagnostico.data?.apellidopaterno} ${this.diagnostico.data?.apellidomaterno}`,
      20,
      40
    );
    pdf.text(`Edad: ${this.diagnostico.data?.edad}`, 20, 50);
    pdf.text(`Departamento: ${this.diagnostico.data?.departamento}`, 20, 60);
    pdf.text(`Provincia: ${this.diagnostico.data?.provincia}`, 20, 70);
    pdf.text(`Distrito: ${this.diagnostico.data?.distrito}`, 20, 80);
    pdf.text(`Correo Electrónico: ${this.diagnostico.data?.correo}`, 20, 90);
    pdf.text(`Fecha del Diagnóstico: ${this.diagnostico.data?.fecha}`, 20, 100);
    pdf.text(`Test Realizado: ${this.diagnostico.data?.test_nombre}`, 20, 110);
    pdf.text(`Diagnostico: ${this.diagnostico.data?.diagnostico}`, 20, 120);
    pdf.text(`Puntaje: ${this.diagnostico.data?.puntaje}`, 20, 130);

    // Verificar espacio para "Observación" y "Recomendación"
    let yPosition = 150; // Ajustar según el último elemento agregado
    if (yPosition > 260) { // Ajustar este valor según necesidad
        pdf.addPage();
        yPosition = 20;
    }
    
    pdf.setFontSize(16);
    pdf.text('Observación y recomendación', 105, yPosition, { align: 'center' });
    yPosition += 10;

    // Sección "Observación"
    pdf.setFontSize(12);
    pdf.text(`Observación: ${this.observacion}`, 20, yPosition);
    yPosition += 10;
    
    // Sección "Recomendación"
    pdf.text(`Recomendación: ${this.recomendacion}`, 20, yPosition);
    yPosition += 20; // Ajustar el espacio antes de las respuestas del usuario
    
    // Título "Respuestas del usuario"
    pdf.addPage();
    pdf.setFontSize(16);
    pdf.text('Respuestas del Usuario', 105, 20, { align: 'center' });
    
    // Preguntas y respuestas
    yPosition = 30; // Remove the duplicate declaration of 'yPosition'
    for (let preguntaRespuesta of this.preguntasYRespuestas) {
      pdf.setFontSize(12);
      pdf.text(`Pregunta: ${preguntaRespuesta.textopregunta}`, 20, yPosition);
      yPosition += 10;
      pdf.text(`Respuesta: ${preguntaRespuesta.textorespuesta}`, 20, yPosition);
      yPosition += 10;
    
      // Añadir nueva página si no hay espacio suficiente
      if (yPosition > 280) {
        pdf.addPage();
        yPosition = 20;
      }
    }

    // Guardar el PDF
    pdf.save('TestResultado.pdf');

    // Envío de correo electrónico después de la generación del PDF
    if (this.diagnostico.data?.correo) {
      window.location.href = `mailto:${this.diagnostico.data.correo}?subject=Resultado del Test&body=Por favor, adjunte manualmente el archivo PDF "TestResultado.pdf" que se ha descargado a su dispositivo.`;
    }
  }
}
