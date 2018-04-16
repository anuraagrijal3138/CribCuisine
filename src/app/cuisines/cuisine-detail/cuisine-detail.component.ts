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
  finalprice: Number;
  addScript: boolean = false;
  paypalLoad: boolean = true;

  constructor(private authService : AuthService){  }

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AU5MjCSiXrLeQ5n-LMi2kqned0omPAYnurQ24yKZKT5u-lERfUW8EPj9yBjHvrs19pRis3pfkvc3-VO3',
      production: '<your-production-key here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalprice, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
        console.log("successful paypal payment");
        console.log(payment);
        console.log(this.cuisine);
        console.log(this.authService.auth.currentUser);
        var dbReference = this.authService.db.ref();
        dbReference.child('orders/'+payment.id).set({
          hostId: this.cuisine.uid,
          buyerId: this.authService.auth.currentUser.uid,
          cuisineID: this.cuisine.imgPostKey,
          priceBeforePaypalService: this.cuisine.price,
          priceAfterPaypalService: payment.transactions["0"].amount.total,
          hostEmail: this.cuisine.hostEmail,
          hostingDate: this.cuisine.hostingDate,
          buyerEmail: this.authService.auth.currentUser.email,
          startTime: this.cuisine.hostingTime, 
          endTime: this.cuisine.hostingTime,
          partySize: 1,
          dormName: this.cuisine.dormName,
          streetAddress1: this.cuisine.streetAddress1,
          streetAddress2: this.cuisine.streetAddress2,
          paypalTransactionId: payment.transactions["0"].related_resources["0"].sale.id,
          hostName: this.cuisine.hostName,
          buyerName: this.authService.auth.currentUser.displayName,
          cuisineName: this.cuisine.cuisineName

        }).then((success)=> console.log("successfully written to orders in db"))
          .catch((error)=> console.log("error while wrtitng order to database"))
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
    var finalpriceConversion = (Number(this.cuisine.price) + 0.30+ (0.029*Number(this.cuisine.price))).toFixed(2);
    console.log(finalpriceConversion);
    this.finalprice = Number(finalpriceConversion);
    console.log(this.finalprice);

    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }
}