import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
  Platform,
  ActivityIndicator,
  Image,
  Dimensions
} from "react-native";
import { Card, CardItem } from "native-base";
import * as firebase from "firebase";


export default class FriendList extends Component {
    constructor(props) {
        super(props);
        // set state
        this.state = {
          name: null,
          phone: null,
          email: null,
          imageUrl: null,
          key: null,
          isLoading: true
        };
      }
  componentDidMount(){
    this.getUsers();
  }

  getUsers = async () => {
    let self = this;
    let contactRef = firebase
      .database()
      .ref('users')
      

    await contactRef.on("value", dataSnapshot => {
      
      if (dataSnapshot.val()) {
        userValue = dataSnapshot.val();
        alert('UserValue------>'+ userValue.name)
        self.setState({
          name: userValue.name,
          email: userValue.email,
          imageUrl: userValue.imageUrl,
          //key: key,
          isLoading: false
        });
      }
    });
  };



  render() {
    return <View />
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          <ActivityIndicator size="large" color="#B83227" />
          <Text style={{ textAlign: "center" }}>
            FriendList loading please wait..
          </Text>
        </View>
      );
    }
    
    return (
     <ScrollView style={styles.container}>
       <View style={styles.contactIconContainer}>
          <Image
            style={styles.contactIcon}
            source={
              this.state.imageUrl === "empty"
                ? require("../assets/Icons/user.png")
                : {
                    uri: this.state.imageUrl
                  }
            }
          />
          <View style={styles.nameContainer}>
            <Text style={styles.name}>
              {this.state.name} 
            </Text>
          </View>
          </View>
             <View style={styles.infoContainer}></View>
          <Card>
            <CardItem bordered>
              <Text style={styles.infoText}>Phone</Text>
            </CardItem>
            <CardItem bordered>
              <Text style={styles.infoText}>{this.state.phone}</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem bordered>
              <Text style={styles.infoText}>Email</Text>
            </CardItem>
            <CardItem bordered>
              <Text style={styles.infoText}>{this.state.email}</Text>
            </CardItem>
          </Card>
          
       
        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff"
    },
    contactIconContainer: {
      alignItems: "center",
      justifyContent: "center"
    },
    // contactIcon: {
    //   // to create a square box both height and width should be same
    //   height: Dimensions.get("window").width,
    //   width: Dimensions.get("window").width
    // },
    nameContainer: {
      width: "100%",
      height: 70,
      padding: 10,
      backgroundColor: "rgba(255,255,255,0.5)",
      justifyContent: "center",
      position: "absolute",
      bottom: 0
    },
    name: {
      fontSize: 24,
      color: "#000",
      fontWeight: "900"
    },
    infoText: {
      fontSize: 18,
      fontWeight: "300"
    },
    actionContainer: {
      flexDirection: "row"
    },
    actionButton: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    actionText: {
      color: "#B83227",
      fontWeight: "900"
    }
  });
  