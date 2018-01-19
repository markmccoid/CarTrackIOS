//-------------------------
//--Services Reducer --
//-- Allows Add, Edit, Remove a server
//-------------------------
import { SET_SERVICES, ADD_SERVICE, EDIT_SERVICE, REMOVE_SERVICE, REMOVE_CAR } from '../actions/actionTypes';

const servicesReducer = (state = [], action) => {
  switch (action.type) {
    case SET_SERVICES:
      return action.services;
    case ADD_SERVICE:
      return [...state, action.service];
    case EDIT_SERVICE:
    // let obj = state.filter(service => service.id === action.id)[0];
    // let reduceState = state.filter(service => service.id !== action.id);
    // return [...reduceState, {...obj, ...action.serviceObj}];

      return state.map((service) => {
        if (service.id === action.id) {
          return { ...service, ...action.serviceObj }
        }
        return service;
      });
  case REMOVE_SERVICE:
    return state.filter(service => service.id !== action.id)
  case REMOVE_CAR:
    // When removing a car we need to remove all services associated with the car
    // When this action type is passed, the action.id is referring to the carId
    return state.filter(service => service.carId != action.id); 
  default:
      return state;
  }
};

export default servicesReducer;
