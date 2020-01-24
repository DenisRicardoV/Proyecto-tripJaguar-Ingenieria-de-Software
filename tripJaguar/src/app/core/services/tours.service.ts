import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';


import { Observable, from, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CryptoService } from 'src/app/core/services/crypto.service';
import { HandleError, HttpErrorHandlerService } from 'src/app/core/services/http-error-handler.service';
export interface Tour{
  uid:any,
  idAgency: any,
  nombre:string,
  precio: Float32Array,
  dias:Int16Array,
  horas:any,
  descripcion: [null],
  itinerario: [null],
  actividades: [null],
  notas?: [null],
  comentarios?: any,
  imagenes: [null]
}
const HttpUploadOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded' })
}

@Injectable({
  providedIn: 'root'
})
export class ToursService {
  API:string = environment.API_ENDPOINT;
  url:string;
  paquete: Observable<any>;

  private handleError: HandleError;
  private itemDoc: AngularFirestoreDocument<Tour>;

  constructor(
    private db:AngularFirestore,
    private cryptoService:CryptoService,
    private http:HttpClient,
    httpErrorHandler: HttpErrorHandlerService
  ) {
    this.handleError = httpErrorHandler.createHandleError('AuthService')
   }

  public registrar(tour){
    this.url = this.API + 'tour/registrar';

    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(this.url, tour).subscribe(res=>{
        resolve(res);
      }, error => {
        this.handleError('register Service',tour);
        reject(error.error);
      });
    });
  }

  public findById(id){
    return this.db.collection('tours').doc(id).snapshotChanges();
  }

  // public upload(files: File[],uidTour): {[key:string]:Observable<number>} {
  //   // this will be the our resulting map
  //   this.url = this.API+'agencia/upload';
  //   const status = {};

  //   files.forEach(file => {
  //     // create a new multipart-form for every file
  //     const formData: FormData = new FormData();
  //     formData.append('uidTour', uidTour);
  //     formData.append('file', file, file.name);


  //     // create a http-post request and pass the form
  //     // tell it to report the upload progress
  //     const req = new HttpRequest('POST', this.url, formData, {
  //       reportProgress: true
  //     });

  //     // create a new progress-subject for every file
  //     const progress = new Subject<number>();

  //     // send the http-request and subscribe for progress-updates
  //     this.http.request(req).subscribe(event => {
  //       if (event.type === HttpEventType.UploadProgress) {

  //         // calculate the progress percentage
  //         const percentDone = Math.round(100 * event.loaded / event.total);

  //         // pass the percentage into the progress-stream
  //         progress.next(percentDone);
  //       } else if (event instanceof HttpResponse) {

  //         // Close the progress-stream if we get an answer form the API
  //         // The upload is complete
  //         progress.complete();
  //       }
  //     });

  //     // Save every progress-observable in a map of all observables
  //     status[file.name] = {
  //       progress: progress.asObservable()
  //     };
  //   });

  //   // return the map of progress.observables
  //   return status;
  // }

  public upload(formData, id) {
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(this.API + 'tour/upload/' + id, formData).subscribe(res => {
        resolve(res);
      }, error => {
        this.handleError('register Service', '');
        reject(error.error);
      })
    });
  }

  verifyStock(){

  }

  public getAll(){
    return this.db.collection<Tour>('tours').valueChanges();
  }

  public getByUidAgency(cantPasajeros){
    this.url = this.API+'tours/verify/stock';

    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(this.url,cantPasajeros).subscribe(res=>{
        console.log('ress',res);

        resolve(res);
      },error=>{
        this.handleError('register Service',cantPasajeros);
        reject(error.error);
      })
    });
  }
  public getByAgency(){
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(this.API+ 'tour/agencia').subscribe(res => {
        resolve(res);
      },error=>{
        this.handleError('register Service', '');
        reject(error.error);
      })
    });
  }

  public getById(idTour){
    return this.db.collection<Tour>('tours').doc(idTour).valueChanges();
  }

  public getAllAPI() {
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(this.API + 'tour/all').subscribe(res => {
        resolve(res);
      }, error => {
        this.handleError('register Service', '');
        reject(error.error);
      });
    });
  }

  public getByFiltro(filtros){
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(this.API + 'tour/filtrar', filtros).subscribe(res => {
        resolve(res);
      }, error => {
        this.handleError('register Service', '');
        reject(error.error);
      })
    });
  }


}
