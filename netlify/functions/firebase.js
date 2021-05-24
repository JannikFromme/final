const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyDv4hocTo4gdY0CFxX4Udldntk8dQIoMhk",
  authDomain: "final-project---nba-stats.firebaseapp.com",
  projectId: "final-project---nba-stats",
  storageBucket: "final-project---nba-stats.appspot.com",
  messagingSenderId: "108245735768",
  appId: "1:108245735768:web:6c86aadac2fa1de428ad2d"
} // replace

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase