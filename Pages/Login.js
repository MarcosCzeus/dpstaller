import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { auth } from '../firebase';
import Img from '../Components/Image';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Validate email and password and perform login action
    if (!email || !password) {
      return alert('Please enter email and password.');
    }
    // Sign in with email and password
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Login Successful');
      })
      .catch((error) => {
        // Handle error
        alert(error.message);
      });
    if (handleLogin) {
      return navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          marginVertical: 18,
          marginHorizontal: 16,
          paddingHorizontal: 8,
        }}>
        <Img />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleLogin}>
          <View
            style={{
              backgroundColor: '#2196F3',
              width: 100,
              height: 30,
              borderRadius: 20,
              alignSelf: 'center',
              marginTop: 5,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'white',
                margin: 4,
              }}>
              Login
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <View
            style={{
              backgroundColor: 'gray',
              width: 100,
              height: 30,
              borderRadius: 20,
              alignSelf: 'center',
              marginTop: 5,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'white',
                margin: 4,
              }}>
              Register
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  input: {
    height: 40,
    borderBottomWidth: 2,
    borderTopWidth: 1,
    margin: 5,
    borderRadius: 20,
    padding: 16,
  },
});
