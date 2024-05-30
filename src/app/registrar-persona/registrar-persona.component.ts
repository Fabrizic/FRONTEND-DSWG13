import { Component, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Persona } from '../model/Persona';
import { PersonaService } from '../service/Persona.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar-persona',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './registrar-persona.component.html',
  styleUrl: './registrar-persona.component.css',
})
export class RegistrarPersonaComponent {
  title = 'sigcon_frontend';
  personaArray: Persona[] = [];
  personaForm: FormGroup;
  isFormSubmitted: boolean = false;
  isEdited: boolean = false;
  page: number;
  offset: number;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private personaService: PersonaService
  ) {
    this.page = 1;
    this.offset = new Date().getTimezoneOffset();
    this.personaForm = new FormGroup({
      id_persona: new FormControl(''),
      apellido_paterno: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      apellido_materno: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      nombres: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      fecha_nacimiento: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.getPersonas();
  }

  getPersonas(): void {
    this.personaService.getPersonas().subscribe(
      (result: any) => {
        //console.log('Result', result);
        this.personaArray = result.data;
        //console.log(this.personaArray);
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia....',
          text: '!Ah ocurrido un error!',
        });
      }
    );
  }
  registrarPersona(): void {
    if (this.isEdited) {
      this.actualizarPersona();
    } //end if
    else {
      this.personaService.registrarPersona(this.personaForm.value).subscribe(
        (result: any) => {
          console.log(this.personaForm.value);
          this.personaForm.reset();
          this.getPersonas();
        },
        (err: any) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: 'Advertencia....',
            text: '!Ah ocurrido un error al registrar!',
          });
        }
      );
      Swal.close();
      Swal.fire({
        icon: 'success',
        title: 'registrarPersona....',
        text: '!Se registro exitosamente los datos de la persona!',
      });
    } //end else
  } //end registrarPersona

  actualizarPersona(): void {
    this.personaService.actualizarPersona(this.personaForm.value).subscribe(
      (result: any) => {
        console.log(this.personaForm.value);
        this.personaForm.reset();
        this.isEdited = false;
        this.getPersonas();
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia....',
          text: '!Ah ocurrido un error al actualizar!',
        });
      }
    );
    Swal.close();
    Swal.fire({
      icon: 'success',
      title: 'actualizarPersona....',
      text: '!Se registro exitosamente los datos de la persona!',
    });
  }

  cancelarRegistro() {
    this.personaForm.reset();
    Swal.close();
    Swal.fire({
      icon: 'success',
      title: 'cancelarRegistro....',
      text: '!Se cancelo el registro de la Persona!',
    });
  }

  eliminarPersona(persona: Persona): void {
    console.log('Result', persona);
    Swal.fire({
      title: 'Esta seguro de Eliminar la persona seleccionada?',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaService.eliminarPersona(persona).subscribe(
          (result: any) => {
            this.getPersonas();
          },
          (err: any) => {
            Swal.close();
            Swal.fire({
              icon: 'error',
              title: 'Advertencia...',
              text: '!Ah ocurrido un error al eliminar persona!',
            });
          }
        ); //end subscribe
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: '¡Eliminacion Exitosa! - eliminarPersona',
          text: '!Se elimino exitosamente los datos de la persona!',
        });
      } //end if
    });
  }

  editarPersona(persona: Persona): void {
    console.log('Result', persona);
    Swal.fire({
      title: 'Esta seguro de Editar los datos de la persona seleccionada?',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaForm.setValue({
          id_persona: persona.id_persona,
          apellido_paterno: persona.apellido_paterno,
          apellido_materno: persona.apellido_materno,
          nombres: persona.nombres,
          fecha_nacimiento: formatDate(
            persona.fecha_nacimiento,
            'yyyy-MM-dd',
            this.locale,
            'UTC' + this.offset
          ),
        });
        this.isEdited = true;
        console.log(
          'Result',
          formatDate(
            persona.fecha_nacimiento,
            'dd/MM/yyyy',
            this.locale,
            'UTC' + this.offset
          )
        );
        console.log('this.locale', this.locale);
      } //end if
    }); //end swal.fire
  }
}
