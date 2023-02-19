import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { UserInfo } from '../types/userInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {};

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  login(userInfo: UserInfo): Observable<string | boolean> {
    if (userInfo.email === 'admin@gmail.com' && userInfo.password === 'admin123') {
      this.setToken('adminsToken');
      return of(true);
    } else {
      return throwError(() => new Error('Incorrect email or password!'));
    }
  }

  logout() {
    this.router.navigate(['login']);
  }
}
