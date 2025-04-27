import { Ejercicio } from './ejercicio';

export interface Planificacion {
  id: number;
  objetivo: string;
  duracionSemanas: number;
  semanaDelAnio: number;
  ejercicios: Ejercicio[]; // Array de ejercicios vinculados
  fechaCreacion: Date;
}
