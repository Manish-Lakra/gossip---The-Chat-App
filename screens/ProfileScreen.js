import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground} from "react-native";
import { Button } from "native-base";
import * as firebase from "firebase";
import { StackActions, NavigationActions } from 'react-navigation';


export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      userimage: '',
    };
  }
  static navigationOptions = {
    title: "Home",
    headerTitle: "Chat"
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(authenticate => {
      if (authenticate) {
        this.setState({
          email: authenticate.email,
          name: authenticate.displayName,
          userimage: authenticate.photoURL,
          phone: authenticate.phoneNumber
        });
      } else {
        this.props.myProps.navigation.replace("SignIn");
      }
    });
    // this.setState({
    //   userimage: this.props.myprops.navigation.state.params.userData.imageUrl
    // })
  }

  signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Sign out");
        alert('You are sign-out');
      })
      .catch(error => alert(error.message));
  };

  render() {
    debugger;
    console.log(this.state.userimage)
    return (
      <View style={styles.container}>
        
        <ImageBackground source={require("../assets/Images/backgroung.png")} style={{ width: '100%', height: '100%' }}>
        <View  style={{backgroundColor:'#DAE0E299'}}>
        <View  >
        <View >
        <Image style={{ width: 250, height: 250, borderRadius: 250 / 2, margin: 30, alignSelf: 'center' }}
                source={  { uri: this.state.userimage }
                
                }
                
                defaultSource = {require("../assets/Icons/user.png")} 
              />
          
          
        </View>
        <View style={styles.userDetails}>
          <Text style={{fontSize:30, color:'#E74292', fontWeight:'600'}}>Hey {this.state.name}</Text>
          <Text style={{fontSize:20, color:'#2B2B52', fontWeight:'500', marginTop:15}}>Email: {this.state.email}</Text>
          <Text style={{fontSize:20, color:'#2B2B52', fontWeight:'500',marginTop:5}}>Phone Number: {this.state.phone}</Text>
        </View>
        <Button
          style={styles.button}
          full
          rounded
          success
          onPress={() => {
            this.signOutUser();
          }}
        >
          <Text style={styles.buttonText}>SignOut</Text>
        </Button>

        </View>
        </View>
        </ImageBackground>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  

  },
  logoContainer: {
    alignItems: "center",
    marginTop: 100,
    marginBottom: 100
  },
  userDetails: {
    marginTop: 70,
    alignSelf:'center'
    
  },

  button: {
    marginTop: 20
  },
  photoButton:{
    marginLeft:135
  },
  buttonText: {
    color: "#fff"
  }
});
