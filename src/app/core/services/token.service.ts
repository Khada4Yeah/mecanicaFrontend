import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import * as jwt_decode from 'jwt-decode';
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

  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decodeToken = jwt_decode.jwtDecode<jwt_decode.JwtPayload>(token);
    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }
}
