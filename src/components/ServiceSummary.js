import React from 'react';
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native';
import EStylesSheet from 'react-native-extended-stylesheet';
import { serviceSummary } from '../store/serviceSummary';

const ServiceSummary = (props) => {
  let summary = serviceSummary(props.services);
  //Summary object
  // totalAmount
  // lastOilChange.carNickName
  // lastOilChange.serviceDate
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.text}>Total Service Cost: {summary.totalAmount}</Text>
      {summary.lastOilChange ? 
        <Text style={styles.text}>{`Last Oil Change: ${summary.lastOilChange.carNickName} on ${summary.lastOilChange.serviceDate}`}</Text>
        :
        null
      }
    </View>
  )
};

const styles = EStylesSheet.create({
  errorContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#ccc',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  }
})
export default ServiceSummary;