import firebase from 'firebase';

class Firebase {
  constructor() {
    if (!firebase.apps.length) { //avoid re-initializing
      firebase.initializeApp({
        apiKey: "AIzaSyCV9ZkfhUkShYjGZg4XQgUR0KG5Q1BuzA0",
        authDomain: "commy-96d29.firebaseapp.com",
        databaseURL: "https://commy-96d29.firebaseio.com",
        projectId: "commy-96d29",
        storageBucket: "commy-96d29.appspot.com",
        messagingSenderId: "783563422292"
      });
     }
     passwordReset: email => {
        return firebase.auth().sendPasswordResetEmail(email)
      }
  }

  
}
  export default Firebase;