import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';

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
  errorMessage: string = ''; // Variable para manejar el mensaje de error

  constructor(private router: Router, private firestore: Firestore) {}

  forgotPassword() {
    // Lógica para redirigir a la página de recuperación de contraseña
    console.log('Redirigiendo a la página de recuperación de contraseña...');
    this.router.navigate(['/forgot-password']); // Asegúrate de tener esta ruta configurada
  }

  navigateToRegister() {
    // Lógica para redirigir a la página de registro
    this.router.navigate(['/register']); // Asegúrate de tener la ruta '/register' configurada
  }

  onLogin() {
    this.getUserByEmailAndPassword(this.email, this.password);
  }

  // Método para obtener un usuario por correo y comparar la contraseña
  async getUserByEmailAndPassword(email: string, password: string) {
    try {
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, where('email', '==', email), where('password', '==', password)); // Comparar correo y contraseña
      const querySnapshot = await getDocs(q);
      const userData: any[] = [];
      
      querySnapshot.forEach((doc) => {
        userData.push(doc.data());
      });
      
      if (userData.length > 0) {
        this.saveToSessionStorage('user', userData[0]);
        this.router.navigate(['/chats']);
      } else {
        this.errorMessage = 'Usuario o contraseña inválidos'; // Mensaje de error si no se encuentra el usuario
      }
    } catch (e) {
      console.error('Error al obtener los datos del usuario: ', e);
      throw e;
    }
  }

  saveToSessionStorage(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));  // Usamos JSON.stringify para convertir cualquier objeto en string
  }
}
