import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { firebase } from '../../firebase/firebase';

class LoginForm extends React.Component {
  static propTypes = { 
    setStatusError: PropTypes.func,  
    startLogin: PropTypes.func,  
    authStatus: PropTypes.string,
  }
  state = {
    emailInput: null,
    passwordInput: null
  }
  onLogin = () => {
    const { emailInput, passwordInput } = this.state;
    if (!emailInput || !passwordInput) {
      this.props.setStatusError('Email and/or Password cannot be empty.');
      return;
    }
    //Log in
    this.props.startLogin(emailInput, passwordInput);
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="rgba(255,255,255,0.7)"
          returnKeyType="next"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => this.setState({ emailInput: text })}
          onSubmitEditing={() => this.passwordInput.focus()}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="rgba(255,255,255,0.7)"
          secureTextEntry
          returnKeyType="go"
          onChangeText={(text) => this.setState({ passwordInput: text })}
          ref={(input) => this.passwordInput = input}
          style={styles.input}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={this.onLogin}>
          <Text style={styles.buttonText}>
            LOGIN
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "#fff",
  },
  buttonContainer: {
    backgroundColor: 'green',
    paddingVertical: 10,
    marginTop: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default LoginForm;
