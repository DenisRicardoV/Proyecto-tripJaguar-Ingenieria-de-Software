import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { CryptoService } from 'src/app/core/services/crypto.service';
import { HandleError, HttpErrorHandlerService } from 'src/app/core/services/http-error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class ReservarService {
  API:string = environment.API_ENDPOINT;
  url:string;

  private handleError: HandleError;

  constructor(
    private cryptoService:CryptoService,
    private http:HttpClient,
    httpErrorHandler: HttpErrorHandlerService
  ) {
    this.handleError = httpErrorHandler.createHandleError('ReservarService')

  }

  reservar(data){
    this.url = this.API + 'tour/reservar';
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(this.url,data).subscribe(res=>{
        resolve(res);
      },error=>{
        this.handleError('register Service',data);
        reject(error.error);
      })
    });
  }

  comprar(data){
    this.url = this.API + 'tour/comprar';

    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(this.url, data).subscribe(res => {
        resolve(res);
      }, error => {
        this.handleError('register Service',data);
        reject(error.error);
      });
    });
  }


}
