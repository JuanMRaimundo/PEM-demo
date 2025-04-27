import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material/material.module';
import { Planificacion } from '../../models/planificacion';
import { Ejercicio } from '../../models/ejercicio';

@Component({
  selector: 'app-planificaciones',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './planificaciones.component.html',
  styleUrl: './planificaciones.component.css',
})
export class PlanificacionesComponent {
  // Datos de ejemplo
  planificaciones: Planificacion[] = [
    {
      id: 1,
      objetivo: 'Fuerza en piernas',
      duracionSemanas: 4,
      semanaDelAnio: 25,
      ejercicios: [
        {
          id: 1,
          nombre: 'Sentadillas',
          descripcion: '3 series de 12 repeticiones',
          grupoMuscular: 'Piernas',
          dificultad: 'Media',
        },
      ],
      fechaCreacion: new Date('2024-06-01'),
    },
  ];

  displayedColumns: string[] = [
    'objetivo',
    'duracionSemanas',
    'semanaDelAnio',
    'ejercicios',
    'acciones',
  ];

  // Método para mostrar los ejercicios como string
  getEjerciciosNames(ejercicios: Ejercicio[]): string {
    return ejercicios.map((e) => e.nombre).join(', ');
  }
}
