import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';

import { startLogin, setStatusLoading, setStatusComplete, setStatusError } from '../../actions/auth';
import startTabs from '../mainTabs/startMainTab';
import Login from '../../components/login/Login';

class AuthScreen extends React.Component {

  render() {
    return (
        <Login 
          setStatusComplete={this.props.setStatusComplete}
          setStatusLoading={this.props.setStatusLoading}
          setStatusError={this.props.setStatusError}
          startLogin={this.props.startLogin}
          authStatus={this.props.auth.status}
          authMsg={this.props.auth.msg}
        />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, {
  setStatusLoading: setStatusLoading,
  setStatusComplete: setStatusComplete,
  setStatusError: setStatusError,
  startLogin: startLogin,
})(AuthScreen);

// {/* <Text>Auth Screen</Text>
//         <Button title='Login' onPress={this.loginHandler} /> */}