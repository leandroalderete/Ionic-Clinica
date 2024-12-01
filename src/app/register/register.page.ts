import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, CommonModule, FormsModule]
})
export class RegisterPage {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';
  

  constructor(private firestore: Firestore) {}

  // Método que se llama al enviar el formulario
  onSubmit() {
    if (this.firstName && this.lastName && this.email && this.password && this.confirmPassword) {
      if (this.password === this.confirmPassword) {

        const user: { name: string; surname: string; email: string; password: string } = {
          name: this.firstName,
          surname: this.lastName,
          email: this.email,
          password: this.password
        };

        this.saveUser(user)
   
      } else {
        console.log('Las contraseñas no coinciden.');
      }
    } else {
      console.log('Por favor, completa todos los campos.');
    }
  }


  async saveUser(user: { name: string; surname: string; email: string; password: string }) {
    try {
      // Creamos la referencia al documento en Firestore
      const userRef = doc(this.firestore, `users/${user.email}`);
      // Guardamos los datos del usuario
      await setDoc(userRef, {
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password, // Nota: Evitar almacenar contraseñas en texto plano
      });
      console.log('Usuario registrado con éxito en Firestore.');
    } catch (error) {
      console.error('Error añadiendo el documento: ', error);
    }
  }
}
