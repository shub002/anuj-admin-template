// src/app/shared/services/auth.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://your-api.com/auth'; // Replace with your backend endpoint
  private isBrowser: boolean;

  private loggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.checkInitialAuth();
  }

  /** Attempt login */
  login(username: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap((res) => {
          if (res.token && this.isBrowser) {
            localStorage.setItem('auth_token', res.token);
            this.loggedIn$.next(true);
          }
        })
      );
  }

  /** Logout user */
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('auth_token');
    }
    this.loggedIn$.next(false);
  }

  /** Get current login status as Observable */
  isAuthenticated$(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  /** Get token (if exists) */
  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  /** Check if logged in on init */
  private checkInitialAuth(): void {
    if (this.isBrowser && localStorage.getItem('auth_token')) {
      this.loggedIn$.next(true);
    }
  }
}
