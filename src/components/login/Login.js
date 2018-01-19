import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image, Text, View, StatusBar, KeyboardAvoidingView, ActivityIndicator, StyleSheet } from 'react-native';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const ErrorText = (props) => {
  console.log('ERRORTEXT', props)
  if (props.authStatus === 'error') {
    return (
      <View style={{ alignItems: 'center'}}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: 'red' }}>'Error Logging In'</Text>
        <Text style={{ fontSize: 18, fontWeight: '600', color: 'red' }}>{props.errorMsg}</Text>
      </View>
    );
  }
  return null;
};

class Login extends React.Component {
  static propTypes = {
    setStatusComplete: PropTypes.func,
    setStatusLoading: PropTypes.func,  
    setStatusError: PropTypes.func, 
    startLogin: PropTypes.func, 
    authStatus: PropTypes.string,
    authMsg: PropTypes.string,
  }
  state = {
    registering: false,
  };
// Login component initially shows the LoginForm and a button to go
// to RegisterForm to register email address.
// Uses state field "registering" to determine which form to show.
  render() {
    const buildLoginRegisterJSX = () => {
      if (this.props.authStatus === 'loading') {
        return null;
      }
      // If not loading, check to see if registering or logging in
      if (this.state.registering) {
        return ([
          <RegisterForm 
            key={1}
            setStatusComplete={this.props.setStatusComplete}
            setStatusLoading={this.props.setStatusLoading}
            authStatus={this.props.authStatus}
          />,
          <Button key={2} title="Login" onPress={() => this.setState({ registering: false })}/>
        ]);
      } else {   
        return (
          [
            <ErrorText key={1} authStatus={this.props.authStatus} errorMsg={this.props.authMsg} />,
            <LoginForm 
              key={2}
              setStatusError={this.props.setStatusError}
              startLogin={this.props.startLogin}
              authStatus={this.props.authStatus}
            />,
            <Button key={3} title="Register" onPress={() => this.setState({ registering: true })}/>
          ]
        );
      }
    };
  
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../images/CarTracker.png')}
          />
          <Text style={styles.title}>Car Tracker</Text>
          <ActivityIndicator size="large" color="black" animating={this.props.authStatus === 'loading'} />
        </View>
        <View style={styles.formContainer}>
          {buildLoginRegisterJSX()}
        </View>

      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#27ae60"
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    opacity: .9,
  },
  formContainer: {

  }
});

export default Login;
