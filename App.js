import * as React from 'react';
import Navigation from './navigation/Navigation';
import { View, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import 'react-native-gesture-handler';
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" />
  <Navigation />
  </SafeAreaView>
)
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#000'
  },
});
export default App;
