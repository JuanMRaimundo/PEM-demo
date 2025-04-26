import { Component } from '@angular/core';
import { primeNgModule } from '../../shared/primeNG/primeNg.module';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material/material.module';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [primeNgModule, CommonModule, MaterialModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  items = [
    {
      label: 'Planificaciones',
      icon: 'pi pi-calendar',
      routerLink: '/planificaciones',
    },
    {
      label: 'Ejercicios',
      icon: 'pi pi-database',
      routerLink: '/ejercicios',
    },
    {
      label: 'Perfil',
      icon: 'pi pi-user',
      routerLink: '/perfil',
    },
    {
      label: 'Documentación',
      icon: 'pi pi-book',
      url: 'https://tusitio.com/docs',
    },
  ];
}
