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
import { db } from '../firebase';

const AddPage = ({ navigation }) => {
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [subject, setSubject] = useState('');
  const [error, setError] = useState(null);

  const handleAdd = () => {
    db.collection('Schedule')
      .add({
        day: day,
        time: time,
        subject: subject,
      })
      .then(() => {
        console.log('Schedule successfully added!'); 
      })
      .catch((error) => {
        setError(error);
      });
         if (handleAdd) {
      return navigation.navigate('Home');
    }
  };

  const handleBack = () => {
    return navigation.navigate('Home');
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
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Enter New Schedule
          </Text>
        </View>

        <View style={styles.line} />
        <View
          style={{
            backgroundColor: 'white',
            marginHorizontal: 16,
            paddingHorizontal: 8,
          }}>
          <TextInput
            placeholder="Day"
            value={day}
            onChangeText={setDay}
            style={styles.input}
          />
          <TextInput
            placeholder="Time"
            value={time}
            onChangeText={setTime}
            style={styles.input}
          />
          <TextInput
            placeholder="Subject"
            value={subject}
            onChangeText={setSubject}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleAdd}>
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
                Add
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="md-return-down-back-sharp" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddPage;

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
  line: { height: 2, backgroundColor: '#1A374D', marginVertical: 10 },
});
