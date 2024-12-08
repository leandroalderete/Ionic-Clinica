import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'holamundo',
    loadComponent: () => import('./holamundo/holamundo.page').then( m => m.HolamundoPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'chats',
    loadComponent: () => import('./chats/chats.page').then( m => m.ChatsPage)
  },
];
