import { Component, OnInit } from '@angular/core';
import { AgencyService } from 'src/app/core/services/agency.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public showLoading: boolean = true;
  public account:any;
  public cuentaForm: FormGroup;
  public submitted: boolean = false;
  public loading: boolean = false;
  public newAccount: any;
  public showProgress: boolean = false;
  public idAgencia : any;
  public IsmodelShow: boolean = false;
  public notifier: NotifierService;

  constructor(private serviceAgencia: AgencyService, notifierService: NotifierService
    ) {
    this.serviceAgencia.findAgency().then(data => {
      this.showLoading = false;
      this.account = data.account;
      this.idAgencia = data.id;
    }).catch(error =>{
      this.showLoading = false;
    });
    this.notifier = notifierService;


   }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
      this.cuentaForm = new FormGroup({
        'email': new FormControl('', [ Validators.required, Validators.email]),
        'transaction': new FormControl('', [ Validators.required])
      });
  }

  registrar() {
    this.showProgress = true;
    this.loading = true;
    this.serviceAgencia.registrarAccount(this.newAccount, this.idAgencia)
      .then(success => {
        this.showProgress = false;
        this.loading = false;
        this.cuentaForm.reset();
        this.submitted = false;
        this.notifier.notify('success', 'Se registró correctamente la cuenta');
        this.account = this.newAccount;


      }).catch(error => {
        this.showProgress = false;
        this.loading = false;
        this.submitted = false;
        this.cuentaForm.reset();
        this.notifier.notify('error', 'No se pudo registrar la cuenta');

      });

  }

  onSubmit() {

    this.submitted = true;
    if (this.cuentaForm.invalid) {
        return;
    }
    this.newAccount = Object.assign({}, this.cuentaForm.value);
    this.newAccount.type = 'paypal';

    this.registrar();
  }



}
