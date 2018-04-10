import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';

import { AuthService } from '../../auth.service';

declare let paypal: any;

@Component({
  selector: 'app-cuisine-detail',
  templateUrl: './cuisine-detail.component.html',
  styleUrls: ['./cuisine-detail.component.css']
})
export class CuisineDetailComponent implements AfterViewChecked{
  @Input() cuisine;
  addScript: boolean = false;
  paypalLoad: boolean = true;

  constructor(private authService : AuthService){  }

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AQUfAVPgQ6eWs0qryCWjXpy7Ka-DAPYvo0tE40Id68nOdjBPQ7kLzsiQrEaIhQ4VY3QTk6w-WEw9thBw',
      production: '<your-production-key here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.cuisine.price, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
      })
    }
  };

  

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }
}