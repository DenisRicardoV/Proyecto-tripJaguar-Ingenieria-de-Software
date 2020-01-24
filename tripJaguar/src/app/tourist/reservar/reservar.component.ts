import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotifierService } from 'angular-notifier';
import { ReservarService } from './reservar.service';
import { AgencyService } from 'src/app/core/services/agency.service';
import { ToursService } from 'src/app/core/services/tours.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {
  public URL_PUBLIC: string = environment.PUBLIC_FILE;

  isLinear = false;
  submitted:boolean = false;
  isFormTurista:boolean = true;
  notifier: NotifierService;
  public showLoading: boolean = true;

  public showProgress: boolean = false;


  formTurista:FormGroup;
  tourSelected:any;
  total:number= 0;
  reserva:any;

  private turista:any;
  private tarjeta:{};
  idTransaction:any;



  constructor(
    notifierService: NotifierService,
    private _formBuilder: FormBuilder,
    private auth: AuthService,
    private reservarService: ReservarService,
    private agencyService: AgencyService,
    private tourService: ToursService,
    private router: Router
  ) {
    this.createFormTurist();
    this.notifier = notifierService;
    localStorage.removeItem('filtro');
    this.reserva = JSON.parse(localStorage.getItem('reserva'));
    this.turista = this.auth.getDataUserSession();
    if(!this.reserva) {
      this.router.navigate(['/tours/filtrar']);
    }

    this.formTurista.get('name').setValue( this.turista.name);
    this.formTurista.get('name').disable();
    this.formTurista.get('email').setValue(this.turista.email);
    this.formTurista.get('email').disable();



    this.tourService.findById(this.reserva.idTour).subscribe(sucess => {

      this.tourSelected = sucess.payload.data();
      this.total = this.reserva.cantidad * this.tourSelected.precio;

        this.agencyService.findIdTransactionById(this.tourSelected.agency.id).then(res => {
          this.idTransaction = res.transaction;
          this.showLoading = false;
        });
    });



  }



  ngOnInit() {
  }

  createFormTurist(){
    this.formTurista = new FormGroup({
      'name': new FormControl('',[Validators.required]),
      'email': new FormControl('',[Validators.required, Validators.email]),
      'numero': new FormControl('',[Validators.required,Validators.minLength(8)]),
      'document': new FormControl('',[Validators.required]),
      'phone': new FormControl('',[Validators.required,Validators.minLength(9), Validators.maxLength(9)]),
      'city': new FormControl(null,[Validators.required]),
      'address': new FormControl('',[Validators.required])
    });
  }




  reservarTours(){

    let request = this.getRequest();
    request.status = 'reserved';

    this.showProgress = true;
    this.reservarService.reservar(request)
      .then(succes => {
        this.formTurista.reset();
        localStorage.removeItem('reserva');
        this.showProgress = false;

        var mensaje = '!Felicidades se realizó su reserva de forma correcta, se le envió un email a su correo con los datos de su reserva';
        this.notifier.notify('success', mensaje);
        this.notifier.notify('success', ' Se le esta redireccionando a la vista princpial');
        setTimeout(() => {
          this.router.navigate(['/turista/reservas']);
        }, 5000);

      }).catch(error => {
        this.showProgress = false;

        this.notifier.notify('error', 'Ocurrió un problema al registrar su reserva, intentlo de nuevo mas tarde');
      });

  }



  buyProduct(payment){
    this.comprarPaquete(payment);
  }

  comprarPaquete(payment) {
    var request = this.getRequest();
    request.payment = payment;
    request.status = 'canceled';


    this.reservarService.comprar(request).then(success => {
      this.formTurista.reset();
      localStorage.removeItem('reserva');

      this.notifier.notify('success', 'Su compra se realizó con éxito, se le envió un email a su correo con los datos de su compra');
      this.notifier.notify('success', ' Se le esta redireccionando a la vista princpial');


      setTimeout(() => {
        this.router.navigate(['/turista/reservas']);
      }, 5000);

    }).catch(error => {
      this.notifier.notify('error', 'Ocurrió un problema al registrar su compra, intentlo de nuevo mas atrde');

    });




  }

  getRequest(){

    var aux = Object.assign({}, this.formTurista.value);
    var type = aux.document;
    aux.document = {
      type,
      numero: aux.numero
    }

    var data = {
      create:  new Date(),
      fecha: this.reserva.fecha,
      numeroPersonas: this.reserva.cantidad,
      idTurista: this.turista.uid,
      turista:  aux,
      idTour: this.reserva.idTour,
      tour: this.tourSelected,
      monto: this.total,
      payment: null,
      status: null
    };

    return data;
  }



}
