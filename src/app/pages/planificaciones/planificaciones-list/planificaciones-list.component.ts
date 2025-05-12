import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/material/material.module';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import {
  DialogConfig,
  DialogField,
  Ejercicio,
  Planificacion,
} from '../../../models/interfaces';
import { PlanificacionService } from '../../../services/planificaciones.service';
import { EjercicioService } from '../../../services/ejercicios.service';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from '../../../components/generic-dialog/generic-dialog.component';

@Component({
  selector: 'app-planificaciones-list',
  standalone: true,
  imports: [MaterialModule, NavbarComponent],
  templateUrl: './planificaciones-list.component.html',
  styleUrl: './planificaciones-list.component.css',
})
export class PlanificacionesListComponent {
  displayedColumns: string[] = [
    'nombre',
    'objetivo',
    'duracion',
    'ejercicios',
    'acciones',
  ];
  dataSource: Planificacion[] = [];
  dialogFields!: DialogField[];

  constructor(
    private planificacionService: PlanificacionService,
    private ejercicioService: EjercicioService,
    public dialog: MatDialog
  ) {
    this.dialogFields = [
      {
        name: 'nombre',
        label: 'Nombre',
        type: 'text',
        required: true,
      },
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
        type: 'multiselect', // <- Tipo específico
        options: this.ejercicioService.getAll(),
        optionLabel: 'nombre',
        required: true,
      },
    ];
    this.loadPlanificaciones();
  }

  private loadPlanificaciones(): void {
    this.dataSource = this.planificacionService.getAll();
  }

  openDialog(planificacion?: Planificacion): void {
    const dialogConfig: DialogConfig = {
      title: planificacion ? 'Editar Planificación' : 'Nueva Planificación',
      fields: this.dialogFields,
      model: planificacion || {},
    };

    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: dialogConfig,
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const operacion = planificacion
          ? this.planificacionService.update(planificacion.id, result)
          : this.planificacionService.create(result);

        if (operacion) this.loadPlanificaciones();
      }
    });
  }

  onDelete(id: number): void {
    this.planificacionService.delete(id);
    this.loadPlanificaciones();
  }

  getEjerciciosNames(ejercicios: Ejercicio[]): string {
    return ejercicios.map((e) => e.nombre).join(', ');
  }
}
