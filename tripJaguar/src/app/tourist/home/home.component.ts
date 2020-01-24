import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public URL_PUBLIC: string = environment.PUBLIC_FILE;
  public user: any;
  public mensaje: string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.getDataUserSession();
    this.mensaje = 'La cuenta no se encuentra activada, active la cuenta para poder disfrutar de descuento y ofertas';
  }

}
