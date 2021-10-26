// Import the functions you need from the SDKs you need
// const auth = require('firebase/auth')
// const initializeApp = require("firebase/app")
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js'

console.log("front.js is working");
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASVQdg4Cc82zWmYPqsEpPHGzNaD_vCTrA",
  authDomain: "express-backend-e65fe.firebaseapp.com",
  projectId: "express-backend-e65fe",
  storageBucket: "express-backend-e65fe.appspot.com",
  messagingSenderId: "111580122811",
  appId: "1:111580122811:web:52f91f7f8b22331e2d639e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
function signIn() {
  signInWithEmailAndPassword(auth,"abc@abc.com", '123456')
    .then((UserCredential) => {
      console.log("Sign in Authorised");
      var uid=UserCredential.user.uid;
      console.log(uid);
    })
    .catch((err) => {
      console.log("Sign in failed Unauthorised");
    })
}

function signout(user) {
  user.signOut().then(() => {
    console.log("Signed out Now Unauthorised");
  }).catch((err) => {
    console.log("Signed out error!!");
  })
}

let timezone= Intl.DateTimeFormat().resolvedOptions().timeZone;
document.getElementById('timezone').value=timezone
console.log(timezone);

var times=document.getElementsByClassName('datetime')
for (let index = 0; index < times.length; index++) {
  const time = times[index];
  if(!time.textContent) continue
  var date=new Date(time.textContent).getTime()
  var offset = new Date().getTimezoneOffset()*60000;
  var newtime=new Date(date-offset).toLocaleString('en-US',{
    hour12:false
  })
  time.textContent=newtime;
}
// signIn()

