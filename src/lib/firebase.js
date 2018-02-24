import * as firebase from 'firebase';
/*
*@Jose Carvajal
* Esta clase es donde se realiza la conexión con el proyecto de Firebase
*/ 
class Firebase {
    static init() {
        firebase.initializeApp({
            apiKey: "AIzaSyA-xMekGvg3D9JThgAFY82-XP4DmaQmxk0",
            authDomain: "almundochallenge.firebaseapp.com",
            databaseURL: "https://almundochallenge.firebaseio.com",
            projectId: "almundochallenge",
            storageBucket: "almundochallenge.appspot.com"
        })
    }
}

module.exports = Firebase;