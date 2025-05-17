import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { primeNgModule } from '../../shared/primeNG/primeNg.module';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../shared/material/material.module';
import { PlanificacionService } from '../../services/planificaciones.service';
import { AtletaService } from '../../services/atletas.service';
import { EjercicioService } from '../../services/ejercicios.service';
import { MatDialog } from '@angular/material/dialog';
import {
  DialogConfig,
  GenericDialogComponent,
} from '../../components/generic-dialog/generic-dialog.component';
import { DialogField } from '../../models/interfaces';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MaterialModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  ultimoAcceso = new Date();

  // Datos mockeados (reemplazar con llamadas a servicios)
  planificacionesActivas = 3;
  totalAtletas = 15;
  atletasActivos = 8;
  totalEjercicios = 45;
  nuevosEjercicios = 5;

  ultimasPlanificaciones = [
    {
      nombre: 'Fuerza Máxima',
      objetivo: 'Aumento de carga en levantamientos básicos',
      duracion: 8,
      fecha: new Date('2024-03-15'),
    },
    {
      nombre: 'Hipertrofia',
      objetivo: 'Ganancia muscular general',
      duracion: 6,
      fecha: new Date('2024-03-10'),
    },
  ];

  constructor(
    public dialog: MatDialog,
    private planificacionService: PlanificacionService,
    private atletaService: AtletaService,
    private ejercicioService: EjercicioService,
    private router: Router
  ) {}

  // Métodos para cargar datos reales (ejemplo)
  ngOnInit() {
    /*this.planificacionService.getPlanificacionesActivas().subscribe(
      data => this.planificacionesActivas = data.length
    );*/
  }
  openAtletaDialog(): void {
    const dialogConfig: DialogConfig = {
      title: 'Nuevo Atleta',
      fields: this.getAtletaFields(),
    };

    this.openGenericDialog(dialogConfig, 'atleta');
  }

  // Método para Agregar Ejercicio
  openEjercicioDialog(): void {
    const dialogConfig: DialogConfig = {
      title: 'Nuevo Ejercicio',
      fields: this.getEjercicioFields(),
    };

    this.openGenericDialog(dialogConfig, 'ejercicio');
  }

  // Método para Nueva Planificación
  openPlanificacionDialog(): void {
    const dialogConfig: DialogConfig = {
      title: 'Nueva Planificación',
      fields: this.getPlanificacionFields(),
    };

    this.openGenericDialog(dialogConfig, 'planificacion');
  }

  private getAtletaFields(): DialogField[] {
    return [
      { name: 'nombre', label: 'Nombre', type: 'text', required: true },
      { name: 'apellido', label: 'Apellido', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'text', required: true },
    ];
  }

  private getEjercicioFields(): DialogField[] {
    return [
      { name: 'nombre', label: 'Nombre', type: 'text', required: true },
      {
        name: 'grupoMuscular',
        label: 'Grupo Muscular',
        type: 'text',
        required: true,
      },
    ];
  }

  private getPlanificacionFields(): DialogField[] {
    return [
      { name: 'nombre', label: 'Nombre', type: 'text', required: true },
      { name: 'objetivo', label: 'Objetivo', type: 'text', required: true },
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
        options: this.ejercicioService.getAll(),
        optionLabel: 'nombre',
        required: true,
      },
    ];
  }

  private openGenericDialog(config: DialogConfig, tipo: string): void {
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: config,
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        switch (tipo) {
          case 'atleta':
            this.atletaService.createAtleta(result);
            this.router.navigate(['/atletas']);
            break;
          case 'ejercicio':
            this.ejercicioService.create(result);
            this.router.navigate(['/ejercicios']);
            break;
          case 'planificacion':
            this.planificacionService.create(result);
            this.router.navigate(['/planificaciones']);
            break;
        }
      }
    });
  }
}
