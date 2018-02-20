import React from 'react';
import PropTypes from 'prop-types';
import { Modal, View, Text, KeyboardAvoidingView, TouchableWithoutFeedback,
  StyleSheet, Button, TextInput } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';
import { Picker, List } from 'antd-mobile'; 
import moment from 'moment';
import _ from 'lodash';
// https://github.com/xgfe/react-native-datepicker
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/Ionicons'

import SearchSelectInitiator from './SelectScreen/SearchSelectInitiator';

class AddService extends React.Component {
  state = {
    serviceDescription: this.props.service ? this.props.service.serviceDescription : '',
    serviceCost: this.props.service ? (this.props.service.serviceCost / 100).toString() : '',
    serviceNote: this.props.service ? this.props.service.serviceNote : '',
    serviceProvider: this.props.service ? this.props.service.serviceProvider : '',
    serviceDate: this.props.service ? moment(this.props.service.serviceDate).format('MM-DD-YYYY') : new Date,
    carId: this.props.service ? this.props.service.carId : this.props.cars[0].id
  }
  createServiceObj = () => {
    return {
      serviceCost: this.state.serviceCost * 100,
      serviceDate: moment(this.state.serviceDate, 'MM-DD-YYYY').valueOf(),
      serviceDescription: this.state.serviceDescription,
      serviceNote: this.state.serviceNote,
      serviceProvider: this.state.serviceProvider,
      carId: this.state.carId
    }
  }
  handleAddService = () => {
    this.props.onAddService(this.createServiceObj());
  }
  handleEditService = () => {
    this.props.onEditService(this.props.service.id, this.createServiceObj());
  }

  //passed to SelectServiceScreen to handle when selected service is returned
  handleReturnedService = (serviceDescription) => {
    this.setState({ serviceDescription }) 
    this.props.navigator.pop();
  }
  //passed to SelectScreenBase to handle when selected service provider is returned
  handleReturnedServiceProvider = (serviceProvider) => {
    this.setState({ serviceProvider }) 
    this.props.navigator.pop();
    this.cost.focus()
  }
  
  // shows SelectServiceScreen
  handleSelectDescription = () => {
    //Push Select Service Screen
    this.props.navigator.push({
      screen: 'car-tracker.SearchSelectScreen',
      title: 'Select Service',
      passProps: {
        onReturnService: this.handleReturnedService,
        selectItems: _.sortBy(_.uniq(this.props.serviceDescriptions))},
      animated: true,
      animationType: 'fade',
    });
  }
  // shows SelectServiceScreen
  handleSelectProvider = () => {
    //Push Select Service Screen
    this.props.navigator.push({
      screen: 'car-tracker.SearchSelectScreen',
      title: 'Select Provider',
      passProps: {
        onReturnService: this.handleReturnedServiceProvider,
        selectItems: _.sortBy(_.uniq(this.props.serviceProviders))},
      animated: true,
      animationType: 'fade',
    });
  }

  render() {
    // When using the antd picker, you must provide an initial "value" or you get chinese characters
    const pickerData = this.props.cars.map(carData => ({
        label: carData.nickName, 
        value: carData.id
      })
    );


    let formFieldsJSX = null;
    formFieldsJSX = (
    <View style={styles.inputView}>
      <List>
        <Picker
          style={{backgroundColor: '#2ecc71'}}
          title='Pick a Car'
          data={pickerData}
          cols={1}
          value={[this.state.carId]}
          onChange={(val) => this.setState({ carId: val[0] })}
          okText="Ok"
          dismissText="Cancel"
        >
        <List.Item arrow="horizontal">Choose Car:</List.Item>
        </Picker>
      </List>
      
      <SearchSelectInitiator
        onPress={this.handleSelectDescription}
        label="Service:"
        returnValue={this.state.serviceDescription}
      />

      <SearchSelectInitiator
        onPress={this.handleSelectProvider}
        label="Service Provider:"
        returnValue={this.state.serviceProvider}
      />

      <TextInput 
        style={styles.textInput}
        value={this.state.serviceCost}
        onChangeText={(text) => this.setState({ serviceCost: text })}
        placeholder="Service Cost"
        keyboardType="decimal-pad"
        returnKeyType="next"
        autoCapitalize="words"
        ref={(input) => this.cost = input}
        onSubmitEditing={() => this.provider.focus()}
      />

      <TextInput 
        style={styles.textInputMulti}
        value={this.state.serviceNote}
        onChangeText={(text) => this.setState({ serviceNote: text })}
        placeholder="Service Note"
        multiline={true}
        numberOfLines={2}
        autoCapitalize="sentences"
        ref={(input) => this.note = input}
      />    
      <View style={styles.dateContainer}>
        <DatePicker
          style={{width: '100%'}}
          showIcon={false}
          customStyles={{
            dateText: {
              fontSize: 20,
            }}
          }
          format="MM-DD-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          date={this.state.serviceDate}
          onDateChange={(date) => this.setState({ serviceDate: date })}
        /> 
      </View> 
    </View>
  );
    return (
        <KeyboardAvoidingView style={styles.mainView}>
          <View>
            {this.props.service ? 
              <Button 
                title='Update' 
                onPress={this.handleEditService} 
              />
            :
              <Button 
                title='Save' 
                onPress={this.handleAddService} 
              />
            }
          </View>
          <View>
            {formFieldsJSX}
          </View>
        </KeyboardAvoidingView>
    );
  }
  static propTypes = {
    cars: PropTypes.array,
    service: PropTypes.object,
    serviceDescriptions: PropTypes.array,
    serviceProviders: PropTypes.array,
    onAddService: PropTypes.func,
    onEditService: PropTypes.func
  }
}

const styles = EStyleSheet.create({
  mainView: {
    backgroundColor: '$inputBgColor',
    height: '100%'
  },
  carContainer: {
    backgroundColor: () => Color(EStyleSheet.value('$inputBgColor')).lighten(0.5).hex()
  },
  selectContainer:{
    backgroundColor: () => Color(EStyleSheet.value('$inputBgColor')).lighten(0.5).hex(),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  inputView: {
    marginVertical: 5,
  },
  selectInput: {
    height: '$inputBoxSize',
    fontSize: 18,
    // marginLeft: 5,
    // marginRight: 5,
    padding: 5,
    // borderRadius: 10,
    backgroundColor: () => Color(EStyleSheet.value('$inputBgColor')).lighten(0.5).hex(),
  },
  textInput: {
    height: '$inputBoxSize',
    fontSize: 18,
    marginTop: 5,
    // marginLeft: 5,
    // marginRight: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    // borderRadius: 10,
    backgroundColor: () => Color(EStyleSheet.value('$inputBgColor')).lighten(0.5).hex(),
  },
  textInputMulti: {
    height: '$inputBoxSize * 2',
    fontSize: 18,
    marginTop: 5,
    // marginLeft: 5,
    // marginRight: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    // borderRadius: 10,
    backgroundColor: () => Color(EStyleSheet.value('$inputBgColor')).lighten(0.5).hex(),
  },
  dateContainer: {
    marginTop: 5,
    // marginLeft: 5,
    // marginRight: 5,
    backgroundColor: () => Color(EStyleSheet.value('$inputBgColor')).lighten(0.5).hex(),
  },
  dateText: {
    fontSize: 18,
  },
});
export default AddService;