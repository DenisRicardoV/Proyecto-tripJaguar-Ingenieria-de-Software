import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  conversionOutput:string;
  private clave = 'TripJaguar2018IngenieriaWEB1';

  constructor() { }

  encrypt(textToConvert:string): string {
    this.conversionOutput = CryptoJS.AES.encrypt(textToConvert.trim(), this.clave.trim()).toString();
    return this.conversionOutput;
  }

  desencrypt(textToConvert:string): string {
    this.conversionOutput = CryptoJS.AES.decrypt(textToConvert.trim(), this.clave.trim()).toString(CryptoJS.enc.Utf8);
    return this.conversionOutput;
  }


}
