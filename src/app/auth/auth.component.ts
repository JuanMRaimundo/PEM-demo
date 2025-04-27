import { Component, Inject } from '@angular/core';

import { AuthFormData } from '../core/models/auth-form-data';
import { CommonModule } from '@angular/common';
import { primeNgModule } from '../shared/primeNG/primeNg.module';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, primeNgModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  formData: AuthFormData = {
    email: '',
    password: '',
  };

  constructor(public data: AuthComponent) {
    this.formData, this.data;
  }
  onSubmit() {
    throw new Error('Method not implemented.');
  }
}
