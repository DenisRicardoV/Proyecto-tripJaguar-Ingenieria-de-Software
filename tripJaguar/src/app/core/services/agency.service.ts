import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandlerService, HandleError } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  API:string = environment.API_ENDPOINT;
  private handleError: HandleError;

  constructor(private db:AngularFirestore,
    private http:HttpClient,
    httpErrorHandler: HttpErrorHandlerService) { }

  public findIdTransactionById(id){

    return new Promise<any>((resolve, reject) => {

      this.http.post<any>(this.API+'agencia/transaction',{id}).subscribe(res=>{
        resolve(res);
      },error=>{
        reject(error.error);
      })
    });
  }

  public verifyAccount(){
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(this.API + 'agencia/verify-acount').subscribe( res => {
        resolve(res);
      }, error => {
        reject(error.error);
      });

    });
  }

  public registrarAccount(account, id){
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(this.API + 'agencia/account/registrar', {account, id}).subscribe( res => {
        resolve(res);
      }, error => {
        reject(error.error);
      });

    });
  }

  public findAgency(){
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(this.API + 'agencia/single').subscribe( res => {
        resolve(res);
      }, error => {
        reject(error.error);
      });

    });
  }

  public findReservasForTurista(idTurist){

    return new Promise<any>((resolve, reject) => {

      this.http.get<any>(this.API+'reserva/turista').subscribe(res=>{
          resolve(res);
        }, error => {
          reject(error.error);
        })
      });
  }

  addLogo(file, id){
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(this.API + 'agencia/logo/registrar/upload/'+ id , file).subscribe( res => {
        resolve(res);
      }, error => {
        reject(error.error);
      });

    });

  }


}
