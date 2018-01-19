import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { firebase } from '../../firebase/firebase';

class RegisterForm extends React.Component {
  state = {
    emailInput: null,
    passwordInput: null,
    confirmPasswordInput: null,
    errorMsg: null
  };

  onRegisterPress = () => {
    const { emailInput, passwordInput, confirmPasswordInput } = this.state;
    // Check password and confirmpasswords, make sure they match
    if (passwordInput !== confirmPasswordInput) {
      this.setState({
        errorMsg: 'Passwords do not match'
      });
      return;
    }
    // Validations passed
    // Call firebase auth
    firebase.auth().createUserWithEmailAndPassword(emailInput, passwordInput)
      .catch((err) => console.log(`Error creating user: ${err}`));
      
    this.setState({
      errorMsg: null
    });
    console.log(this.state.emailInput);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        {this.state.errorMsg && <Text>{this.state.errorMsg}</Text>}
        <TextInput
          placeholder="Email"
          placeholderTextColor="rgba(255,255,255,0.7)"
          returnKeyType="next"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => this.setState({ emailInput: text })}
          value={this.state.emailInput}
          onSubmitEditing={() => this.passwordInput.focus()}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="rgba(255,255,255,0.7)"
          secureTextEntry
          onChangeText={(text) => this.setState({ passwordInput: text })}
          value={this.state.passwordInput}
          returnKeyType="next"
          ref={(input) => this.passwordInput = input}
          onSubmitEditing={() => this.confirmPasswordInput.focus()}
          style={styles.input}
        />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="rgba(255,255,255,0.7)"
          secureTextEntry
          onChangeText={(text) => this.setState({ confirmPasswordInput: text })}
          value={this.state.confirmPasswordInput}
          returnKeyType="go"
          ref={(input) => this.confirmPasswordInput = input}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onRegisterPress}
        >
          <Text style={styles.buttonText}>
            REGISTER
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  }
});

export default RegisterForm;
