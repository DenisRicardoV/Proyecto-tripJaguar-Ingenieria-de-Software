import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }
  
  handleError(error:HttpErrorResponse ){
    if(error.error){
      //problema de la red
      console.error('An error ocurred:',error.error.message);
    }else{
      //problema del servidor
      console.error(
        `Backend returned code ${error.status}`+
        `body was: ${error.error}`);
    }

    //retornar un observable with a user-fqcing error message
    return throwError(
      'Something bad happened; please try again later.'
    )

  }
}
