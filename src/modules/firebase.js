import * as firebase from 'firebase';
var firebaseConfig = {
  apiKey: "AIzaSyCwxkBasDBWBFwaq-lSgFIMkSBtk9SfK8E",
  authDomain: "newguy9-1377.firebaseio.com/",
  databaseURL: "https://newguy9-1377.firebaseio.com/",
  storageBucket: ""
};

var FbApp = firebase.initializeApp(firebaseConfig).database();
export default FbApp;
