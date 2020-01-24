import { Component, OnInit } from '@angular/core';
import { ActividadesService } from 'src/app/core/services/actividades.service';
import { ToursService } from 'src/app/core/services/tours.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public showPieGrafico: boolean = false;
  public totalPaquetes: number = 0;
  public showLoading: boolean = false;

  title = 'app';
  public pieChartLabels:string[] = [];
  public pieChartData:number[] = [];
  public pieChartType:string = 'pie';







  constructor(
    private actividadService:ActividadesService,
    private serviceTour: ToursService


  ) {

    this.inicalizandoGraficoPie();
  }

  ngOnInit() {
  }

  inicalizandoGraficoPie(){

    this.showLoading = true;

    this.actividadService.getAll().subscribe(res => {

      for (let index = 0; index < res.length; index++) {
        this.pieChartLabels.push(res[index].descripcion);
      }

      this.incializamosVluesCero(this.pieChartLabels);
      this.serviceTour.getAllAPI().then(tours => {
        this.totalPaquetes = tours.length;
        for (let index = 0; index < tours.length; index++) {

            for (let j = 0; j < tours[index].actividades.length; j++) {

                var actividad =  tours[index].actividades[j];
                for (let k = 0; k < this.pieChartData.length; k++) {

                    if(this.pieChartLabels[k] === actividad.descripcion){
                      this.pieChartData[k] = this.pieChartData[k]  + 1;
                    }

                }
            }

        }
        this.showLoading = false;


        this.showPieGrafico = true;

      });


    });



  }

  incializamosVluesCero(array){
    for (let index = 0; index < array.length; index++) {
      this.pieChartData.push(0);
    }
  }


  //EVENTO PIE
   // events on slice click
  public chartClicked(e:any):void {
    console.log(e);
  }

 // event on pie chart slice hover
  public chartHovered(e:any):void {
    console.log(e);
  }


}
