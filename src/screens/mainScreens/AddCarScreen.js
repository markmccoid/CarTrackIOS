import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';

import AddCar from '../../components/AddCar';
import { startAddCar, startEditCar } from '../../actions/cars';

class AddCarScreen extends React.Component {
  handleAddCar = (carObj) => {
    this.props.addCar(carObj)
    this.props.navigator.pop({
      animated: true, // does the pop have transition animation or does it happen immediately (optional)
      animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
    });
  }
  handleEditCar = (carId, carObj) => {
    this.props.editCar(carId, carObj);
    this.props.navigator.pop({
      animated: true, // does the pop have transition animation or does it happen immediately (optional)
      animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
    });    
  }
  render() {
    return (
      <View>
        <AddCar
          onAddCar={this.handleAddCar}
          onEditCar={this.handleEditCar}
          car={this.props.cars.find(car => car.id === this.props.carId)}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    cars: state.cars
  });
};

export default connect(mapStateToProps, {
    addCar: startAddCar,
    editCar: startEditCar
  })(AddCarScreen);