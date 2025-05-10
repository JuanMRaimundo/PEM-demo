import { Ejercicio } from './interfaces';

export interface Planificacion {
  id: number;
  objetivo: string;
  duracion: number;
  ejercicios: Ejercicio[];
  fechaCreacion: Date;
}
