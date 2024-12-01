import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private router: Router, ) {}

  forgotPassword() {
    // Lógica para redirigir a la página de recuperación de contraseña
    console.log('Redirigiendo a la página de recuperación de contraseña...');
    this.router.navigate(['/forgot-password']); // Asegúrate de tener esta ruta configurada
  }

  navigateToRegister() {
    // Lógica para redirigir a la página de registro
    this.router.navigate(['/register']); // Asegúrate de tener la ruta '/register' configurada
  }
}
