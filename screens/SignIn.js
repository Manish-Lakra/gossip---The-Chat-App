import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import * as firebase from "firebase";
import { Form, Item, Input, Label, Button } from "native-base";

export default class SigninScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  static navigationOptions = {
    title: "SignIn",
    headerTitle: "SignIn",
    header: null
  };

  signInUser = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.replace("Home");
      })
      .catch(error => {
        alert(error.message);
      });
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="position"
        enabled
      >
        <View>
        <ImageBackground source={require("../assets/Images/gossip-design-logo.png")} style={{ width: '100%', height: '100%' }}>
        
        <View style={styles.logoContainer}>
        
          <Image source={require("../assets/Icons/logo.png")} />
          <Text>gossip </Text>
        </View>
        <Form style={styles.form}>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={email => this.setState({ email })}
            />
          </Item>
          <Item floatingLabel>
            <Label>password</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={password => this.setState({ password })}
            />
          </Item>
          <Button
            style={styles.button}
            full
            rounded
            onPress={() => {
              this.signInUser(this.state.email, this.state.password);
            }}
          >
            <Text style={styles.buttonText}>Sign in</Text>
          </Button>
        </Form>
        <View style={styles.footer}>
          <Text>OR</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Signup");
            }}
          >
            <Text>Create a new Account </Text>
          </TouchableOpacity>
          
        </View>
        </ImageBackground>
        </View>
        
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 100,
    marginBottom: 100
  },
  form: {
    padding: 20,
    width: "100%",
    marginBottom: 30
  },
  button: {
    marginTop: 50
  },
  buttonText: {
    color: "#fff"
  },
  footer: {
    alignItems: "center"
  }
});
