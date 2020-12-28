import firebase from "firebase";

let firebaseConfig = {
    apiKey: "AIzaSyBDm3Svk8RWLM7FcAUcuvRA57Rpl1h3tY8",
    authDomain: "reactprojects-8d1c6.firebaseapp.com",
    projectId: "reactprojects-8d1c6",
    storageBucket: "reactprojects-8d1c6.appspot.com",
    messagingSenderId: "15131244874",
    appId: "1:15131244874:web:5d1478ced5777c8ff369b3"
};
const fire = firebase.initializeApp(firebaseConfig);

export default  fire
