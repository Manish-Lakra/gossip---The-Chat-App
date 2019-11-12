import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { Swiper, TitleBar, TabBar } from 'react-native-awesome-viewpager';
import Profile from './ProfileScreen'
import Chat from '../components/Chat'
 import FriendList from '../screens/FriendList'
import { GiftedChat } from "react-native-gifted-chat";
import Firebase from "../Firebase";



export default class Home extends Component {
  
  static navigationOptions = {
    title: "Home",
    headerTitle: "Home"
  };
  
  
  state = {
    scrollEnabled: true,
    type: 1,
  }

  render() {
    return (
    
    
    
    <TitleBar
          style={styles.container}
          titles={[ 'FriendList', 'Profile'] }>
          {/* <View>
            <Chat myProps = {this.props} />
            
          </View> */}
          <View>
            <FriendList myProps = {this.props} />
          </View>
          <View>
           <Profile myProps = {this.props} />
          </View>
        </TitleBar>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efdeed',
    flexDirection: 'column',
    
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});