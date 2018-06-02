// import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';

// import { AuthService } from '../../auth.service';

// declare let paypal: any;

// @Component({
//   selector: 'app-cuisine-detail',
//   templateUrl: './cuisine-detail.component.html',
//   styleUrls: ['./cuisine-detail.component.css']
// })
// export class CuisineDetailComponent implements AfterViewChecked{
//   @Input() cuisine;
//   finalprice: Number;
//   addScript: boolean = false;
//   paypalLoad: boolean = true;
//   // remainingCuisine: Number;

//   constructor(private authService : AuthService){ 
//    }



//   paypalConfig = {
//     //env: 'production',
//     env: 'sandbox',
//     client: {
//       sandbox: 'AU5MjCSiXrLeQ5n-LMi2kqned0omPAYnurQ24yKZKT5u-lERfUW8EPj9yBjHvrs19pRis3pfkvc3-VO3',
//       //production: 'Ac-hB9I1OiRKS168vZ3lpCR8j7khgGINxalhcN_WF0NaY72CTgxFKHBLQHM_51Fhcc3DuMUcrPesdC7S'
//       },
//     commit: true,
//     payment: (data, actions) => {
//       try{
//       if (this.cuisine.remainingCapacity < 1){
        

//         //window.alert("Sorry, this listing cannot accomodate any new guests ");
//         var displayDate = new Date();
//         console.log(displayDate);
//         console.log("cannot accomodate more members");
//         throw 'error';
//       }
//     }
//     catch{
//       window.confirm("cuisine full");
//       return null;
//     }
      
      

//       //handle the date logic, fails to open paypal if it has past the hosting date
//       var dateArray = this.cuisine.hostingDate.split("-");
//       var timeArray = this.cuisine.hostingTimeMilitary.split(":");
//       var hostTime = new Date(dateArray[0], dateArray[1]-1, dateArray[2], timeArray[0], timeArray[1]).getTime();
//       var timeDifference = hostTime - new Date().getTime();
//       console.log(timeDifference);

//       // if (timeDifference < 0){
//       //   return null;
//       // }

      
//       return actions.payment.create({
//         payment: {
//           transactions: [
//             { amount: { total: this.cuisine.price, currency: 'USD' } }
//             ]
//           }
//         });
      
//       },
//     onAuthorize: (data, actions) => {
//       return actions.payment.execute().then((payment) => {
//         //Do something when payment is successful.
//         console.log("successful paypal payment");
//         console.log(payment);
//         console.log(this.cuisine);
//         console.log(this.authService.auth.currentUser);
//         var dbReference = this.authService.db.ref();
//         dbReference.child('orders/'+payment.id).set({
//           hostId: this.cuisine.uid,
//           buyerId: this.authService.auth.currentUser.uid,
//           cuisineID: this.cuisine.imgPostKey,
//           priceBeforePaypalService: this.cuisine.price,
//           priceAfterPaypalService: payment.transactions["0"].amount.total,
//           hostEmail: this.cuisine.hostEmail,
//           hostingDate: this.cuisine.hostingDate,
//           buyerEmail: this.authService.auth.currentUser.email,
//           startTime: this.cuisine.hostingTime, 
//           endTime: this.cuisine.hostingTime,
//           partySize: 1,
//           dormName: this.cuisine.dormName,
//           streetAddress1: this.cuisine.streetAddress1,
//           streetAddress2: this.cuisine.streetAddress2,
//           paypalTransactionId: payment.transactions["0"].related_resources["0"].sale.id,
//           hostName: this.cuisine.hostName,
//           buyerName: this.authService.auth.currentUser.displayName,
//           cuisineName: this.cuisine.cuisineName

//         }).then((success)=> {console.log("successfully written to orders in db");
//                             dbReference.child('/cuisines/'+this.cuisine.imgPostKey)
//                               .update({remainingCapacity: this.cuisine.remainingCapacity-1})
//                                 .then((success)=> console.log("successfully decreased remaining capacity"))
//                                   .catch((error)=> console.log("error while decreasing remaing capacity"))
//       })
//       //send the confirmation message
//       .then((confirmMessage) => {
//         window.confirm("Congrats! You have successfuly booked the cuisine. Go to your dashboard to see the info");
//       })
//           .catch((error)=> console.log("error while wrtitng order to database"))
//       })
      

//       //send the confirmation message

//     },
//     onError: function(err) {

//       console.log(err);
//       console.log("error inside onError");
//       /* 
//        * An error occurred during the transaction 
//        */
//     }
//   };

  

//   ngAfterViewChecked(): void {

//      if (!this.addScript ) {
//       this.addPaypalScript().then(() => {
//         paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
//         this.paypalLoad = false;
//       })
//       .catch((error)=>{
//         console.log("Error error inside ngAfterViewChecked");

//         if (error == 'full'){
//           window.confirm("This item has exceeded its limit, please explore other cuisines");
//         }
        
//       })
//     }


//   }

//   addPaypalScript() {

//     this.addScript = true;
//     // var finalpriceConversion = (Number(this.cuisine.price) + 0.30+ (0.029*Number(this.cuisine.price))).toFixed(2);
//     // console.log(finalpriceConversion);
//     // this.finalprice = Number(finalpriceConversion);
//     // console.log(this.finalprice);

//     return new Promise((resolve, reject) => {
//       let scripttagElement = document.createElement('script');
//       scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
//       scripttagElement.onload = resolve;
//       document.body.appendChild(scripttagElement);
//     })
//   }
// }