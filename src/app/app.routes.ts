import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { TestComponent } from './test/test.component';
import { RegistrarPersonaComponent } from './registrar-persona/registrar-persona.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { HomePsychologistComponent } from './home-psychologist/home-psychologist.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { VerPersonasComponent } from './ver-personas/ver-personas.component';
import { VerResultadosComponent } from './ver-resultados/ver-resultados.component';
import { ObservacionComponent } from './observacion/observacion.component';
import { AgregarTestComponent } from './agregar-test/agregar-test.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home-psychologist', component: HomePsychologistComponent},
  { path: 'home-admin', component: HomeAdminComponent},
  { path: 'ver-personas', component: VerPersonasComponent},
  { path: 'ver-resultados', component: VerResultadosComponent},
  { path: 'observacion/:diagnosticoid', component: ObservacionComponent},
  { path: 'agregar-test', component: AgregarTestComponent},
  { path: 'registrar', component: RegistrarComponent },
  { path: 'test', component: TestComponent },
  { path: 'resultados', component: ResultadosComponent},
  { path: 'persona', component: RegistrarPersonaComponent},
  { path: '', component: LoginComponent },
  ];