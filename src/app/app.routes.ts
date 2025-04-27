import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { PlanificacionesComponent } from './components/planificaciones/planificaciones.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { EjerciciosComponent } from './components/ejercicios/ejercicios.component';

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
      { path: 'ejercicios', component: EjerciciosComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'configuracion', component: ConfiguracionComponent },
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
