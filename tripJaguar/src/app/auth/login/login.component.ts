import { Component, OnInit } from '@angular/core';



import { AuthService } from 'src/app/core/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NotifierService } from 'angular-notifier';
import { URLSearchParams } from 'url';
import { Login } from '../user';
import { CryptoService } from 'src/app/core/services/crypto.service';

import decode from 'jwt-decode';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: Login
  loginForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  message: string;
  returnUrl = '/';
  notifier: NotifierService;

  isReserva:boolean = false;
  reserva:any;

  constructor(
    private cryptoService:CryptoService,
    notifierService: NotifierService,
    private authService: AuthService,
    private router:Router

  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {

    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required,Validators.email]),
      'password':new FormControl('',[Validators.required])
    });
    this.reserva = JSON.parse(localStorage.getItem('reserva'));
    if(this.reserva){
      this.isReserva = true;
    }

  }
   // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login() {

    this.loading = true;
    this.authService.sesion(this.user)
      .then(succes => {
        this.message = 'Bienvenido, otra ves estas de vuelta!';
        this.notifier.notify( 'success', this.message + ' !' );
        localStorage.setItem('access_token', succes.token);

        if (this.isReserva) {
          this.router.navigate(['/turista/reservar/', this.reserva.idTour]);
        } else {
          this.router.navigate(['/']);
        }
      })
      .catch(error => {
        this.loading = false;
        this.message = 'Correo y Contraseña Invalidas';
        this.notifier.notify( 'error', this.message + '!' );
        this.reset();
     })


  }


  facebookLogin(){
    this.authService.loginWithFacebook().then(
      res=>{
        this.notifier.notify( 'success','Bienvenido '+ res );
        this.router.navigate(['/']);
      }
      ,error=>{
        this.notifier.notify( 'error',error.message );
      });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.user = Object.assign({}, this.loginForm.value);
    console.log('USER', this.user);
    this.login();

  }
  reset() {

    setTimeout(() => {
      if(this.message=="La Contraseña es Invalida"){
        this.loginForm.get('password').setValue('');
        return;
      }
      this.loginForm.reset();
    }, 500);

  }

}
