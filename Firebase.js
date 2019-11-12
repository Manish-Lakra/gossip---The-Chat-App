
import firebase from "firebase";
import React from "react";

class Firebase extends React.Component {
  constructor(props) {
    super(props);
    this.init();
    this.observeAuth();
    
    this.state = {
      StorageRef:'',
      ref: ''
    }
  }

  init = () => {
    firebase.initializeApp({
        apiKey: "AIzaSyDFfZNwM3WspwsvZ7BUIhVyRy2Jr_70P34",
        authDomain: "gossip-ac3b4.firebaseapp.com",
        databaseURL: "https://gossip-ac3b4.firebaseio.com",
        projectId: "gossip-ac3b4",
        storageBucket: "gossip-ac3b4.appspot.com",
        messagingSenderId: "848304345255",
        appId: "1:848304345255:web:b732b4c09f65072e"
    });
  };

  observeAuth = () => {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  };

  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {}
    }
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
    console.log(firebase.auth().currentUser)
  }

  get ref() {
    return  firebase.database().ref("message/");
     //chatkey = firebaseRef + Pref;
     // return chatkey
  }

  dynamicRef(refPath) {
    console.log("dynamicRef"+ firebase.database().ref(refPath))
    return  firebase.database().ref(refPath)
    
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);

    const message = {
      _id,
      timestamp,
      text,
      user
    };
    return message;
  };

  on = (Pref,callback) => {
         console.log("FetchRef"+Pref)
    //this.state.ref = this.ref+ Pref
    firebase.database().ref("message/"+Pref)
    //console.log("FetchRef"+  firebase.database().ref("message/"+Pref))
   // .GetReference("message"+Pref)
     //this.ref = myRef+ Pref
      .limitToLast(50)
      .on("child_added", snapshot => callback(this.parse(snapshot)));
  };

  onRef = (ref, callback) => {
    this.dynamicRef(ref)
    console.log("onRef"+ this.dynamicRef(ref))
      
  };

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
send = (key,messages) => {
 let self = this
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp
      };
      this.append(key,message);
      console.log(this.dynamicRef('message/'+key))
    }
  };

  append = (key,message) =>{
    let self = this
    this.setState({
      StorageRef : self.dynamicRef('message/'+key)

    })
    console.log(this.state.StorageRef)

  return  self.dynamicRef('message/'+key).push(message);

  }
  
  
    
  
    off() {
      
    this.ref.off();
  }
}

Firebase.shared = new Firebase();
export default Firebase;
