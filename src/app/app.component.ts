import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrarPersonaComponent } from './registrar-persona/registrar-persona.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, RegistrarPersonaComponent],
})
export class AppComponent {
  title = 'angular-demo01-241D';
  formIsInvalid = true;
  testId = 'main-cta';
}
