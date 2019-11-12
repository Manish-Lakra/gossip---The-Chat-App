import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, ActivityIndicator} from 'react-native';
import FBSDK, { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import * as firebase from 'firebase';






export default class LoadingScreen extends Component<Props> {

  static navigationOptions = {
    title: "Loading",
    header: null
  };

  componentDidMount= async ()=> {
    firebase.auth().onAuthStateChanged(authenticate => {
      console.log(JSON.stringify(authenticate))
      if (authenticate && authenticate.email !== 'null' && authenticate.isAnonymous != true) {
        this.props.navigation.replace("Home");
      } else {
        this.props.navigation.replace("SignIn");
      }
    });
    
  }



  render() {
    return (
      <View style={styles.container}>
      <View>
       
      <ActivityIndicator size="large" />
      </View>
      
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
