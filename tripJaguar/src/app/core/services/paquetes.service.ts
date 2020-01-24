import { Injectable } from '@angular/core';

import { Observable, from } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

export interface Paquete{
  idPaquete:any,
  idAgencia: any,
  nombre:string,
  precio: Float32Array,
  duracion: string,
  descripcion: [null],
  itenerario: [null],
  actividades: [null],
  notas: [null],
  comentarios: [null],
  imagenes: [null]
}

@Injectable({
  providedIn: 'root'
})

export class PaquetesService {
  paquete: Observable<any>;
  private itemDoc: AngularFirestoreDocument<Paquete>;

  constructor(
    private db:AngularFirestore
  ) { }

  public getPaquetes(){ 
    return this.db.collection<Paquete>('paquetes').valueChanges();
  }

  public getById(idPaquete){
    //return this.db.collection('paquetes').doc(idPaquete).valueChanges();
  }


}
