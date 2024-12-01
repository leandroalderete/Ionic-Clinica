import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IonicModule } from '@ionic/angular'; // Importa IonicModule para usar componentes de Ionic
import { FormsModule } from '@angular/forms'; // Importa FormsModule para usar ngModel
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true, // Especifica que es un standalone component
  imports: [CommonModule, IonicModule, FormsModule,], // Asegúrate de incluir CommonModule
})
export class LoginPage {
  email = '';
  password = '';

}
