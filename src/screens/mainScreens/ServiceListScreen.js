import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, FlatList } from 'react-native';

import ServiceList from '../../components/ServiceList';
import ServiceFilter from '../../components/ServiceFilter';
import ServiceSummary from '../../components/ServiceSummary';

import { hydrateServices } from '../../utils';
import { firebase } from '../../firebase/firebase';

import serviceSelector from '../../store/serviceSelector';
import { startRemoveService } from '../../actions/services';
import { setTextFilter, setCarFilter, setDrawerContents } from '../../actions/filters';

class ServiceListScreen extends React.Component {
  constructor(props) {
    super(props);
    // To listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  // // Icons in header
  // static navigatorButtons = {
  //   rightButtons: [
  //     {
  //       systemItem: 'add', // for icon button, provide the local image asset name
  //       id: 'add', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
  //     }
  //   ],

  // };

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type === 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id === 'add') { // this is the same id field from the static navigatorButtons definition
        //AlertIOS.alert('NavBar', 'Add button pressed');
        //Push Add Service Screen
        this.props.navigator.push({
          screen: 'car-tracker.AddServiceScreen',
          title: 'Add Service',
          animated: true,
          animationType: 'fade',
        });
      }
      if(event.id === 'side-drawer') {
        this.props.setDrawerContents('service');
        this.props.navigator.toggleDrawer({
          side: 'left',
        });
        // firebase.auth().signOut()
        //   .then(() => console.log('Signed Out'));
      }
    }
  }

  showEditServiceScreen = (serviceId) => {
    //Push Add/Edit Service Screen
    this.props.navigator.push({
      screen: 'car-tracker.AddServiceScreen',
      title: 'Edit Service',
      animated: true,
      animationType: 'fade',
      passProps: { serviceId },
    });
  }
  render() {
    this.props.navigator.setStyle({
      drawUnderTabBar: false,
      drawUnderNavBar: false
    });
    // package up props needed for servicefilter
    const serviceFilterProps = {
      carData: this.props.cars,
      serviceFilter: this.props.filters.text,
      carFilterId: this.props.filters.carFilterId,
      onServiceFilter: this.props.onServiceFilter,
      onClearServiceFilter: this.props.onClearServiceFilter,
      onCarFilter: this.props.onCarFilter,
    }
    // Build new array with car details
    let newServiceArray = hydrateServices(this.props.services, this.props.cars);
    console.log(this.props.cars)
    if (newServiceArray.length === 0 && this.props.cars.length === 0) {
      return (
        <View>
          <ServiceFilter serviceFilterProps={serviceFilterProps}/>
          <Text>
            To Begin - Touch the "Cars" tab and Add a Car (+ in right corner), 
            then touch the "Services" tab and Add Service Records (+ in right corner).
          </Text>
        </View>
      )
    } else if (newServiceArray.length === 0 && this.props.cars.length !== 0) {
      return (
        <View>
          <ServiceFilter serviceFilterProps={serviceFilterProps}/>
          <Text>
            There are no services for the selected car, Add Service Records (+ in right corner).
          </Text>
        </View>
      )
    }
    //TEST Nested FlatList
    let ComponentData = [
      <ServiceSummary key={2} services={newServiceArray}/>,
      <View key={3} style={{ paddingBottom: 45, }}>
        <ServiceList 
          services={newServiceArray} 
          onRemoveService={this.props.onRemoveService}
          showEditServiceScreen={this.showEditServiceScreen}
        />
      </View>
      ];
      return (
        <View>
          <ServiceFilter serviceFilterProps={serviceFilterProps}/>
          <FlatList
            data={ComponentData}
            renderItem={({ item }) => (item)}
          />
        </View>
      );

    //--------------------
    // return (
    //   <View style={{ flex: 1,alignItems: 'stretch' }}>
    //   <ServiceSummary services={newServiceArray}/>
    //     <ServiceFilter serviceFilterProps={serviceFilterProps}/>
        
    //     <View style={{ paddingBottom: 45, }}>
    //       <ServiceList 
    //         services={newServiceArray} 
    //         onRemoveService={this.props.onRemoveService}
    //         showEditServiceScreen={this.showEditServiceScreen}
    //       />
    //     </View>
    //   </View>
    // );
  }
}

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

export default connect(mapStateToProps, { 
  onRemoveService: startRemoveService,
  onServiceFilter: setTextFilter,
  onCarFilter: setCarFilter,
  setDrawerContents: setDrawerContents
})(ServiceListScreen);