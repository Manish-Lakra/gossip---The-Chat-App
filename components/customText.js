import React, {Component}  from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, Image} from 'react-native';

export default class CustomText extends Component{

      constructor(props){
        super(props);
        this.state={

        }
      }
    render(){

        return(
          <View style={[styles.container,{},this.props.style]}>
          <Image
          {...this.props.lefticon}
          style={{margin:10}}
          />
          <TextInput
          {...this.props}
          
          style={{flex:1 ,height:55 }}
          />

          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    backgroundColor:'white',
    alignItems:'center',
    borderColor: 'gray',
    borderWidth: 1,
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



