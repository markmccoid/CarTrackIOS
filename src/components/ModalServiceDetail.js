import React from 'react';
import { Modal, View, Text, StyleSheet, Button } from 'react-native'; 

const ModalServiceDetail = (props) => {
  let modalContent = null;
  if (props.selectedService) {
    let { dateOfServiceFormatted = '', serviceCostFormatted = '', 
          servicePerformed = '', serviceProvider = '' } = props.selectedService;
    let { make = '', model = '' } = props.selectedService.carDetail;
    modalContent = (
      <View>
        <Text>{`${make}-${model}`}</Text>
        <Text>{`${serviceProvider}-${servicePerformed}`}</Text>
      </View>
    )
  }
  return (
    <Modal visible={props.selectedService !== null}>
      <View>
        {modalContent}
      </View>
      <View>
        <Button title='Close' onPress={props.onModalClose}/>
      </View>
    </Modal>
  )
}

export default ModalServiceDetail;