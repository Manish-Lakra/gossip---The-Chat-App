import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation'
import FBSDK, { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import * as firebase from 'firebase';

import SignIn from '../screens/SignIn'
import Signup from '../screens/Signup'
import LoadingScreen from '../screens/LoadingScreen'
import Home from '../screens/Home'
import Chat from '../components/Chat'


// var firebaseConfig = {
//   apiKey: "AIzaSyDFfZNwM3WspwsvZ7BUIhVyRy2Jr_70P34",
//   authDomain: "gossip-ac3b4.firebaseapp.com",
//   databaseURL: "https://gossip-ac3b4.firebaseio.com",
//   projectId: "gossip-ac3b4",
//   storageBucket: "gossip-ac3b4.appspot.com",
//   messagingSenderId: "848304345255",
//   appId: "1:848304345255:web:b732b4c09f65072e"
// };

// firebase.initializeApp(firebaseConfig);



const MainNavigator = createStackNavigator(
  
  {
    LoadingScreen: {screen : LoadingScreen },
    SignIn: {screen : SignIn },
    Signup: {screen : Signup },
    Home: {screen : Home },
    Chat: {screen : Chat }
},
{
  initialRouteName: "LoadingScreen"
}
)

//const App = createAppContainer(MainNavigator)
export default createAppContainer(MainNavigator);