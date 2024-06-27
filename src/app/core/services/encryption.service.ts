import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private secretKey = 'A@v3ry$3cr3tK3y';

  encrypt(value: string): string {
    const encrypted = CryptoJS.AES.encrypt(value, this.secretKey).toString();
    return encodeURIComponent(encrypted);
  }

  decrypt(encryptedValue: string): string {
    const decodedValue = decodeURIComponent(encryptedValue);
    const bytes = CryptoJS.AES.decrypt(decodedValue, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
