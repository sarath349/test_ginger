import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  SafeAreaView,
} from 'react-native';

import {login, fetchMedicines, setAuthToken} from '../../network/Api';
import CustomButton from '../../components/CustomButton';
import Header from '../../components/Header';
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({email: '', password: ''});

  const handleLogin = async () => {
    setErrors({email: '', password: ''});
    let valid = true;
    if (!email) {
      setErrors(prevErrors => ({...prevErrors, email: 'Email is required'}));
      valid = false;
    }
    if (!password) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: 'Password is required',
      }));
      valid = false;
    }
    if (!valid) {
      return;
    }

    setLoading(true);
    try {
      console.log('Logging in with:', email, password);
      const response = await login(email, password);
      console.log('Login response:', response);

      if (response.success) {
        setAuthToken(response.data.token);
        setLoading(false);
        navigation.navigate('Dashboard', {
          user: response.data.user_details,
        });
      } else {
        Alert.alert('Login Failed', response.message || 'Unknown error');
        setLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title={'Login'} />
      <View style={styles.container}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#787878"
        />
        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#787878"
        />
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}
      </View>
      <CustomButton title="Login" onPress={handleLogin} loader={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#000',
    paddingBottom:20
  },
  container: {
    padding: 16,
    backgroundColor: '#000',
    justifyContent: 'center',
    flex: 1,
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#787878',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
});

export default LoginScreen;
