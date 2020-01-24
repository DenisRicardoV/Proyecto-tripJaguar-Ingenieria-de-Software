import { Component, OnInit, AfterViewChecked, Input, Output, EventEmitter } from '@angular/core';

declare let paypal: any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit,AfterViewChecked {
  @Input() amount: any;
  @Input() idTransaction: String;

  @Output() isPayment: boolean;
  @Output() notify:EventEmitter<any> = new EventEmitter<any>();


  isEnabled: boolean = false;
  addScript: boolean = false;
  private paypalConfig: any;

  constructor() { }

  ngOnInit() {


    this.paypalConfig ={
      env: 'sandbox',
      client: {
        sandbox: this.idTransaction,//producer account id
        production: '<production-key here>'
      },
      commit: true,
      payment: (data, actions) =>{
        return actions.payment.create({
          payment: {
            transactions: [
              { amount: { total: this.amount, currency: 'USD'} }
            ]
          }
        });
      },
      onAuthorize: (data, actions) => {
        return actions.payment.execute().then((payment) => {
            this.notify.emit(payment);
        });
      }
    };




  }


  ngAfterViewChecked(): void{
    if(!this.addScript){
      this.addPaypalScript().then(()=>{
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        console.log("kdkajshdajd",this.amount);
      })
    }
  }

  addPaypalScript(){
    this.addScript = true;
    return new Promise( (resolve, reject) =>{
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);


    })
  }
}
