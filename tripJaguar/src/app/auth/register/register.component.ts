import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  URL_PUBLIC:string=environment.PUBLIC_FILE;


  constructor() { }

  ngOnInit() {
    localStorage.removeItem('filtro');
    localStorage.removeItem('reserva')
  }

}
