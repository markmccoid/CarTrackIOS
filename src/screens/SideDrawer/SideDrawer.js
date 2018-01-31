import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class SideDrawer extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>Side Drawer</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 30,

  }
});

export default SideDrawer;