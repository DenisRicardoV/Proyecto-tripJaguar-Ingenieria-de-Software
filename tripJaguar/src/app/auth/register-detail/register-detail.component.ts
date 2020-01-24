import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,ParamMap, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

import { RegisterDetailService } from './register-detail.service';
import { Viajero,Representante, Empresa } from '../user';
import { environment } from 'src/environments/environment';
import { AgencyService } from 'src/app/core/services/agency.service';

function passwordMatchValidator(password: string): ValidatorFn {
  return (control: FormControl) => {
    console.log(control)
    if (!control || !control.parent) {
      return null;
    }
    return control.parent.get(password).value === control.value ? null : { mismatch: true };
  };
}


@Component({
  selector: 'app-register-detail',
  templateUrl: './register-detail.component.html',
  styleUrls: ['./register-detail.component.css']
})
export class RegisterDetailComponent implements OnInit {
  URL_PUBLIC:string=environment.PUBLIC_FILE;

  option:string;
  message: string;
  notifier: NotifierService;
  registerForm: FormGroup;
  viajeroForm:FormGroup;
  representanteForm:FormGroup;
  empresaForm:FormGroup;
  viajero: Viajero;
  representante:Representante;
  empresa:Empresa;
  logo: any;

  passConfirm:boolean=false;
  submitted:boolean = false;
  showProgress: boolean = false;

  constructor(
    notifierService: NotifierService,
    private router: Router,
    private route: ActivatedRoute,
    private registerService: RegisterDetailService,
    private serviceAgencia: AgencyService
  ) {this.notifier = notifierService; }

  ngOnInit() {
    this.option = this.route.snapshot.paramMap.get('option');

    this.createForm();
    localStorage.removeItem('filtro');
    localStorage.removeItem('reserva')
  }

  createForm(){
    this.viajeroForm = new FormGroup({
      'name': new FormControl('',[Validators.required]),
      'lastname': new FormControl('',[Validators.required]),
      'country': new FormControl('',[Validators.required]),
      'email': new FormControl('',[Validators.required,Validators.email]),
      'password': new FormControl('',[Validators.required]),
      'confirmPassword': new FormControl('',[Validators.required, passwordMatchValidator('password')]),
      'accept': new FormControl('',[Validators.requiredTrue]),
    });

    this.representanteForm = new FormGroup({
      'document': new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
      'name': new FormControl('',[Validators.required]),
      'lastname': new FormControl('',[Validators.required]),
      'email': new FormControl('',[Validators.required,Validators.email]),
      'password': new FormControl('',[Validators.required]),
      'confirmPassword': new FormControl('',[Validators.required, passwordMatchValidator('password')])
    });

    this.empresaForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'businessName': new FormControl('', [Validators.required]),
      'ruc': new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      'phone': new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      'web': new FormControl('',[]),
      'address': new FormControl('', [Validators.required]),
      'region': new FormControl('', [Validators.required]),
      'logo': new FormControl('', [Validators.required]),
      'accept': new FormControl('', [Validators.requiredTrue])
    });


  }

  // convenience getter for easy access to form fields
  get f() { return this.viajeroForm.controls; }
  get group2() { return this.representanteForm.controls; }
  get group3() { return this.empresaForm.controls; }

  registerViajero(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.viajeroForm.invalid) {
      return;
    }

    var aux = Object.assign({}, this.viajeroForm.value);
    delete aux.confirmPassword;
    this.viajero = aux;
    this.showProgress = true;

    this.registerService.registerViajero(this.viajero)
      .then(succes => {
        this.notificar('success', succes.message);
        this.viajeroForm.reset();
        this.submitted = false;
        this.showProgress = false;
      })
      .catch(error => {
        this.showProgress = false;
        if (error.error === 'Not Authorization') {
          this.notificar('error', error.message);
          this.resetForm1();
        } else {
          this.notificar('error', 'Ocurrió un problema, intentelo de nuevo mas tarde');
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        }
      });


  }

  registerAgencia(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.representanteForm.invalid || this.empresaForm.invalid) {
      return;
    }
    this.showProgress = true;

    var aux = Object.assign({}, this.representanteForm.value);
    delete aux.confirmPassword;
    this.representante = aux;
    this.empresa = Object.assign({}, this.empresaForm.value);

    this.registerService.registerAgencia(this.representante, this.empresa)
      .then(success => {

        const requestFile = this.prepareFiles(this.logo);
        this.serviceAgencia.addLogo(requestFile, success.id)
          .then(sucesslogo => {
            this.notificar('success', success.message);
            this.representanteForm.reset();
            this.empresaForm.reset();
            this.submitted = false;
            this.showProgress = false;
          })
          .catch(errorLogo => {
            this.notificar('success', success.message);
            this.representanteForm.reset();
            this.empresaForm.reset();
            this.submitted = false;
            this.showProgress = false;
          });
      })
      .catch(error => {
        this.showProgress = false;
        if (error.message.match(/correo/)) {
          this.resetFormRepresentanteEmail();
        }

        if (error.message.match(/ruc/)) {
          this.resetFormRucEmpresa();
        }

        if (error.error === 'Not Authorization') {
          this.notificar('error', error.message);
        } else {
          this.notificar('error', 'Ocurrió un problema, intentelo de nuevo mas tarde');
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        }
      });

  }

  prepareFiles(file) {
    const formData = new FormData();
    formData.append(file.name, file);
    return formData;
  }


  onFile(files) {
    this.logo = files[0];
  }
  resetForm1() {

    setTimeout(() => {
      this.viajeroForm.get('email').setValue('');
      this.viajeroForm.get('password').setValue('');
      this.viajeroForm.get('confirmPassword').setValue('');
    }, 500);
  }

  resetFormRepresentanteEmail() {
    this.representanteForm.get('email').setValue('');
    this.representanteForm.get('password').setValue('');
    this.representanteForm.get('confirmPassword').setValue('')
  }

  resetFormEmpresaEmail() {
    this.empresaForm.get('email').setValue('');
  }
  resetFormRucEmpresa() {
    this.empresaForm.get('ruc').setValue('');
  }

  private notificar(status, message){
    this.notifier.notify( status,message);
  }


}


export class PasswordValidator {
  // Inspired on: http://plnkr.co/edit/Zcbg2T3tOxYmhxs7vaAm?p=preview
  static areEqual(formGroup: FormGroup) {
    let value;
    let valid = true;
    for (let key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        let control: FormControl = <FormControl>formGroup.controls[key];

        if (value === undefined) {
          value = control.value
        } else {
          if (value !== control.value) {
            valid = false;
            break;
          }
        }
      }
    }

    if (valid) {
      return null;
    }

    return {
      areEqual: true
    };
  }
}
