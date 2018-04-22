/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';
//for creating new users in database
const admin = require('firebase-admin');
var afirebase = {
apiKey: "AIzaSyAwmw91CYCT7zYm6_xIqEA6woiDqB9P8mM",
authDomain: "cribcuisine.firebaseapp.com",
databaseURL: "https://cribcuisine.firebaseio.com",
projectId: "cribcuisine",
storageBucket: "cribcuisine.appspot.com",
messagingSenderId: "252261267111"
}
admin.initializeApp(afirebase);

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
const APP_NAME = 'CribCuisine';

// [START sendWelcomeEmail]
/**
 * Sends a welcome email to new user.
 */

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {

  const email = user.email;
  const displayName = user.displayName; 
  return sendWelcomeEmail(email, displayName);
});


exports.sendByeEmail = functions.auth.user().onDelete((user) => {
    
      const email = user.email;
      const displayName = user.displayName;
      return sendGoodbyEmail(email, displayName);
    });

    
// Sends a welcome email to the given user.
function sendWelcomeEmail(email, displayName) {
  const mailOptions = {
    from: `${APP_NAME} `,
    to: email,
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text = `Hey ${displayName || ''}! Welcome to ${APP_NAME}. I hope you will enjoy our service.`;
  return mailTransport.sendMail(mailOptions).then(() => {
     return console.log('New welcome email sent to:', email);
  });
}
    

// Sends a goodbye email to the given user.
function sendGoodbyEmail(email, displayName) {
  const mailOptions = {
    from: `${APP_NAME} `,
    to: email,
  };

  // The user deleted their account
  mailOptions.subject = `Bye!`;
  mailOptions.text = `Hey ${displayName || ''}!, We confirm that we have deleted your ${APP_NAME} account.`;
  return mailTransport.sendMail(mailOptions).then(() => {
    return console.log('Account deletion confirmation email sent to:', email);
  });
}

// Sends a Email to host letting them know they have a new Guest 
function sendEmailToHost(hostEmail, hostName, guestName, guestEmail, cuisineName, hostId) {
  const mailOptions = {
    from: `${APP_NAME} `,
    to: hostEmail,
  };


  mailOptions.subject = `You have a new Guest!`;
  mailOptions.text = `Hey ${hostName || ''}!, We confirm that you have a new Guest for ${cuisineName}. Here are the details of your guest:
                      Guest name: ${guestName} 
                      Guest email: ${guestEmail}`;
  return mailTransport.sendMail(mailOptions).then(() => {
     console.log('Host confirmation email sent to:', hostEmail);
     return addNewNotification(`you have a new Guest ${guestName} arriving for ${cuisineName}. Their email is: ${guestEmail}`, hostId)
  });
}

function sendEmailToGuest(hostEmail, hostName, guestName, guestEmail, cuisineName, hostDorm, hostStreetAddress1, hostStreetAddress2, startTime, guestId) {
  const mailOptions = {
    from: `${APP_NAME} `,
    to: guestEmail,
  };


  mailOptions.subject = `Confirmation regarding your recent Booking!`;
  mailOptions.text = `Hey ${guestName || ''}!, We confirm that you are now booked to enjoy ${cuisineName}. Here are the details of your host:
                      host name: ${hostName}
                      host email: ${hostEmail}
                      location: ${hostDorm}, ${hostStreetAddress1}, ${hostStreetAddress2}
                      time: ${startTime}`;
  return mailTransport.sendMail(mailOptions).then(() => {
     console.log('Guest confirmation email sent to:', guestEmail);
     return addNewNotification(
       `You are now booked to enjoy ${cuisineName} hosted by ${hostName} at ${hostDorm}, ${hostStreetAddress1}, ${hostStreetAddress2} on ${startTime}`,
        guestId).then((success)=> console.log("successfully added new notification"))
          .catch(()=>  console.log("error adding notification to guest's id"))
  });
}


exports.addUserToDB = functions.auth.user().onCreate((user) => {
  console.log("inside user add to DB function");
  console.log(user);
  
    admin.database().ref('/users/' + user.uid).set({
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      hostRating: 0,
      userRating: 0,
      isHost: false,
      hostedCuisines: [],
      bookedCuisines: []
    }).then((success)=>{
      console.log("successfully added user to database");
      return addNewNotification("Welcom to CribCuisine!", user.uid)
        .then((success) => {console.log("successfuly added welcome notification");
                  return addNewNotification("Browse the posted cuisines or you can add your own listing by clicking become a host on header", user.uid)
                    .then((success)=> console.log("second notification posted successfully"))
                      .catch((failure) => console.log("failed to send second notification"))                  
      })
          .catch((failure) => console.log("failed to add welcome notification to new user"))
    }).catch((failure)=> console.log("failed to add user to database"));
  });
          
  
// Sends an email confirmation when a user changes his mailing list subscription.
exports.sendEmailConfirmation = functions.database.ref('/orders/{orderId}').onCreate((newOrder) => {
  console.log(newOrder);
  console.log(newOrder._data);
  console.log(newOrder.data);

  const val = newOrder._data;
 
  var guestId = val.buyerId;
  var hostId = val.hostId;
  var hostEmail = val.hostEmail;
  var hostName = val.hostName;
  var guestName = val.buyerName;
  var guestEmail = val.buyerEmail;
  var cuisineName = val.cuisineName;
  var hostDorm = val.dormName;
  var hostStreetAddress1 = val.streetAddress1;
  var hostStreedAddress2 = val.streetAddress2;
  var startTime = val.startTime;
  var hostingDate = val.hostingDate;
  var cusisineId = val.cuisineID;

  return sendEmailToGuest(hostEmail, hostName, guestName, guestEmail, cuisineName, hostDorm, hostStreetAddress1, hostStreedAddress2, startTime, guestId)
                          .then((success)=>{
                            return sendEmailToHost(hostEmail, hostName, guestName, guestEmail, cuisineName, hostId)
                              .then((success)=> {
                                console.log("send email to host succeed");
                                return addBookedCuisines(guestId, cusisineId, cuisineName, hostDorm, hostStreetAddress1, hostStreedAddress2, startTime, hostingDate )
                                  .then((success) => console.log("successfuly added on user's bookedCuisines"))
                                    .catch((error) => console.log("error while adding to users booked cuisines"))
                                        
                            })
                                .catch((error)=> {console.log("error while sending email to Host");
                                        console.log(error);                
                              })
                          }).catch((error) => {
                            console.log("Failed to send Email to Guest");
                            console.log(error);
                          
      });

});


//once the order is confirmed


//function to update message for each users notifications

function addNewNotification(message, userID){
  var newNotificationRef = admin.database().ref('/users/' + userID+'/notification').push();
  return newNotificationRef.set({
    notification: message
  });

}

function addBookedCuisines(userID, cuisineID, name, dorm, address1, address2, time, date ){
  var bookedCuisineRef = admin.database().ref('/users/' + userID+'/bokedcuisines/'+cuisineID);
  
  return bookedCuisineRef.set({
    cuisineName: name,
    dormName: dorm,
    streetAddress1: address1,
    streetAddress2: address2,
    startTime: time,
    date: date
  });

}