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
// [START onCreateTrigger]
exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
// [END onCreateTrigger]
  // [START eventAttributes]
  const email = user.data.email; // The email of the user.
  const displayName = user.data.displayName; // The display name of the user.
  // [END eventAttributes]
  return sendWelcomeEmail(email, displayName);
});
// [END sendWelcomeEmail]
// [START sendByeEmail]
/**
 * Send an account deleted email confirmation to users who delete their accounts.
 */
// [START onDeleteTrigger]
exports.sendByeEmail = functions.auth.user().onDelete((user) => {
    // [END onDeleteTrigger]
      const email = user.email;
      const displayName = user.displayName;
    
      return sendGoodbyEmail(email, displayName);
    });
    // [END sendByeEmail]
    
    // Sends a welcome email to the given user.
    function sendWelcomeEmail(email, displayName) {
      const mailOptions = {
        from: `${APP_NAME} <noreply@firebase.com>`,
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
        from: `${APP_NAME} <noreply@firebase.com>`,
        to: email,
      };
    
      // The user unsubscribed to the newsletter.
      mailOptions.subject = `Bye!`;
      mailOptions.text = `Hey ${displayName || ''}!, We confirm that we have deleted your ${APP_NAME} account.`;
      return mailTransport.sendMail(mailOptions).then(() => {
        return console.log('Account deletion confirmation email sent to:', email);
      });
    }

    exports.addUserToDB = functions.auth.user().onCreate(event => {
        admin.database().ref('/users/' + event.data.uid).set({
          name: event.data.displayName,
          email: event.data.email,
          photoURL: event.data.photoURL,
          hostRating: 0,
          userRating: 0,
          isHost: false,
          hostedCuisines: [],
          bookedCuisines: []
        });
      });
                                
    // Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
      // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
      return res.redirect(303, snapshot.ref.toString());
    });
  });
  

  exports.makelowercase = functions.database.ref('/messages').onCreate((snapshot, context)=>{
      
  })
// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      console.log(snapshot);
      console.log(context);
      const original = snapshot.val();
      console.log('Uppercasing', context.params.pushId, original);
      const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return snapshot.ref.parent.child('uppercase').set(uppercase);
    });