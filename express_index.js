const express = require("express");
const path = require("path");
const multer = require('multer')

//express-handlebars for html templating
const exhandlers = require("express-handlebars");

//requiring firebase-admin
const admin = require("firebase-admin");
const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth")
const { getDatabase, ref, set, get, child } = require("firebase/database");

//fetching service account json
const serviceAccount = require("./config/express-backend-e65fe-firebase-adminsdk-3z2xt-b19167fd80.json");

//initialise the app, granting admin privileges
const fire_admin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://express-backend-e65fe-default-rtdb.firebaseio.com/",
});

// firebase config for frontend 
const firebaseConfig = {
  apiKey: "AIzaSyASVQdg4Cc82zWmYPqsEpPHGzNaD_vCTrA",
  authDomain: "express-backend-e65fe.firebaseapp.com",
  projectId: "express-backend-e65fe",
  storageBucket: "express-backend-e65fe.appspot.com",
  messagingSenderId: "111580122811",
  appId: "1:111580122811:web:52f91f7f8b22331e2d639e"
};
const fireapp = initializeApp(firebaseConfig)

//initialising express app
const app = express();
const port = process.env.PORT || 8080;

app.engine("handlebars", exhandlers());
app.set("view engine", "handlebars");


//Express middlewares
app.use(express.urlencoded({ extended: true }))
app.use(multer().array());
app.use(express.static("public"));
app.use("/", require(path.join(__dirname, "routes/routes.js")));

app.listen(port, () => {
  console.log(`Express app listening on http://localhost:${port}`);
});

function customToken(email, password) {
  console.log("function is runnning");
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(getAuth(), email, password)
      .then((UserCredential) => {
        console.log("Running...");
        return UserCredential
      })
      .then((UserCredential) => {
        console.log("found user");
        return UserCredential.user.uid;
      })
      .then((uid) => {
        return admin.auth().createCustomToken(uid)
      })
      .then((customToken) => {
        console.log("custom token generated and returned");
        resolve(customToken)
      })
      .catch((err) => {
        reject(console.log(err))
      });
  })
}

const db = getDatabase(fireapp);

function writeData(data) {
  set(ref(db, 'timers/' + data.username), data);
  console.log("Data is written");
}

function getData() {
  // console.log("func started...");
  return get(child(ref(db), 'timers/'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        return snapshot.val()
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.log("error...123");
      console.error("ERROR:", error);
    });
}

function setTimer(data, timezone) {
  writeData(data)
  console.log(data);
  let utc = new Date(data.set_timer_at).getTime()
  console.log(utc, 1123);
  let localtime = new Date().toLocaleString('en-US', {
    'timeZone': timezone,
    hour12: false
  })
  console.log(localtime);

  var alarmtime = localtime.slice(0, 12) + data.duration + ":00"
  let ms = -new Date(localtime).getTime() + new Date(alarmtime).getTime()
  console.log(ms);
  setTimeout(() => {
    if (data.content) {
      data.content = ""
    } else {
      data.content = "true"
    }
    data.timer_off_at = now()
    writeData(data)
  }, ms)
}

function now() {
  let currentdate = new Date().toLocaleString('en-US', {
    timeZone: 'UTC',
    hour12: false
  });
  let datetime = currentdate
  return datetime
}

module.exports = { now, customToken, writeData, getData, setTimer }
