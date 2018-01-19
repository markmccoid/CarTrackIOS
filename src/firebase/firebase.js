import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyA4tS72KIiD3SnDbJ-ZDyy5DPdnY_D5YrI',
  authDomain: 'cartracker-871cc.firebaseapp.com',
  databaseURL: 'https://cartracker-871cc.firebaseio.com',
  projectId: 'cartracker-871cc',
  storageBucket: 'cartracker-871cc.appspot.com',
  messagingSenderId: '136622808562'
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };

// firebase.database().ref().set({
//   name: 'Mark',
//   age: 47,
//   stressLevel: 6,
//   job: {
//     title: 'Supreme Ruler',
//     company: 'Google'
//   },
//   location: {
//     city: 'Sacramento',
//     country: 'USA'
//   }
// });

// firebase.database().ref().update({
//   stressLevel: 9,
//   'job/company': 'Amazon',
//   'location/city': 'Seatle'
// });
// firebase.database().ref('attributes').set({
//   height: 72,
//   weight: 200,
// });

// firebase.database().ref('attributes')
//   .update({
//     height: 70,
//     IQ: 143,
//     weight: null
//   });

// firebase.database().ref().update({
//   age: 35,
//   'attributes/IQ': 143,
//   'attributes/height': 70,
//   'attributes/weight': null,
// });

// firebase.database().ref('isSingle').remove()
//   .then(() => console.log('removed succeeded'))
//   .catch(err => console.log(`Error removing: ${err}`));
