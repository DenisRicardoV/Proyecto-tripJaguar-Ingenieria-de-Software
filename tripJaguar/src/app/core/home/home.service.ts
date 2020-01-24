import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable, of, from } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PaquetesService, Paquete } from '../services/paquetes.service';
import { ActividadesService, Actividad } from '../services/actividades.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  paquetes$:Observable<Paquete[]>;
  actvidades$:Observable<Actividad[]>;

  actividades:Actividad[] = [];

  constructor(
    private db: AngularFirestore,
    private paquetesService:PaquetesService,
    private actividadService:ActividadesService
    ){
      //this.actvidades$ = this.actividadService.getAll();

      this.actividadService.getAll().subscribe(res=>{
        this.actividades = res;
      })

      this.paquetes$ = this.paquetesService.getPaquetes();

   }

  filterActividades():Observable<any>{
    // this.actvidades$.subscribe();
    // this.actvidades$.forEach(actividad=>{
    //   console.log('ACTIVIDAD',actividad);
    // })

    return from(this.actividades)
      .pipe(
        map(n => console.log('NN::::',n))
      );
    // console.log('Actividades', this.actividades);
    // console.log('ACTIIDA');
    // return new Observable<Actividad>()
    // return new Observable<Actividad>((observer) => {


    //     return {unsubscribe() { this.actividades }};
    // });


  }

  countActividades(){
    this.actividades.push({descripcion:'aaa'});
    // this.actvidades$.forEach(actividad=>{
    //   console.log('ACTIVIDAD',actividad);
    // })
    //     this.paquetes$.pipe(
    //   map( (paquete:Paquete )=>{
    //     console.log(paquete.nombre);
    //   })
    // );

    //   // .subscribe((paquete)=>{
    //   //   console.log(paquete);
    //   // },error =>{

    //   // }
    // );

  }


}
