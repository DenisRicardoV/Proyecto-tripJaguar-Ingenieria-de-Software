import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CryptoService } from 'src/app/core/services/crypto.service';
import { HandleError, HttpErrorHandlerService } from 'src/app/core/services/http-error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class RegisterDetailService {
  API:string = environment.API_ENDPOINT;
  url:string;

  private handleError: HandleError;

  constructor(
    private cryptoService:CryptoService,
    private http:HttpClient,
    httpErrorHandler: HttpErrorHandlerService
  ) {
    this.handleError = httpErrorHandler.createHandleError('AuthService')
  }

  registerViajero(viajero){
    this.url = this.API + 'auth/turista/registrar';
    viajero.password = this.cryptoService.encrypt(viajero.password);
    console.log('password registrar', viajero.password);

    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(this.url, viajero).subscribe(res => {
        resolve(res);
      }, error => {
        this.handleError('register Service',viajero);
        reject(error.error);
      })
    });


  }

  registerAgencia(representante, empresa) {
    this.url = this.API+'auth/agencia/registrar';
    representante.password = this.cryptoService.encrypt(representante.password);
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(this.url, {representante, empresa}).subscribe(res => {
        resolve(res);
      }, error => {
        this.handleError('register Service', empresa);
        reject(error.error);
      })
    });

  }




}
