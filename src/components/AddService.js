import React from 'react';
import PropTypes from 'prop-types';
import { Modal, View, Text, 
  StyleSheet, Button, TextInput } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';
import { Picker, List } from 'antd-mobile'; 
import moment from 'moment';
// https://github.com/xgfe/react-native-datepicker
import DatePicker from 'react-native-datepicker'


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
    console.log(this.state.serviceCost);
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
        <List.Item arrow="horizontal">Choose Car</List.Item>
        </Picker>
      </List>
        {/* <PickerIOS
          style={{width: 200, height: 44, margin: 0}}
          itemStyle={{fontSize: 15}}
          selectedValue="12345"
          onValueChange={(itemValue, itemIndex) => console.log(itemValue, itemIndex)}  
        >
          <PickerIOS.Item label="Tesla" value="12345" />
          <PickerIOS.Item label="Versa" value="12445" />
        </PickerIOS> */}

      <TextInput 
        style={styles.textInput}
        value={this.state.serviceDescription}
        onChangeText={(text) => this.setState({ serviceDescription: text })}
        placeholder="Service Description"
        returnKeyType="next"
        autoCapitalize="words"
        onSubmitEditing={() => this.cost.focus()}
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
        style={styles.textInput}
        value={this.state.serviceProvider}
        onChangeText={(text) => this.setState({ serviceProvider: text })}
        placeholder="Service Provider"
        returnKeyType="next"
        autoCapitalize="words"
        ref={(input) => this.provider = input}
        onSubmitEditing={() => this.note.focus()}
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
        <View style={styles.mainView}>
          <View>
            {formFieldsJSX}
          </View>
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
        </View>
    );
  }
  static propTypes = {
    cars: PropTypes.array,
    service: PropTypes.object,
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
  inputView: {
    marginVertical: 5,
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
  dateContainer: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: () => Color(EStyleSheet.value('$inputBgColor')).lighten(0.5).hex(),
  },
  dateText: {
    fontSize: 24,
  },
});
export default AddService;