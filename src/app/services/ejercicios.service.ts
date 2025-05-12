// src/app/services/ejercicio.service.ts
import { Injectable } from '@angular/core';
import { Ejercicio } from '../models/interfaces';

@Injectable({ providedIn: 'root' })
export class EjercicioService {
  private ejercicios: Ejercicio[] = [];
  private ultimoId = 0;
  private gruposMusculares = [
    'Cuádriceps',
    'Isquiosurales',
    'Pantorrillas',
    'Tripceps',
    'Biceps',
    'Espalda',
    'Pecho',
    'Core',
    'Full Body',
  ];

  create(ejercicio: Omit<Ejercicio, 'id'>): Ejercicio {
    const nuevo: Ejercicio = {
      id: ++this.ultimoId,
      ...ejercicio,
    };
    this.ejercicios.push(nuevo);
    return nuevo;
  }

  update(id: number, datos: Partial<Ejercicio>): Ejercicio {
    const index = this.ejercicios.findIndex((e) => e.id === id);
    this.ejercicios[index] = { ...this.ejercicios[index], ...datos };
    return this.ejercicios[index];
  }

  delete(id: number): void {
    const ejercicio = this.ejercicios.find((e) => e.id == id);
    if (!ejercicio) {
      throw new Error(`Ejercicio con ID ${id} no encontrado`);
    }
  }

  getAll(): Ejercicio[] {
    return [...this.ejercicios];
  }
  getEjercicioById(id: number): Ejercicio {
    const ejercicio = this.ejercicios.find((e) => e.id == id);
    if (!ejercicio) {
      throw new Error(`Ejercicio con ID ${id} no encontrado`);
    }
    return ejercicio;
  }

  getGruposMusculares(): string[] {
    return this.gruposMusculares;
  }
}
