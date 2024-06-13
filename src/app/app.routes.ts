import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { TestComponent } from './test/test.component';
import { RegistrarPersonaComponent } from './registrar-persona/registrar-persona.component';
import { ResultadosComponent } from './resultados/resultados.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'test', component: TestComponent },
  { path: 'resultados', component: ResultadosComponent},
  { path: 'persona', component: RegistrarPersonaComponent},
  { path: '', component: LoginComponent },
  ];