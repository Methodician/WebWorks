"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var pako = require("pako");
var functions = require("firebase-functions");
var admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
exports.mwAcadImport = functions.https.onRequest(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var zip, json;
    return __generator(this, function (_a) {
        zip = req.body;
        json = pako.deflate(zip);
        console.log(json);
        res.send(json);
        return [2 /*return*/];
    });
}); });
exports.addMessage = functions.https.onRequest(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var original, snapshot;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                original = req.query.text;
                return [4 /*yield*/, admin.firestore().collection('messages').add({ original: original })];
            case 1:
                snapshot = _a.sent();
                res.redirect("https://console.firebase.google.com/u/0/project/webworks-181919/database/firestore/data/" + snapshot.path);
                return [2 /*return*/];
        }
    });
}); });
exports.makeUppercase = functions.firestore.document('messages/{pushId}')
    .onWrite(function (event) { return __awaiter(_this, void 0, void 0, function () {
    var original, pushId, uppercase;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                original = event.data.data().original;
                pushId = event.params.pushId;
                console.log('Uppercasing', pushId, original);
                uppercase = original.toUpperCase();
                return [4 /*yield*/, event.data.ref.set({
                        uppercase: uppercase
                    }, { merge: true })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
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
//# sourceMappingURL=index.js.map