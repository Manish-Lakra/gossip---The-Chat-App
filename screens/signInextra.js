import React, { Component } from 'react';
import { ScrollView, Platform, StyleSheet, Text, View, Button, ImageBackground, Alert, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomText from '../components/customText';
import Icon from '../assets/icons'
import FBSDK, { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import * as firebase from 'firebase';





type Props = {};
export default class SignIn extends Component<Props> {

  constructor(props) {
    super(props)
    this.state = {
      Email: '',
      Password: ''
    }
  }







  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.container}>
          {/* <ImageBackground source={require("../../assets/banners/waffle.jpg")} style={{ width: '100%', height: '100%' }}> */}


            <View style={{ flex: 0.4 }}></View>


            <View style={styles.lumoScreen}>

              <CustomText style={styles.textinput}
                lefticon={{ source: Icon.email }}
                placeholder='Email '
                onChangeText={(Email) => this.setState({ Email })} />

              <CustomText style={styles.textinput}
                lefticon={{ source: Icon.password }}
                placeholder='Password'
                onChangeText={(Password) => this.setState({ Password })} />

            </View>
            <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity style={styles.button}
                // onPress={async () => {
                //   this.loginPressed(this);
                // }}
                >
                <Text style={{ color: 'white', fontSize: 20 }}>
                  Login</Text>
              </TouchableOpacity>
              
              <Button
                title='Signup'
                onPress={() => { this.props.navigation.navigate('Signup') }}
              />
            </View>

          {/* </ImageBackground> */}

          <View>

          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  lumoScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF15',

  },
  textinput: {
    flex: 0.17,
    paddingLeft: 10,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'black',
    marginTop: 10,
    marginBottom: 15,
    margin: 20,
    backgroundColor: '#FFFFFF',
    width: '80%',
    height: 18,
    borderRadius: 10

  },

  button: {
    backgroundColor: '#218F76',
    borderRadius: 10,
    width: 200,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white'


  }

});

