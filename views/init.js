if (typeof firebase === 'undefined') throw new Error('hosting/init-error: Firebase SDK not detected. You must include it before /__/firebase/init.js');
firebase.initializeApp({
  "apiKey": "AIzaSyC3KYXFzvDyNSsnndXYfsY2bgjSVX89dPc",
  "databaseURL": "https://loveletter-48fa2.firebaseio.com/",
  "storageBucket": "loveletter-48fa2.appspot.com",
  "authDomain": "loveletter-48fa2.firebaseapp.com",
  "projectId": "loveletter-48fa2"
});