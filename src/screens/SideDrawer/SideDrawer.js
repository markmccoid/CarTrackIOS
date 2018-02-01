import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { sortByDate, sortByAmount } from '../../actions/filters';
import { startLogout } from '../../actions/auth';
import Icon from 'react-native-vector-icons/Ionicons';


class SideDrawer extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.optionsContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Sort Options</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.props.sortByDate}>
              <Icon 
                style={styles.icon} 
                name={this.props.filters.sortBy === 'amount' ? 'ios-radio-button-off' : 'ios-checkmark-circle'} 
                size={20} 
              />
            </TouchableOpacity>
            <Button 
              color={this.props.filters.sortBy === 'date' ? 'green' : 'blue'}
              title='Sort by Date'
              onPress={this.props.sortByDate} 
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.props.sortByAmount}>
              <Icon 
                style={styles.icon} 
                name={this.props.filters.sortBy === 'date' ? 'ios-radio-button-off' : 'ios-checkmark-circle'} 
                size={20} 
              />
            </TouchableOpacity>
            <Button 
              color={this.props.filters.sortBy === 'amount' ? 'green' : 'blue'}
              title='Sort by Amount'
              onPress={this.props.sortByAmount} 
            />
          </View>
        </View>
        <View style={styles.logoutContainer}>
          <Button title='LOGOUT' onPress={this.props.startLogout} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 30,
    justifyContent: 'space-between'
  },
  optionsContainer: {
  },
  logoutContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  header: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 5,
  },
  headerText: {
    fontSize: 18,
    paddingLeft: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  icon: {
    margin: 10,
  }
});

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
  };
};

export default connect(mapStateToProps, {
  sortByDate: sortByDate,
  sortByAmount: sortByAmount,
  startLogout: startLogout
})(SideDrawer);