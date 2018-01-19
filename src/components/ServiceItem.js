import React from 'react';
import PropTypes from 'prop-types'; 
import { StyleSheet, View, Text } from 'react-native';

class ServiceItem extends React.Component {
  static propTypes = {
    serviceData: PropTypes.object
  }
  render() {
    let { serviceDescription, 
      serviceCostFormatted, 
      serviceDateFormatted, 
      serviceNote, 
      carDetail } = this.props.serviceData;

    return (
      
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{carDetail.nickName}</Text>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{serviceDescription}</Text>
          <Text style={styles.headerText}>{serviceDateFormatted}</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.noteText}>{serviceNote}</Text>
          <Text>{serviceCostFormatted}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: '#edf0f5'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bodyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noteText: {
    width: '70%'
  }
});

export default ServiceItem;