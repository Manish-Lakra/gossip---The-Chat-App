import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Firebase from "../Firebase";





class Chat extends React.Component {
    static navigationOptions = ({ navigation }) => ({
      title:navigation.state.params.name,
      headerStyle: {
        backgroundColor: "#fd0759"
      },
      headerTintColor: "#FFF"
    });

  constructor(props){
    super(props)
  
    this.state = {
      messages: [],
      chatkey: null,
      chatRoomName: null,

    };

    this.getuser = this.getuser.bind(this);

  }

  

  // getuser() {
  //   this.setState({  chatkey: this.props.navigation.state.params.name,
  //     chatRoomName: this.props.navigation.state.params.initiateChatData.chatID,
  //   })
  //   return {
  //     name: this.props.navigation.state.params.name,
  //     _id: Firebase.shared.uid,
  //     chatkey: this.props.navigation.state.params.initiateChatData.chatID,
        
  //   };
    
  // }

  componentDidMount() {

    this.getuser();




    
    Firebase.shared.on(this.props.navigation.state.params.initiateChatData.chatID, message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message)
      }))
    );
    Firebase.shared.onRef(this.props.navigation.state.params.initiateChatData.chatID, () => {

    })


  }


  getuser() {
    this.setState({  chatRoomName: this.props.navigation.state.params.name,
      chatkey: this.props.navigation.state.params.initiateChatData.chatID,
    })
    return {
      name: this.props.navigation.state.params.name,
      _id: Firebase.shared.uid,
      chatkey: this.props.navigation.state.params.initiateChatData.chatID,
        
    };

  };

  get user() {
    return {
      name: this.props.navigation.state.params.name,
      _id: Firebase.shared.uid,
      chatkey: this.props.navigation.state.params.initiateChatData.chatID,
        
    };

  };


  // get ref() {
  //   return firebase.database().ref("message/individualChat");

     
  // }
  







  render() {
    
  
    return (
      
      <GiftedChat
        messages={this.state.messages}
        user={this.user}
        onSend={(msg)=>{Firebase.shared.send(this.state.chatkey,msg)}}
        placeholder='Type here..'
        alwaysShowSend
       
        
        showAvatarForEveryMessage
        
      />
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Chat;
