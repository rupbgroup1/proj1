import firebase from 'firebase';
class FirebaseSvc {
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

    //  this.observeAuth();
    //  passwordReset: email => {
    //     return firebase.auth().sendPasswordResetEmail(email)
    //   }
  }
//   observeAuth = () =>
//   firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

// onAuthStateChanged = user => {
//   if (!user) {
//     try {
//       firebase.auth().signInAnonymously();
//     } catch ({ message }) {
//       alert(message);
//     }
//   }
// };
  get ref() {
    return firebase.database().ref('Messages');
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: id } = snapshot;
    const { key: _id } = snapshot; //needed for giftedchat
    const timestamp = new Date(numberStamp);

    const message = {
      id,
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  refOn = callback => {
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));
  }
  get uid() {
    return 0;
    //return (firebase.auth().currentUser || {}).uid;
  }
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  
  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        createdAt: this.timestamp,
      };
      this.ref.push(message);
    }
  };

  refOff() {
    this.ref.off();
  }
}

const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;