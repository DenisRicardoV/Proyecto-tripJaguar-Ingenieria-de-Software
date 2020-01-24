import { Component, OnInit } from '@angular/core';
import { ToursService, Tour } from 'src/app/core/services/tours.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tours-list',
  templateUrl: './tours-list.component.html',
  styleUrls: ['./tours-list.component.css']
})
export class ToursListComponent implements OnInit {
  public tours = [];
  public URL_PUBLIC:string=environment.PUBLIC_FILE;

  constructor(
    private tourService:ToursService
  ) {

    this.tourService.getByAgency().then(data => {
      this.tours = data;
    }).catch(error => {

    });

  }

  ngOnInit() {
  }

}
