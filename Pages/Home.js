import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { auth, db } from '../firebase';

const Item = ({ onPress, schedule, navigation }) => {
  const [day, setDay] = useState(schedule.day);
  const [time, setTime] = useState(schedule.time);
  const [subject, setSubject] = useState(schedule.subject);

  const handleToUpdate = (id) => {
    db.collection('Schedule').doc(id).update({ day, time, subject });
    navigation.navigate('Update', { schedule });
  };

  const handleDelete = (id) => {
    db.collection('Schedule').doc(id).delete();
    console.log('Schedule Successfully Deleted')
  };

  return (
    <View style={styles.itemContainer} onPress={onPress}>
      <View style={styles.desc}>
        <Text style={styles.descName}>Day : </Text>
        <Text style={styles.descName}>{day} </Text>
        <Text style={styles.descsekte}>Time : </Text>
        <Text style={styles.descsekte}>{time}</Text>
        <Text style={styles.descsekte}>Subject :</Text>
        <Text style={styles.descsekte}>{subject}</Text>
      </View>
      <View style={{ paddingVertical: 5, justifyContent: 'space-between' }}>
        <TouchableOpacity
          style={{ marginBottom: 25 }}
          onPress={() => handleToUpdate(schedule.id)}>
          <Foundation name="page-edit" size={25} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(schedule.id)}>
          <Foundation name="page-delete" size={25} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Homepage = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        db.collection('Schedule').onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((documentSnapshot) => {
            return { ...documentSnapshot.data(), id: documentSnapshot.id };
          });
          setSchedule(data);
        });
      } else {
        // navigate to login page if user is not logged in
        navigation.navigate('Login');
      }
    });

    return () => unsubscribe();
  }, [navigation, schedule]);

  if (!user) {
    return null;
  }

  const handleToAdd = () => {
    if (handleToAdd) {
      return navigation.navigate('Add');
    }
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.navigate('Login');
    });
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
          <Text style={styles.wlcm}>Welcome</Text>
          <Text style={styles.username}>{user.displayName}</Text>
        </View>
        <View style={styles.line} />
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.username}>
            {' '}
            {user.displayName}'s Class Schedule{' '}
          </Text>
        </View>
        <View style={styles.line} />
        <TouchableOpacity
          onPress={handleToAdd}
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Foundation name="page-add" size={25} color="black" />
          <Text style={{ fontWeight: 'bold' }}>Create New Schedule </Text>
        </TouchableOpacity>
        <View style={styles.line} />
        {schedule.map((item) => (
          <Item key={item.id} schedule={item} navigation={navigation} />
        ))}
        <TouchableOpacity onPress={handleLogout}>
          <View
            style={{
              backgroundColor: 'red',
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
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  wlcm: {
    fontSize: 16,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 15,
    },
    shadowOpacity: 3.25,
    shadowRadius: 20.84,
    elevation: 5,
  },
  line: { height: 2, backgroundColor: '#1A374D', marginVertical: 10 },
  desc: { marginLeft: 2, flex: 1 },
  descName: { fontSize: 18, fontWeight: 'bold', color: 'black' },

  descsekte: { fontSize: 15, marginTop: 8, color: 'black' },
});
