import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AgencyService } from 'src/app/core/services/agency.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public URL_PUBLIC:string=environment.PUBLIC_FILE;
  public user: any;
  public mensaje: string;
  public agencia: any = {logo:null};

  constructor(  private auth: AuthService, private serviceAgencia: AgencyService) { }

  ngOnInit() {
    this.user = this.auth.getDataUserSession();
    this.mensaje = 'La cuenta no se encuentra activada, active la cuenta para poder iniciar a Promocionar tu Empresa';

    this.serviceAgencia.findAgency().then(data => {
      this.agencia = data;
    });
  }

  generateurl(agencia){
    return agencia.logo ? agencia.logo : 'agencia-empty.jpg';
  }



}
