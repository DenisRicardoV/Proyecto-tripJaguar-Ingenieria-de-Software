import { Component, OnInit } from '@angular/core';
import { AgencyService } from 'src/app/core/services/agency.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  panelOpenState = false;
  reservas = [];

  constructor(private serviceAgency:AgencyService, private authService:AuthService) { }

  ngOnInit() {
    var user = this.authService.getDataUserSession();

    this.serviceAgency.findReservasForTurista(user.uid).then(data => {
      console.log("RESERVAS", data);
      this.reservas = data;
    }).catch(error =>{
      console.log("ERROR", error);
    });
  }

}
