import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';

import AddService from '../../components/AddService';
import { startAddService, startEditService } from '../../actions/services';

class AddServiceScreen extends React.Component {
  handleAddService = (serviceObj) => {
    this.props.addService(serviceObj)
    this.props.navigator.pop({
      animated: true, // does the pop have transition animation or does it happen immediately (optional)
      animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
    });
  }

  handleEditService = (serviceId, serviceObj) => {
    this.props.editService(serviceId, serviceObj)
    this.props.navigator.pop({
      animated: true, // does the pop have transition animation or does it happen immediately (optional)
      animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
    });
  }
  render() {
    return (
      <View>
        <AddService 
          cars={this.props.cars}
          service={this.props.services.find(service => service.id === this.props.serviceId)}
          serviceDescriptions={this.props.services.map(service => service.serviceDescription)}
          serviceProviders={this.props.services.map(service => service.serviceProvider  )}
          onAddService={this.handleAddService}
          onEditService={this.handleEditService}
          navigator={this.props.navigator}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  services: state.services,
  cars: state.cars
});

export default connect(mapStateToProps, {
  addService: startAddService, 
  editService: startEditService 
})(AddServiceScreen);