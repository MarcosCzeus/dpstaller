import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Img from '../Components/Image';
import { auth, db } from '../firebase';

const RegisterPage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        db.collection('users')
          .doc(user.uid)
          .set({
            name: name,
            email: email,
          })
          .then(() => {
            setName('');
            setEmail('');
            setPassword('');
          });
        user
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            console.log('Register Successful', user);
          })
          .catch((error) => {
            setError(error);
          });
      })
      .catch((error) => {
        setError(error);
      });

    if (handleRegister) {
      return navigation.navigate('Login');
    }
  };

  const handleBack = () => {
    return navigation.navigate('Login');
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <View
        style={{
          backgroundColor: 'white',
          marginHorizontal: 16,
          paddingHorizontal: 8,
        }}>
        <Img />
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry={true}
        />

        <TouchableOpacity onPress={handleRegister}>
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
              Register
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="md-return-down-back-sharp" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderBottomWidth: 2,
    borderTopWidth: 1,
    margin: 5,
    borderRadius: 20,
    padding: 16,
  },
});
