import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Firestore, addDoc, collection, onSnapshot, orderBy, query } from '@angular/fire/firestore';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ChatsPage implements OnInit, OnDestroy {
  userMessage = ''; // Mensaje que el usuario va a enviar
  messages: any[] = []; // Lista de mensajes del chat
  currentUserId: string = '';
  user: string = '';
  private unsubscribe: any; // Para guardar la referencia al listener y poder detenerlo
  private audio: HTMLAudioElement; // Reproductor de sonido

  constructor(private firestore: Firestore) {
    const userData = this.getFromSessionStorage('user');
    if (userData) {
      this.currentUserId = userData.email;
      this.user = `${userData.name} ${userData.surname}`;
    }

    // Inicializar el reproductor de audio
    this.audio = new Audio('assets/sonidos/sonido.mp3');
  }

  ngOnInit() {
    this.listenToMessages(); // Activar el listener al cargar el componente
  }

  ngOnDestroy() {
    // Desactivar el listener al destruir el componente
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  // Listener para obtener los mensajes en tiempo real
  listenToMessages() {
    const messagesRef = collection(this.firestore, 'chatMessages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));
    this.unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages: any[] = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });

      // Reproducir sonido solo si hay nuevos mensajes
      if (messages.length > this.messages.length) {
        this.playNotificationSound();
      }

      this.messages = messages; // Actualizamos la lista de mensajes
    });
  }

  // Método para reproducir el sonido de notificación
  playNotificationSound() {
    this.audio.play().catch((error) => {
      console.error('Error reproduciendo el sonido: ', error);
    });
  }

  // Método para enviar un mensaje
  async sendMessage() {
    if (this.userMessage.trim() !== '') {
      await this.sendMessageService(this.userMessage);
      this.userMessage = ''; // Limpiar el campo de texto
    }
  }

  // Método para manejar eventos de teclado
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage(); // Llamar al método de envío de mensaje
    }
  }

  // Método para guardar un mensaje
  async sendMessageService(message: string) {
    try {
      await addDoc(collection(this.firestore, 'chatMessages'), {
        text: message,
        timestamp: new Date().getTime(), // Timestamp para ordenar los mensajes
        senderId: this.currentUserId, // Guardar el ID del remitente
        user: this.user,
      });
      console.log('Mensaje enviado correctamente');
    } catch (e) {
      console.error('Error enviando el mensaje: ', e);
    }
  }

  getFromSessionStorage(key: string): any {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null; // Convertir el string de vuelta a objeto
  }
}
