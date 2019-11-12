import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  ImageBackground,

} from "react-native";
import * as firebase from "firebase";
import uuid from "uuid";
import { Form, Item, Input, Label, Button } from "native-base";
import ImagePicker from 'react-native-image-picker';

export default class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      phone: "",
      uid: "",
      image: "empty",
      imageDownloadUrl: "empty",
      isUploading: false
    };
  }
  static navigationOptions = {
    title: "SignUp",
    header: null
  };

  signupUser = async (name, email, password, phone) => {

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(authenticate => {
        console.log('auth===' + authenticate)
        this.setState({ uid: authenticate.uid })
        return authenticate.user

          .updateProfile({
            displayName: name,
            photoURL: this.state.image,
            phoneNumber: phone

          })
          .then(async () => {

            if (
              this.state.name !== "" &&
              this.state.password !== "" &&
              this.state.phone !== "" &&
              this.state.email !== ""
            ) {
              this.setState({ isUploading: true });
              const dbReference = firebase.database().ref('users');
              const storageRef = firebase.storage().ref();


              if (this.state.image !== "empty") {
                const downloadUrl = await this.uploadImageAsync(

                  this.state.image,
                  storageRef

                );
                console.log(downloadUrl)
                this.setState({ imageDownloadUrl: downloadUrl });
                console.log(downloadUrl)
              }


              // save all values to an object

              var userDetails = {

                name: this.state.name,
                phone: this.state.phone,
                email: this.state.email,
                password: this.state.password,
                imageUrl: this.state.imageDownloadUrl,
                //uid: this.state.uid

              };
              console.log('userdetails' + userDetails)
              await dbReference.push(userDetails, error => {
                if (!error) {

                  return this.props.navigation.navigate("Home", {
                    userData: userDetails,


                  });
                }
              });


            }
          });
      })
      .catch(error => {
        alert(error.message);
      });





  };



  //TODO: pick image from gallery
  chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey', title: 'Choose Photo from Custom Option'
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        alert('You cancelled image picker');
      } else if (response.error) {
        alert('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        alert(response.customButton);
      } else {
        let mysource = response;
        //console.log(mysource)
        this.setState({
          image: mysource.uri,
          isselected: true,
        });
      }
    });
  };


  //TODO: upload image to firebase
  uploadImageAsync = async (uri, storageRef) => {
    const parts = uri.split(".");
    const fileExtenstion = parts[parts.length - 1];

    //create blob
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    //upload part
    const ref = storageRef
      .child("ContactImages")
      .child(uuid.v4() + "." + fileExtenstion);
    const snapshot = await ref.put(blob);
    //console.log(snapshot)
    //close blob
    blob.close();

    return await snapshot.ref.getDownloadURL();
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
              <Image source={
                this.state.image === "empty"
                  ? require("../assets/Icons/user.png")
                  : {
                    uri: this.state.image
                  }
              } style={{ height: 180, width: 180 }} />



              <Button
                style={styles.button}
                full
                rounded
                onPress={() => {
                  this.chooseFile();
                }}
              >
                <Text style={styles.buttonText}>Upload Image</Text>
              </Button>
            </View>
            <Form style={styles.form}>
              <Item floatingLabel>
                <Label>Name</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="name-phone-pad"
                  onChangeText={name => this.setState({ name })}
                />
              </Item>
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
                <Label>Phone</Label>
                <Input
                  secureTextEntry={false}
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="name-phone-pad"
                  onChangeText={phone => this.setState({ phone })}
                />
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
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
                  this.signupUser(
                    this.state.name,
                    this.state.email,
                    this.state.password,
                    this.state.phone

                  );
                }}
              >
                <Text style={styles.buttonText}>Sign in</Text>
              </Button>
            </Form>
            <View style={styles.footer}>
              <Text>OR</Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("SignIn");
                }}
              >
                <Text>already having an account ?</Text>
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
    marginBottom: 100,

  },
  form: {
    padding: 20,
    width: "100%"
  },
  button: {
    marginTop: 30,
    marginLeft:10
  },
  buttonText: {
    color: "#fff"
  },
  footer: {
    alignItems: "center"
  }
});
