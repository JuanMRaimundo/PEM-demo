import { Ejercicio } from './ejercicio';

export interface Planificacion {
  id: number;
  objetivo: string;
  duracion: number;
  ejercicios: Ejercicio[];
  fechaCreacion: Date;
}
