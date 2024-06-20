import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Header = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 50,

    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 18,
  },
});
