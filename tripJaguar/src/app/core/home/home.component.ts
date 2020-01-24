import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { DepartamentoService } from '../services/departamento.service';
import { environment } from 'src/environments/environment';
import { ActividadesService } from '../services/actividades.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  URL_PUBLIC:string=environment.PUBLIC_FILE;
  paquetes:any
  actividades:any;
  departamentos=[];


  constructor(
    private homeservice: HomeService,
    private departamentoService: DepartamentoService,
    private actividadService:ActividadesService,
    private router: Router

  ) {

    localStorage.removeItem('filtro');
    localStorage.removeItem('reserva');

    this.actividadService.getAll().subscribe(res=>{
      this.actividades = res;
    })

  }

  async ngOnInit() {
    await this.departamentoService.getAll().subscribe(res =>{
      for (let index = 0; index < res.length; index++) {
          this.departamentoService.numTourPorDepartamento(res[index].nombre).subscribe(tour=>{
            res[index].numero_tours = tour.length;
            this.departamentos.push(res[index]);
          });
      };
    });
  }

  clickActividad(actividad){
    localStorage.setItem('filtro',JSON.stringify({actividad}));
    this.router.navigate(['tours/filtrar']);
  }

  clickRegion(region){
    localStorage.setItem('filtro',JSON.stringify({region}));
    this.router.navigate(['tours/filtrar']);
  }


}
