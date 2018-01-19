import { firebase } from '../firebase/firebase';
import { LOGIN, LOGOUT, STATUS_LOADING, STATUS_COMPLETE, STATUS_ERROR } from './actionTypes';

export const login = uid => ({
  type: LOGIN,
  uid,
});

//--The "onAuthStateChanged" listener will handle dispatching
//--the login action creator.
export const startLogin = (email = undefined, password = undefined) => {
  return (dispatch) => {
    dispatch(setStatusLoading());
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(uid => dispatch(setStatusComplete()))
      .catch(err => {
        dispatch(setStatusError(`${err.code} : ${err.message}`));
      });  
  };
};

export const logout = () => ({
  type: LOGOUT,
});

export const startLogout = () => {
  return (dispatch) => {
    firebase.auth().signOut();
    dispatch(logout());
  };
};

export const setStatusLoading = () => ({ type: STATUS_LOADING });
export const setStatusError = (err) => ({ type: STATUS_ERROR, msg: err });
export const setStatusComplete = () => ({ type: STATUS_COMPLETE });