import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'; 

const ServiceDetail = (props) => {
  // let modalContent = null;
  // if (props.selectedService) {
  //   let { dateOfServiceFormatted = '', serviceCostFormatted = '', 
  //         servicePerformed = '', serviceProvider = '' } = props.selectedService;
  //   let { make = '', model = '' } = props.selectedService.carDetail;
  //   modalContent = (
  //     <View>
  //       <Text>{`${make}-${model}`}</Text>
  //       <Text>{`${serviceProvider}-${servicePerformed}`}</Text>
  //     </View>
  //   )
  // }
  console.log(props);
  return (
    <View>
      <View>
        <Text>SERVICE DETAILS - </Text>
      </View>
      <View>
        <Button title='Close' onPress={() => props.history.goBack()}/>
      </View>
    </View>
  )
}

export default ServiceDetail;