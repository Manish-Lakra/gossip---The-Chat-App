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
  Dimensions,
  FlatList
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
      isLoading: true,
      isListEmpty: false,
      chatterID: null,
      chateeID: null,
      chatID: null,
      chateeName: null

    };

    this.getUsers = this.getUsers.bind(this)
  }
  componentDidMount() {
    this.getUsers();
    //this.setCurrentUserID();

  }


  //   const resetAction = NavigationActions.reset({
  //     index: 0,
  //     actions: [
  //         NavigationActions.navigate({ routeName: 'Home' })
  //     ]
  // });


  //   setCurrentUserID = () => {
  //     let self = this;
  //     var user = firebase.auth().currentUser;

  //     var  chatterID ;

  // if (user != null) {
  //   self.setState({
  //     chatterID : user.uid


  //   });
  //   console.log(this.state.chatterID)
  // }else{
  //   console.log('null')
  // }
  //   }



  async getUsers() {
    let self = this;
    let refUser = firebase.database()

    var leadsRef = refUser.ref('users');
    leadsRef.on('value', function (snapshot) {


      if (snapshot.val()) {
        let contactResult = Object.values(snapshot.val());
        let contactKey = Object.keys(snapshot.val());
        console.log("5555555------->" + contactKey);
        console.log('6666666------>' + contactResult);
        contactKey.forEach((value, key) => {
          contactResult[key]["key"] = value;
        });
        self.setState({
          data: contactResult.sort((a, b) => {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }

            // names must be equal
            return 0;
          }),
          isListEmpty: false
        });
      } else {
        self.setState({ isListEmpty: true });
      }
      self.setState({ isLoading: false });
    });

  };



  // chatID = () => {

  //   const chatterID = this.props.authUser.uid;
  //   const chateeID = this.chateeUID;
  //   const chatIDpre = [];
  //   chatIDpre.push(chatterID);
  //   chatIDpre.push(chateeID);
  //   chatIDpre.sort();
  //   return chatIDpre.join('_');
  // };

  getchatKey = async () => {

    let self = this;
    var user = await firebase.auth().currentUser
    var uid = user.email
    uid= uid.replace("@", "a");
    uid= uid.replace(".", "a");
    self.setState({
      chatterID: uid.toLowerCase()
    })
    console.log(this.state.chateeID)
    console.log(this.state.chatterID)
    console.log(this.state.chateeName)

    const chatID = [];
    chatID.push(this.state.chatterID);
    chatID.push(this.state.chateeID);
    chatID.sort();
    var chatUID = chatID.join('_');
    //chatID.join('_');
    //chatID=chatID.replace("@", "/");
   
    //var chatUID =  chatID.replace(".", "/");
    console.log("chatID" + chatUID)
    self.setState({ chatID: chatUID })
    console.log(this.state.chatID)
    //return chatID 

    self.props.myProps.navigation.navigate("Chat", {
      initiateChatData: this.state,
      name: this.state.chateeName

    });


  }


  render()  {
    console.log(this.state.data)
    // if its loading show ActivityIndicator
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#B83227" />
          <Text style={{ textAlign: "center" }}>
            Loading contacts please wait..
          </Text>
        </View>
      );

    } else if (this.state.isListEmpty) {
      // else if loading is completed and no contact found show this
      return (
        <View
          style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
        >
          <Entypo style={{ alignSelf: "center" }} name="plus" size={35} />
          <Text style={{ textAlign: "center" }}>No Contacts please Add</Text>
          <TouchableOpacity
            onPress={() => {
              // add icon
              //navigate to Add Contact screen
              this.props.navigation.navigate("Add");
            }}
            style={styles.floatButton}
          >
            <Entypo name="plus" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      );
    }



    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => {
            item.imageUrl === "empty"
            ? require("../assets/Icons/user.png")
            : { uri: item.imageUrl }
            return (
              <TouchableOpacity
                onPress={() => {
                  //navigate to view contact screen with passing key
                  email=item.email.toLowerCase()
                  email= email.replace("@", "a");
                  email= email.replace(".", "a");
                  this.setState({
                    chateeID: email,
                    chateeName: item.name
                  },()=>{this.getchatKey()})
                  
                  //this.props.myProps.navigation.replace("Home");
                }}
              >
                <Card style={styles.listItem}>
                  <View>
                  <Image
                      style={styles.contactIcon}
                      source={
                        item.imageUrl === "empty"
                          ? require("../assets/Icons/user.png")
                          : { uri: item.imageUrl }
                      }
                    />
                  
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={{
                      fontSize: 20,
                      fontWeight: "700",
                      paddingLeft: 10,
                      paddingTop: 4
                    }}>
                      {item.name}
                    </Text>
                    <Text style={styles.infoText}>
                      {item.email}
                    </Text>
                    <Text style={styles.infoText}>{item.phone}</Text>
                  </View>
                  
                </Card>
              </TouchableOpacity>
            );
          }}
        />

      </View>
    );
  }
}















const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  listItem: {
    flexDirection: "row",
    padding: 20
  },
  contactIcon: {
    width: 120,
    height: 120,
    borderRadius: 120/2
  },
  infoContainer: {
    flexDirection: "column",
    marginLeft:20,
    justifyContent:'center'
  },
  infoText: {
    fontSize: 16,
    fontWeight: "400",
    paddingLeft: 10,
    paddingTop: 4
  }
});
