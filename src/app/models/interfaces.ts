export interface PlanificacionGral {
  id: number;
  objetivo: string;
  duracionSemanas: number;
  semanaDelAnio: number;
  ejercicios: [];
  fechaCreacion: Date;
}

export interface PlanificacionDiaria {
  id: number;
  turno: 'MAÑANA' | 'TARDE';
  activacion: Activacion;
  ejercicios: Ejercicios;
}

export interface Activacion {}
export interface Principal {}
export interface Cierre {}

export interface Ejercicios {
  id: number;
  nombre: string;
  volumen: string;
}
