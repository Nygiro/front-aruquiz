import * as firebase from 'firebase';
const config = {
  apiKey: "AIzaSyAxSlgRFdLM5WSDbyHkQIFSHtt_iaIvGks",
  authDomain: "aruquiz.firebaseapp.com",
  databaseURL: "https://aruquiz.firebaseio.com",
  projectId: "aruquiz",
  storageBucket: "aruquiz.appspot.com",
  messagingSenderId: "1027927407561",
  appId: "1:1027927407561:web:5563b00fcc504e52518618",
  measurementId: "G-KL5SEL522K"
}
firebase.initializeApp(config);
export const  databaseRef = firebase.database().ref();
