import { Injectable } from '@angular/core';
import { MOCK_USERS } from '../mock-data';

@Injectable({ providedIn: 'root' })
export class AuthService {


  constructor() {
    const existingUser = localStorage.getItem('user');
    if (!existingUser && MOCK_USERS.length > 0) {
      localStorage.setItem('user', JSON.stringify(MOCK_USERS));
    }
  }


  login(username: string, password: string): boolean {
    const user = MOCK_USERS.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('token', '123');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') === '123';
  }
}
