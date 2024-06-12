import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrarPersonaComponent } from './registrar-persona/registrar-persona.component';
import { TestComponent } from './test/test.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, RegistrarPersonaComponent, TestComponent,RegistrarComponent],
})
export class AppComponent {
  title = 'SISVITA';
  formIsInvalid = true;
  testId = 'main-cta';
}
