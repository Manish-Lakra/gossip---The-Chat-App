/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import Routes from "./routes/Routes";
import { StatusBar, View, YellowBox } from "react-native";


const App = () => (
  <View style={{ flex: 1 }}>
    <Routes />
  </View>
);

export default App;