import { LOGIN, LOGOUT, STATUS_LOADING, STATUS_COMPLETE, STATUS_ERROR } from '../actions/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        uid: action.uid,
      };
    case LOGOUT:
      return {};
    case STATUS_LOADING:
      return { ...state, status: 'loading' };
    case STATUS_COMPLETE:
      return { ...state, status: 'complete' };
    case STATUS_ERROR:
    console.log('In reducer')
      return { ...state, 
        status: 'error',
        msg: action.msg };
    default:
      return state;
  }
};
