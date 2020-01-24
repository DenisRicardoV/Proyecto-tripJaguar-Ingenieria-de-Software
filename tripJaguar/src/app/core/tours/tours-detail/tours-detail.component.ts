import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tour, ToursService } from '../../services/tours.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap, debounceTime, map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tours-detail',
  templateUrl: './tours-detail.component.html',
  styleUrls: ['./tours-detail.component.css']
})
export class ToursDetailComponent implements OnInit {
  public srcSeleccionado: string;
  URL_PUBLIC: string = environment.PUBLIC_FILE;

  tour$: Observable<any>;
  inputTotal:number=0;
  uid:any;
  reservaForm: FormGroup;


  totalField: FormControl;
  submitted:boolean= false;

  total:number;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ToursService,
    private authService: AuthService
  ) {


  }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('id');

    this.tour$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getById(params.get('id') )
      )
    );

    this.tour$.subscribe(data => {
      this.seleccionarImage(data.images[0]);
    });



    this.createForm();
    localStorage.removeItem('filtro');
    localStorage.removeItem('reserva');

  }

  createForm(){

    this.reservaForm = new FormGroup({
      'cantidad': new FormControl(null,[Validators.required,Validators.min(1)]),
      'fecha': new FormControl(null,[Validators.required]),
    });

  }

  onSubmit(){
    this.submitted= true;
    if (this.reservaForm.invalid) {
      return;
    }

    var aux:any;
    aux = Object.assign({}, this.reservaForm.value);
    aux.idTour = this.uid;
    localStorage.setItem('reserva',JSON.stringify(aux));

    if(this.authService.isAuthenticated()){
      this.router.navigate(['turista/reservar',this.uid]);
    }else{
      this.router.navigate(['login'])
    };

  }

  verifReserva(){

    localStorage.setItem('cantidadPasajero',String(this.inputTotal) );
    // localStorage.setItem('fecha',String(this.inputTotal) );
    this.router.navigate(['turista/reservar',this.uid])

  }


  seleccionarImage(src){
    this.srcSeleccionado = src;
  }


}
