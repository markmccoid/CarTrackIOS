import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

// Import global styles
import { globalStyles } from './src/styles';

import configureStore from './src/store/configureStore';
// Database access stuff
import { firebase } from './src/firebase/firebase';
import { initializeData } from './src/dbAccess';

// Actions
import { login, logout, setStatusComplete, setStatusLoading } from './src/actions/auth';
import { setServices } from './src/actions/services';
import { setCars } from './src/actions/cars';

import AuthScreen from './src/screens/auth/AuthScreen';
// import MainApp from './src/MainApp';
import ServiceListScreen from './src/screens/mainScreens/ServiceListScreen';
import CarScreen from './src/screens/mainScreens/CarScreen';
import AddServiceScreen from './src/screens/mainScreens/AddServiceScreen';
import AddCarScreen from './src/screens/mainScreens/AddCarScreen';
//import SelectServiceScreen from './src/screens/selectScreens/SelectServiceScreen';
import SearchSelectScreen from './src/screens/selectScreens/SearchSelectScreen';
import startTabs from './src/screens/mainTabs/startMainTab';

// Run Build step in extended styles component
EStyleSheet.build(globalStyles);

// Configure the redux store
const store = configureStore();


// Register Screens
Navigation.registerComponent('car-tracker.AuthScreen', () => AuthScreen, store, Provider);
Navigation.registerComponent('car-tracker.ServiceListScreen', () => ServiceListScreen, store, Provider);
Navigation.registerComponent('car-tracker.CarScreen', () => CarScreen, store, Provider);
Navigation.registerComponent('car-tracker.AddServiceScreen', () => AddServiceScreen, store, Provider);
Navigation.registerComponent('car-tracker.AddCarScreen', () => AddCarScreen, store, Provider);
//Navigation.registerComponent('car-tracker.SelectServiceScreen', () => SelectServiceScreen, store, Provider);
Navigation.registerComponent('car-tracker.SearchSelectScreen', () => SearchSelectScreen, store, Provider);

//--Check auth state and if logged in set redux login state
//--Then load initial data and redirect to initial page.
firebase.auth().onAuthStateChanged((user) => {
  if (user) { //this will be run once every time the user is logged in or out.
    store.dispatch(login(user.uid));
    //set loading state to "loading"
    store.dispatch(setStatusLoading());
    //load initial data
    initializeData(user.uid)
      .then((dataObj) => {
        //Store in redux
        store.dispatch(setServices(dataObj.servicesArray));
        store.dispatch(setCars(dataObj.carsArray));
        //set loading state to "complete"
        store.dispatch(setStatusComplete());
        startTabs();
      })
  } else {
    // set redux store uid to blank so it knows we are logged out
    store.dispatch(logout());
    // Start a React Navigation app tab or single screen
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'car-tracker.AuthScreen',
        title: 'Login'
      }
});
  }
});

// Start a React Navigation single screen
Navigation.startSingleScreenApp({
  screen: {
    screen: 'car-tracker.AuthScreen',
    title: 'Login'
  }
});
//run debugger
// open "rndebugger://set-debugger-loc?host=localhost&port=19001"

// export default class App extends React.Component {
//   render() {
//     return (
//       <MainApp />
//     );
//   }
// }
