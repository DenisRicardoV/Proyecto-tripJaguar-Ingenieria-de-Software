import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActividadesService } from '../../services/actividades.service';
import { DepartamentoService } from '../../services/departamento.service';
import { ToursService } from '../../services/tours.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public URL_PUBLIC: string = environment.PUBLIC_FILE;
  public actividades = [];
  public departamentos = [];
  public selectedDepartamento: string = '';
  public selectedActividad: string = '';
  public showLoading: boolean = true;

  public paquetes = [];



  constructor(
    private actividadService:ActividadesService,
    private departamentoService: DepartamentoService,
    private serviceTour: ToursService

    ) { }

  ngOnInit() {
    this.actividadService.getAll().subscribe(res => {
      this.actividades = res;
    });

    this.departamentoService.getAll().subscribe(res => {
      this.departamentos = res;
    });
    let filtro: any = JSON.parse(localStorage.getItem('filtro'));

    if  (filtro)  {
        this.selectedActividad = filtro.actividad;
        this.selectedDepartamento =  filtro.region;
    }



    this.filtrar();
  }

  filtrar(){
    localStorage.setItem('filtro',JSON.stringify({actividad: this.selectedActividad, region: this.selectedDepartamento}));
    this.showLoading = true;

    if(this.selectedActividad  || this.selectedDepartamento){
        let filtro = {
          departamento: this.selectedDepartamento,
          actividad: this.selectedActividad
        }
        this.serviceTour.getByFiltro(filtro).then(data => {
          this.showLoading = false;
          this.paquetes = data;

        }).catch(error => {
          this.paquetes = [];
          this.showLoading = false;
        });
    } else {
      this.serviceTour.getAllAPI().then(res => {
        this.showLoading = false;
        this.paquetes = res;
      }).catch(error => {
        this.paquetes = [];
        this.showLoading = false;
      });
    }

  }

  resetearFiltro(){
    this.selectedActividad = '';
    this.selectedDepartamento = '';

    this.filtrar();
  }


}
