import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';

import { firebase } from '../../firebase/firebase';

import { startRemoveCar } from '../../actions/cars';
import CarList from '../../components/CarList';


class CarScreen extends React.Component {
  constructor(props) {
    super(props);
    // To listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  // Icons in header
  static navigatorButtons = {
    rightButtons: [
      {
        systemItem: 'add', // for icon button, provide the local image asset name
        id: 'add', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
      }
    ],
    leftButtons: [
      {
        icon: require('../../images/navicon_logout.png'),
        id: 'logout',
      }
    ]
  };

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    console.log('ServiceLIstscreen', event)
    if (event.type === 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id === 'add') { // this is the same id field from the static navigatorButtons definition
        //AlertIOS.alert('NavBar', 'Add button pressed');
        //Push Add Service Screen
        this.props.navigator.push({
          screen: 'car-tracker.AddCarScreen',
          title: 'Add Car',
          animated: true,
          animationType: 'fade',
        });
      }
      if(event.id === 'logout') {
        firebase.auth().signOut()
          .then(() => console.log('Signed Out'));
      }
    }
  }
  handleCarDelete = (carId) => {
    // Alert that service Data will be deleted

    // Delete services associated with carId
    // Delete car associated with carId
    this.props.startRemoveCar(carId);
  }
  showEditCarScreen = (carId) => {
    //Push Add/Edit Service Screen
    this.props.navigator.push({
      screen: 'car-tracker.AddCarScreen',
      title: 'Edit Car',
      animated: true,
      animationType: 'fade',
      passProps: { carId },
    });
  }
  render() {
    return (
      <View>
        <CarList 
          cars={this.props.cars} 
          onCarDelete={this.handleCarDelete}
          showEditCarScreen={this.showEditCarScreen}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return (
    {
      cars: state.cars
    }
  )
}
export default connect(mapStateToProps, { startRemoveCar: startRemoveCar })(CarScreen);