import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    'apiKey': 'AIzaSyCZhizgSxlc6nuaozzO91nrcVGT9LGwPS8',
    'authDomain': 'builder-1cfdf.firebaseapp.com',
    'databaseURL': 'https://builder-1cfdf.firebaseio.com',
    'projectId': 'builder-1cfdf',
    'storageBucket': 'builder-1cfdf.appspot.com',
    'messagingSenderId': '626338077174'
};

firebase.initializeApp(firebaseConfig);
const fb = firebase.database();

export default fb;
