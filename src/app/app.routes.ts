import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { PlanificacionesComponent } from './components/planificaciones/planificaciones.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { AtletasListComponent } from './pages/atletas/atletas-list/atletas-list.component';
import { EjerciciosListComponent } from './pages/ejercicios/ejercicios-list/ejercicios-list.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'planificaciones', component: PlanificacionesComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'configuracion', component: ConfiguracionComponent },
    ],
  },
  { path: 'atletas', component: AtletasListComponent },
  {
    path: 'ejercicios',
    component: EjerciciosListComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
