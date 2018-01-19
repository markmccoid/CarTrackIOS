import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

class CarItem extends React.Component {
  render() {
    let { nickName, make, model, year, VIN, licensePlate } = this.props.carData;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{nickName}</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={[styles.bodyText, styles.headerText]}>{make}</Text>
          <Text style={[styles.bodyText, styles.headerText]}>{model}</Text>
        </View>
        <View style={styles.carDetail}>
          <View style={styles.carSubDetail}>
            <Text style={styles.bodyText}>VIN:</Text>
            <Text style={styles.bodyText}>{VIN}</Text>
          </View>
          <View style={styles.carSubDetail}>
            <Text style={styles.bodyText}>License Plate:</Text>
            <Text style={styles.bodyText}>{licensePlate}</Text>
          </View>
        </View>
      </View>
    )
  }
  static propTypes = {
    carData: PropTypes.object
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
  bodyText: {
    fontSize: 14,
    paddingRight: 10,
  },
  bodyContainer: {
    flexDirection: 'row',
  },
  carDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  carSubDetail: {
    flexDirection: 'row',
    paddingRight: 10,
  },
});


export default CarItem;