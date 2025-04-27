import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { primeNgModule } from '../../shared/primeNG/primeNg.module';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, primeNgModule, NavbarComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
