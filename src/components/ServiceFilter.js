import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, 
  TextInput, Dimensions, Button } from 'react-native';
import { Picker, Item } from 'native-base';


class ServiceFilter extends React.Component {
  static propTypes = {
    carData: PropTypes.array,
    serviceFilter: PropTypes.string,
    carFilterId: PropTypes.string,
    onServiceFilter: PropTypes.func,
    onCarFilter: PropTypes.func,
  }

  render() {
    let { carData,
      serviceFilter,
      carFilterId,
      onServiceFilter,
      onClearServiceFilter,
      onCarFilter } = this.props.serviceFilterProps;
    return (
        <View style={styles.filterView}>
          {/* <SearchBar 
            lightTheme={true}
            placeholder='Search Service'
            onChangeText={(text) => this.props.onFilter(text)}
          /> */}
        
          <TextInput style={styles.filterInput}
            placeholder='Search Services'
            value={serviceFilter}
            onChangeText={(text) => onServiceFilter(text)}
          />
          <Button
            title='Clear'
            onPress={() => {
              onServiceFilter('');
              onCarFilter('');
            }}
          />
          <Picker
            mode="dropdown"
            placeholder="Filter Cars"
            selectedValue={carFilterId}
            onValueChange={(value) => onCarFilter(value)}
          >
            {carData.map(car => {
              return <Item key={car.id}label={car.nickName} value={car.id} />
            })}
          </Picker>
        </View>
    );
  }
}
let { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  filterView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderBottomColor: '#34495e',
    borderBottomWidth: 1,
    borderTopColor: '#34495e',
    borderTopWidth: 1,
  },
  filterInput: {
    width: '40%',
    height: 25,
    paddingLeft: 5,
    backgroundColor: '#eee',
  },
  picker: {
    width: width / 2.2,
    borderWidth: 1,
    borderColor: 'red',
    padding: 5, 
    height: 50,
  }
});
export default ServiceFilter;