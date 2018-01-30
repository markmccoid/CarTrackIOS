import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchSelectInitiator = (props) => {
  
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
    <View style={styles.selectContainer}>
      <Text style={styles.selectInput}>{props.label} {props.returnValue} </Text>
      <Icon name='ios-arrow-forward' size={20} />
    </View>
  </TouchableWithoutFeedback>
  );
};

SearchSelectInitiator.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string,
  returnValue: PropTypes.string,
}

const styles = StyleSheet.create({
  selectContainer:{
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  selectInput: {
    height: 38,
    fontSize: 18,
    // marginLeft: 5,
    // marginRight: 5,
    padding: 5,
    // borderRadius: 10,
    backgroundColor: '#fff',
  },
});

export default SearchSelectInitiator;