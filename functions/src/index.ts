//const functions = require('firebase-functions');
import * as functions from 'firebase-functions';

//const admin = require('firebase-admin');
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);

export const addMessage = functions.https.onRequest(async (req, res) => {
  const original = req.query.text;
  const snapshot = await admin.firestore().collection('messages').add({ original: original });
  res.redirect(`https://console.firebase.google.com/u/0/project/webworks-181919/database/firestore/data/${snapshot.path}`);
});

export const makeUppercase = functions.firestore.document('messages/{pushId}')
  .onWrite(async event => {
    const original = event.data.data().original;
    const pushId = event.params.pushId;
    console.log('Uppercasing', pushId, original);
    const uppercase = original.toUpperCase();
    await event.data.ref.set({
      uppercase: uppercase
    }, { merge: true });
  });

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
// exports.addMessage = functions.https.onRequest((req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text;
//   // Push the new message into the Realtime Database using the Firebase Admin SDK.

//   admin.database().ref('/messages').push({
//     original: original
//   }).then(snapshot => {
//     // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//     res.redirect(303, snapshot.ref);
//   });
//   admin.firestore().collection('messages').add({
//     original: original
//   }).then(snap => {
//     //console.log(snap);
//     //res.redirect(303, snap.ref);
//   })
// });

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
// exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
//   .onWrite(event => {
//     // Grab the current value of what was written to the Realtime Database.
//     const original = event.data.val();
//     console.log('Uppercasing', event.params.pushId, original);
//     const uppercase = original.toUpperCase();
//     // You must return a Promise when performing asynchronous tasks inside a Functions such as
//     // writing to the Firebase Realtime Database.
//     // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
//     return event.data.ref.parent.child('uppercase').set(uppercase);
//   });



/* exports.makeStoreUpper = functions.firestore.document('messages/{pushId}')
  .onWrite(event => {
    const original = event.data.data().original;
    console.log('Uppercasing', event.params.pushId, original);
    const uppercase = original.toUpperCase();
    //console.log(event);
    return event.data.ref.set({
      uppercase: uppercase
    }, {
        //  I wonder if .update() would be same as .set() with merge: true?
        merge: true
      });
  }); */



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
