import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import Login from './login/Login';
import MainView from './MainView';
import ServiceFilter from './ServiceFilter';
import { startLogin, startLogout } from '../actions/auth';
import { setTextFilter, setCarFilter } from '../actions/filters';
import { startAddService } from '../actions/services';
import { hydrateServices } from '../utils';
import serviceSelector from '../store/serviceSelector';

class MainContainer extends React.Component {
  handleServiceFilter = (text) => {
    this.props.dispatch(setTextFilter(text));
  }
  handleClearServiceFilter = () => this.props.dispatch(setTextFilter(''));
  
  handleCarFilter = (carId) => this.props.dispatch(setCarFilter(carId));

  handleAddService =(serviceObj) => {
    this.props.dispatch(startAddService(serviceObj));
  }

  render() {
    // Get uid from redux state
    const { uid, status } = this.props.auth;
    // Check if uid exists if doesn't show login 
    if (uid && status === 'loading') {
      // Show "ActivityIndicator", i.e. loading
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    } else {
      // Show Main View of services
      let newServiceArray = hydrateServices(this.props.services, this.props.cars);
      console.log(newServiceArray)
      return (
        <View style={styles.mainView}>
          <ServiceFilter 
            serviceFilter={this.props.filters.text}
            carFilterId={this.props.filters.carFilterId}
            carsData={this.props.cars}
            onCarFilter={this.handleCarFilter}
            onServiceFilter={this.handleServiceFilter}
            onClearServiceFilter={this.handleClearServiceFilter}
            onAddService={this.handleAddService}
          />
          <MainView services={newServiceArray} history={this.props.history}/>
        </View>
      );
    }
    
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#2ecc71'
  },
});

const mapStateToProps = (state) => {
  return (
    {
      auth: state.auth,
      services: serviceSelector(state.services, state.filters),
      filters: state.filters,
      cars: state.cars
    }
  );
};

export default connect(mapStateToProps)(MainContainer);