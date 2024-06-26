import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string): void {
    setCookie('token-app-mecanica', token, { expires: 365, path: '/' });
  }

  getToken(): string | null {
    const token = getCookie('token-app-mecanica');
    return token ? token : null;
  }

  removeToken(): void {
    removeCookie('token-app-mecanica');
  }
}
