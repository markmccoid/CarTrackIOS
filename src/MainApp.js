import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { Redirect } from 'react-router-native';


// Database access stuff
import { firebase } from './firebase/firebase';
import { initializeData } from './dbAccess';
import configureStore from './store/configureStore';
// Actions
import { login, logout, setStatusComplete, setStatusLoading } from './actions/auth';
import { setServices } from './actions/services';
import { setCars } from './actions/cars';
// Components
import MainContainer from './components/MainContainer';
import AppRouter, { history } from './routes/AppRouter';

// Configure the redux store
const store = configureStore();
//--Check auth state and if logged in set redux login state
//--Then load initial data and redirect to initial page.
firebase.auth().onAuthStateChanged((user) => {
  console.log('IN MAINAPP.js', user.uid);
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
        history.push('/maincontainer');
      })
  } else {
    // set redux store uid to blank so it knows we are logged out
    store.dispatch(logout());
    history.push('/');
  }
});

const MainApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default MainApp;
