import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

import { Observable, from } from 'rxjs';

export interface Actividad{
  descripcion:string,
  count?:Int32Array
}

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  private itemDoc: AngularFirestoreDocument<Actividad>;

  constructor(
    private db:AngularFirestore
  ) { }

  public getAll(){ 
    return this.db.collection<Actividad>('actividades').valueChanges();
  }

}
