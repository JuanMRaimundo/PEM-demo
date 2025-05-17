import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Atleta } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AtletaService {
  private atletas: Atleta[] = [];
  private ultimoId = 0;

  constructor() {}

  createAtleta(atleta: Omit<Atleta, 'id'>): Atleta {
    const nuevo: Atleta = {
      id: Date.now(),
      ...atleta,
      creadoEn: new Date(),
    };
    this.atletas.push(nuevo);
    return nuevo;
  }

  saveAtleta(atleta: any): Atleta {
    if (atleta.id) {
      return this.updateAtleta(atleta.id, atleta);
    } else {
      return this.createAtleta(atleta);
    }
  }

  getAtletaById(id: number): Atleta {
    const atleta = this.atletas.find((a) => a.id === id);
    if (!atleta) throw new Error(`Atleta con ID ${id} no encontrado`);
    return atleta;
  }

  updateAtleta(id: number, datosActualizados: Partial<Atleta>): Atleta {
    const index = this.atletas.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Atleta no encontrado');

    this.atletas[index] = {
      ...this.atletas[index],
      ...datosActualizados,
      actualizadoEn: new Date(),
    };

    return this.atletas[index];
  }

  getAtletas(): Atleta[] {
    return [...this.atletas];
  }
  deleteAtleta(id: number): void {
    this.atletas = this.atletas.filter((a) => a.id !== id);
  }
  isEmailUnique(email: string, excludeId?: number): boolean {
    return !this.atletas.some((a) => a.email === email && a.id !== excludeId);
  }
}
