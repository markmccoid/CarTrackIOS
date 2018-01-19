import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Swipeout from 'react-native-swipeout';

import CarItem from './CarItem';

class CarList extends React.Component {
  state = {
    activeRow: null,
  }
  render() {
    // Buttons
    var swipeoutBtns = [
      {
        text: 'Edit',
        type: 'primary',
        onPress: () => this.props.showEditCarScreen(this.state.activeRow)
      },
      {
        text: 'Delete',
        type: 'delete',
        onPress: () => this.props.onCarDelete(this.state.activeRow)
      }
    ];

    // Add the key property to each object in the array: needed for flatlist
    let newCars = this.props.cars.map(carObj => ({ ...carObj, key: carObj.id }))
    return (
      <View style={styles.mainView}>
        <FlatList
          data={newCars}
          extraData={this.state.activeRow}
          renderItem={({item}) => {
            return (
              <Swipeout 
                right={swipeoutBtns}
                close={(this.state.activeRow !== item.id)}
                autoClose={true}
                backgroundColor="#ff3b30"
                // set state.activeRow to the carId (item.id)
                onOpen={(sectionID, rowId, direction) => this.setState({ activeRow: item.id })}
                onClose={(sectionId, rowId, direction) => {
                  if (item.id === this.state.activeRow && typeof direction !== 'undefined') {
                    this.setState({ activeRow: null });
                  } 
                }
              }
              >
                <CarItem carData={item}/>
              </Swipeout>
            );
            }
          }
        />
      </View>
    )
  }
  static propTypes = {
    cars: PropTypes.array
  }
}

const styles = StyleSheet.create({
  mainView:{
    height: '100%'
  },
});

export default CarList;