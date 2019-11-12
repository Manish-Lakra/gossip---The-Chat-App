import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { Swiper, TitleBar, TabBar } from 'react-native-awesome-viewpager';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  state = {
    scrollEnabled: true,
    type: 1,
  }

  render() {
    return <TitleBar
          style={styles.container}
          titles={['Page 1', 'Page 2', 'Page 3']}>
          <View>
            <Text>Page 1</Text>
          </View>
          <View>
            <Text>Page 2</Text>
          </View>
          <View>
            <Text>Page 3</Text>
          </View>
        </TitleBar>

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efdeed',
    flexDirection: 'column',
    paddingTop: 20
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