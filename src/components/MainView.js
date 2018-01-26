import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';

import { Button, Fab, Icon } from 'native-base';

import firebaseDB, { firebase } from '../firebase/firebase';
import ServiceItem from './ServiceItem';
import ModalServiceDetail from './ModalServiceDetail';
import ModalAddService from './ModalAddService';

class MainView extends React.Component {
  static propTypes = {
    services: PropTypes.array,
  }
  state = {
    selectedService: null,
    isAddingService: false,
  }

  onLogout = () => {
    firebase.auth().signOut()
      .then(() => console.log('Signed Out'));
  }
  //When adding a new record set isAddingService to true
  //ModalAddService Component will then be shown
  showAddScreen = () => {
    this.setState({
      isAddingService: true,
    });
  }

  handleServiceSelect = (serviceId) => {
    // let selectedService = this.props.services.find(service => service.id === serviceId);
    // console.log(selectedService);
    // this.setState({
    //   selectedService
    // });
    this.props.history.push('/servicedetails/serviceId');
  }

  
  render() {
    console.log('MainView', this.props);
    return (
      <View style={styles.mainContainer}>
        {/* <View style={styles.header}>
          <Text>Services</Text>
          <TouchableOpacity style={styles.addButton} onPress={this.showAddScreen}>
            <Icon name='add'/>
          </TouchableOpacity>
        </View> */}
        <FlatList
          data={this.props.services}
          renderItem={({item}) => {
            return (<TouchableOpacity onPress={() => this.handleServiceSelect(item.id)}>
              <ServiceItem serviceData={item}/>
            </TouchableOpacity>);
            }
          }
        />
        <View style={styles.floatView}>
          <Text> FLOATING </Text>
        </View>
        <Button block style={styles.button} onPress={this.onLogout}>
          <Text> Logout </Text>
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
  },  
  floatView: {
    position: 'absolute',
    width:100,
    height: 100, 
    top: 200,
    left: 40,
    backgroundColor: 'green',
  }
});

export default MainView;
