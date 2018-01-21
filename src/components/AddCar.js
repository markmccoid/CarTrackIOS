import React from 'react';
import PropTypes from 'prop-types';
import { Modal, View, Text, 
  StyleSheet, Button, TextInput } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';

class AddCar extends React.Component {
  state = {
    nickName: this.props.car ? this.props.car.nickName : '',
    make: this.props.car ? this.props.car.make : '',
    model: this.props.car ? this.props.car.model : '',
    year: this.props.car ? this.props.car.year : '',
    VIN: this.props.car ? this.props.car.VIN : '',
    licensePlate: this.props.car ? this.props.car.licensePlate : ''
  }
  createCarObj = () => {
    return {
      nickName: this.state.nickName,
      make: this.state.make,
      model: this.state.model,
      year: this.state.year,
      VIN: this.state.VIN,
      licensePlate: this.state.licensePlate
    }
  }
  handleAddCar = () => {
    this.props.onAddCar(this.createCarObj());
  }
  handleEditCar = () => {
    this.props.onEditCar(this.props.car.id, this.createCarObj());
  }
  render() {
    let formFieldsJSX = null;
    formFieldsJSX = (
    <View style={styles.inputView}>
      <TextInput 
        autoFocus={true}
        style={styles.textInput}
        value={this.state.nickName}
        onChangeText={(text) => this.setState({ nickName: text })}
        placeholder="Car Nickname"
        returnKeyType="next"
        onSubmitEditing={() => this.make.focus()}
      />
      <TextInput 
        style={styles.textInput}
        value={this.state.make}
        onChangeText={(text) => this.setState({ make: text })}
        placeholder="Car Make"
        returnKeyType="next"
        ref={(input) => this.make = input}
        onSubmitEditing={() => this.model.focus()}
      />
      <TextInput 
        style={styles.textInput}
        value={this.state.model}
        onChangeText={(text) => this.setState({ model: text })}
        placeholder="Car Model"
        returnKeyType="next"
        ref={(input) => this.model = input}
        onSubmitEditing={() => this.year.focus()}
      />
      <TextInput 
        style={styles.textInput}
        value={this.state.year}
        onChangeText={(text) => this.setState({ year: text })}
        placeholder="Car Year"
        keyboardType="number-pad"
        returnKeyType="next"
        ref={(input) => this.year = input}
        onSubmitEditing={() => this.licensePlate.focus()}
      /> 
      <TextInput 
        style={styles.textInput}
        value={this.state.licensePlate}
        onChangeText={(text) => this.setState({ licensePlate: text })}
        placeholder="License Plate"
        returnKeyType="next"
        ref={(input) => this.licensePlate = input}
        onSubmitEditing={() => this.VIN.focus()}
      />  
      <TextInput 
        style={styles.textInput}
        value={this.state.VIN}
        onChangeText={(text) => this.setState({ VIN: text })}
        placeholder="VIN"
        ref={(input) => this.VIN = input}
      />
    </View>
  );
    return (
        <View style={styles.mainView}>
          <View>
            {formFieldsJSX}
          </View>
          <View>
            {this.props.car ?
              <Button title='Update' onPress={this.handleEditCar} />
              :
              <Button title='Save' onPress={this.handleAddCar} />
            }
          </View>
        </View>
    );
  }
  static propTypes = {
    onAddCar: PropTypes.func,
    onEditCar: PropTypes.func,
    car: PropTypes.object,
  }
}

const styles = EStyleSheet.create({
  mainView: {
  },
  inputView: {
    margin: 5,
  },
  textInput: {
    height: '$inputBoxSize',
    fontSize: '$inputFontSize',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
    borderRadius: 10,
    backgroundColor: () => Color(EStyleSheet.value('$inputBgColor')).lighten(0.5).hex()
  },
  textInputMulti: {
    height: '$inputBoxSize * 2',
    fontSize: '$inputFontSize',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
    borderRadius: 10,
    backgroundColor: () => Color(EStyleSheet.value('$inputBgColor')).lighten(0.5).hex(),
  },
  pickerContainer: {
    flex: 1,
    height: 50,
  },
});
export default AddCar;