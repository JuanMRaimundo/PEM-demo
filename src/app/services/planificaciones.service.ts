import { Injectable } from '@angular/core';
import { Planificacion } from '../models/interfaces';
import { EjercicioService } from './ejercicios.service';

@Injectable({
  providedIn: 'root',
})
export class PlanificacionService {
  private apiUrl = 'https://tu-api.com/planificaciones'; // Cambiar por tu endpoint real
  private planificaciones: Planificacion[] = [];
  private ultimoId = 0;

  constructor(private ejercicioService: EjercicioService) {}

  getAll(): Planificacion[] {
    return this.planificaciones.map((p) => ({
      ...p,
      ejercicios: p.ejercicios.map(
        (ej) => this.ejercicioService.getEjercicioById(ej.id) || ej
      ),
    }));
  }

  create(
    planificacion: Omit<Planificacion, 'id' | 'fechaCreacion'>
  ): Planificacion {
    const nuevaPlanificacion: Planificacion = {
      id: ++this.ultimoId,
      ...planificacion,
      fechaCreacion: new Date(),
    };
    this.planificaciones.push(nuevaPlanificacion);
    return nuevaPlanificacion;
  }

  update(id: number, datos: Partial<Planificacion>): Planificacion | null {
    const index = this.planificaciones.findIndex((p) => p.id === id);
    if (index === -1) return null;

    this.planificaciones[index] = {
      ...this.planificaciones[index],
      ...datos,
    };

    return this.planificaciones[index];
  }

  delete(id: number): void {
    this.planificaciones = this.planificaciones.filter((p) => p.id !== id);
  }
}
