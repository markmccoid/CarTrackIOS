import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import Swipeout from 'react-native-swipeout';

import { firebase } from '../firebase/firebase';
import ServiceItem from './ServiceItem';
import ServiceFilter from './ServiceFilter';

class ServiceList extends React.Component {
  static propTypes = {
    services: PropTypes.array,
    onRemoveService: PropTypes.func,
  }
  state = {
    activeRow: null,
    close: null,
    rowId: null,
  }

  onLogout = () => {
    firebase.auth().signOut()
      .then(() => console.log('Signed Out'));
  }

  render() {
    // Swipeout Buttons
    var swipeoutBtns = [
      {
        text: 'Edit',
        type: 'primary',
        onPress: () => this.props.showEditServiceScreen(this.state.activeRow)
      },
      {
        text: 'Delete',
        type: 'delete',
        onPress: () => this.props.onRemoveService(this.state.activeRow)
      },
    ];
    return (
      <View style={styles.mainContainer}>
        <FlatList
          data={this.props.services}
          //extraData is passed so FlatList rerenders when the activeRow changes
          extraData={this.state.activeRow}
          renderItem={({item, index}) => {
            return (
              <Swipeout
                close={(this.state.activeRow !== item.id)}
                right={swipeoutBtns}
                autoClose={true}
                rowID={index}
                backgroundColor="#ff3b30"
                // set state.activeRow to the carId (item.id)
                onOpen={(sectionId, rowId) => {
                  console.log('RowId State: index', this.state.rowId, index);
                  this.setState({ activeRow: item.id, rowId: index});
                  }
                }
                onClose={(sectionId, rowId, direction) => {
                    if (item.id === this.state.activeRow && typeof direction !== 'undefined') {
                      this.setState({ activeRow: null });
                    } 
                  }
                }
              >
                <ServiceItem serviceData={item}/>
              </Swipeout>
              );
            }
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    //height: '100%',
  },  
  flatlistView: {
    marginBottom: 30,
  },  
  floatView: {
    position: 'absolute',
    width:100,
    height: 100, 
    top: 200,
    left: 40,
    backgroundColor: 'green',
  }
});

export default ServiceList;
