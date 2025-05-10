import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material/material.module';
import { Planificacion } from '../../models/planificacion';
import { Ejercicio } from '../../models/interfaces';
import {
  DialogConfig,
  GenericDialogComponent,
} from '../generic-dialog/generic-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-planificaciones',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './planificaciones.component.html',
  styleUrl: './planificaciones.component.css',
})
export class PlanificacionesComponent {
  ejerciciosDisponibles: Ejercicio[] = [
    { id: 1, nombre: 'Sentadillas', grupoMuscular: 'Cuádriceps' },
    { id: 2, nombre: 'Peso Muerto', grupoMuscular: 'Isquiosurales' },
    { id: 3, nombre: 'Press banca', grupoMuscular: 'Pecho' },
    { id: 4, nombre: 'Pantorrilas', grupoMuscular: 'Pantorrillas' },
  ];

  constructor(private dialog: MatDialog) {}

  planificaciones: Planificacion[] = [
    {
      id: 1,
      objetivo: 'Fuerza en piernas',
      duracion: 4,
      ejercicios: [
        {
          id: 1,
          nombre: 'Sentadillas',
          descripcion: '4 series de 8 repeticiones',
          grupoMuscular: 'Piernas',
          dificultad: 'Intermedio',
        },
        {
          id: 2,
          nombre: 'Peso muerto',
          descripcion: '4 series de 10 repeticiones',
          grupoMuscular: 'MMII',
          dificultad: 'Intermedio',
        },
      ],
      fechaCreacion: new Date('2024-06-01'),
    },
  ];

  displayedColumns: string[] = [
    'objetivo',
    'duracion',
    'ejercicios',
    'acciones',
  ];

  // Método para mostrar los ejercicios como string
  getEjerciciosNames(ejercicios: Ejercicio[]): string {
    return ejercicios.map((e) => e.nombre).join(', ');
  }
  openDialog(): void {
    const dialogConfig: DialogConfig = {
      title: 'Nueva Planificación',
      fields: [
        {
          name: 'objetivo',
          label: 'Objetivo',
          type: 'text',
          required: true,
        },
        {
          name: 'duracion',
          label: 'Duración (semanas)',
          type: 'number',
          required: true,
        },
        {
          name: 'ejercicios',
          label: 'Ejercicios',
          type: 'multiselect',
          options: this.ejerciciosDisponibles, // Array de ejercicios desde servicio
          optionLabel: 'nombre',
          required: true,
        },
      ],
    };

    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: dialogConfig,
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const nuevaPlanificacion: Planificacion = {
          id: Date.now(),
          ...result,
          fechaCreacion: new Date(),
        };
        this.planificaciones = [...this.planificaciones, nuevaPlanificacion];
      }
    });
  }
}
