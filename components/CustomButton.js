import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const CustomButton = ({onPress, title, loader}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
      {loader && <ActivityIndicator size="small" color="#000" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FAFF0E',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '800',
    marginRight: 10,
  },
});

export default CustomButton;
