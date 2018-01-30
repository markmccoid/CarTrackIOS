import React from 'react';
import PropTypes from 'prop-types';
import SearchSelect from '../../components/SelectScreen/SearchSelect';

const SearchSelectScreen = (props) => {
  return (
    <SearchSelect 
      onReturnService={props.onReturnService}
      selectItems={props.selectItems}
      title={props.title}
      selectButtonText={props.selectButtonText}
    />
  );
};

export default SearchSelectScreen;

// import React from 'react';
// import PropTypes from 'prop-types';
// import { View, Text, 
//   TouchableOpacity, FlatList, 
//   Button, TextInput } from 'react-native';
// import EStyleSheet from 'react-native-extended-stylesheet';

// class SelectScreenBase extends React.Component {
//   static propTypes = {
//     onReturnService: PropTypes.func,
//     selectItems: PropTypes.array,
//     title: PropTypes.string,
//     selectButtonText: PropTypes.string,
//   }
  
//   state = {
//     selectItem: '',
//     flatListData: this.props.selectItems.map((item, idx) => ({ selectItem: item, key: idx }))
//   }
//   componentDidMount() {
//     this.serviceInput.focus();
//   }
//   searchDescriptions = (searchText, selectItems) => {
//     // Remove special characters
//     searchText = searchText.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
//     console.log(searchText)
//     if (searchText) {
//       let reSearchString = new RegExp(searchText, "g");
//       console.log(selectItems.filter(item => item.match(reSearchString)));
//       this.setState( { 
//           selectItem: searchText,
//           flatListData: selectItems.filter(item => item.match(reSearchString))
//           .map((item, idx) => ({ selectItem: item, key: idx }))
//         }
//       );
//     } else {
//       this.setState({
//         selectItem: '',
//         flatListData: selectItems.map((item, idx) => ({ selectItem: item, key: idx }))
//       });
//     }
//   }
//   keyGenerator = (arr) => {
//     return arr.map((item, idx) => ({ selectItem: item, key: idx }))
//   }
//   render() {
//     const { onReturnService, selectItems } = this.props;
//     return (
//       <View>
//         {/* <Text style={styles.title}>Select Or Add A Service</Text> */}
//         <View style={styles.inputContainer}>
//           <TextInput 
//             style={styles.inputBox}
//             value={this.state.selectItem}
//             autoCapitalize="words"
//             onChangeText={(inputText) => this.searchDescriptions(inputText, selectItems)}
//             ref={(input) => this.serviceInput = input}
//             returnKeyType="done"
//             onSubmitEditing={() => onReturnService(this.state.selectItem)}
//           />
//           <Button title='Save' onPress={() => onReturnService(this.state.selectItem)} />
//         </View>
//         <View style={styles.listItemContainer}>
//           <FlatList 
//             data={this.state.flatListData}
//             renderItem={({ item }) => {
//               return (
//                 <TouchableOpacity onPress={() => this.setState({ selectItem: item.selectItem })}>
//                   <Text style={styles.listItem}>{item.selectItem}</Text>
//                 </TouchableOpacity>
//               );
//               }
//             }
//           />
//         </View>        
//       </View>
//     );
//   }
// }

// const styles = EStyleSheet.create({
//   title: {
//     margin: 10,
//     textAlign: 'center',
//     fontSize: '$fontSizeHeader',
//   },
//   inputContainer: {
//     backgroundColor: '#2ecc71',
//     borderBottomColor: '#999',
//     borderBottomWidth: EStyleSheet.hairlineWidth,
//     flexDirection: 'row',
//     padding: 5,
//   },
//   inputBox: {
//     backgroundColor: 'white',
//     borderColor: '#999',
//     borderWidth: 1,
//     marginVertical: 5,
//     marginHorizontal: 10,
//     padding: 5,
//     width: '75%',
//   },
//   listItemContainer: {
//     height: '100%',
//   },
//   listItem: {
//     backgroundColor: '#eee',
//     borderColor: '#aaa',
//     borderWidth: EStyleSheet.hairlineWidth,
//     padding: 5,
//   }
// });

// export default SelectScreenBase;