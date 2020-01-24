import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

export interface Departamento{
  nombre:string,
  img:string,
  numero_tours?:number
}

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private itemDoc: AngularFirestoreDocument<Departamento>;

  constructor(private db:AngularFirestore) { }

  public getAll(){
    return this.db.collection<Departamento>('departamentos').valueChanges();
  }
  public numTourPorDepartamento(departamento){
    return this.db.collection('tours',ref => ref.where('departamento', '==', departamento)).valueChanges();
  }

}
