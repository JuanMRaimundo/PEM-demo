import { Injectable } from '@angular/core';
import { Planificacion } from '../models/planificacion';
import { Ejercicio } from '../models/ejercicio';
import { HttpClient } from '@angular/common/http'; // Para luego conectar con API
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlanificacionService {
  private apiUrl = 'https://tu-api.com/planificaciones'; // Cambiar por tu endpoint real

  // Mock temporal hasta tener la API
  private ejerciciosMock: Ejercicio[] = [
    {
      id: 1,
      nombre: 'Sentadillas',
      descripcion: '...',
      grupoMuscular: 'Piernas',
      dificultad: 'Media',
    },
    {
      id: 2,
      nombre: 'Peso muerto',
      descripcion: '...',
      grupoMuscular: 'MMII',
      dificultad: 'Media',
    },
  ];

  constructor(private http: HttpClient) {}

  getPlanificaciones(): Observable<Planificacion[]> {
    // return this.http.get<Planificacion[]>(this.apiUrl);
    return of([]); // Mock temporal
  }

  addPlanificacion(planificacion: Planificacion): Observable<Planificacion> {
    // return this.http.post<Planificacion>(this.apiUrl, planificacion);
    return of(planificacion); // Mock temporal
  }

  getEjercicios(): Observable<Ejercicio[]> {
    // return this.http.get<Ejercicio[]>(`${this.apiUrl}/ejercicios`);
    return of(this.ejerciciosMock); // Mock temporal
  }
}
