export interface Atleta {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento?: Date;
  edad?: number;
  altura?: number;
  peso?: number;
  creadoEn?: Date;
  actualizadoEn?: Date;
}

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
  ejercicios: Ejercicio;
}

export interface Activacion {}
export interface Principal {}
export interface Cierre {}
export type Dificultad = 'Principiante' | 'Intermedio' | 'Avanzado';
export interface Ejercicio {
  id: number;
  nombre: string;
  descripcion?: string;
  grupoMuscular: string;
  dificultad?: Dificultad;
  equipamiento?: string[];
}
export interface DialogConfig {
  title: string;
  fields: DialogField[];
  model?: any;
}

export interface DialogField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'date';
  required?: boolean;
  options?: any[];
  optionLabel?: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'number';
  options?: any[];
  optionLabel?: string;
}
