import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { fetchAllUser } from '../services/allusers';
import { vw, vh } from 'react-native-expo-viewport-units';
import Header from '../components/header';
export default function Auth ({ navigation }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAllUser(setUsers);
  }, []);

  // function Item({ email }) {
  //   email = typeof email === 'string' ? email.split('@')[0] : '';
  //   return (
  //     <View style={styles.item}>
  //       <Text>{email}</Text>
  //     </View>
  //   );
  // }

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../assets/user1.png')}
        />
        <Text style={styles.name}>Snappy</Text>
        <View style={styles.setting}>
          <View style={styles.settingContainer}>
            <Image
              style={styles.settingIcon}
              source={require('../assets/setting.png')}
            />
          </View>
          <View style={styles.dialogContainer}>
            <Image
              style={styles.newTchat}
              source={require('../assets/dialog.png')}
            />
          </View>
        </View>
      </View> */}
      <Header />

      <View style={styles.send}>
        <Button
          title="Take a Snap"
          onPress={() => navigation.navigate('Snap')}
          buttonStyle={{ backgroundColor: '#ffd800', borderRadius: 15, width: vw(45), marginTop: 20, marginBottom: 20 }}
          titleStyle={{ color: '#000', fontSize: 15 }}
        />
        <Button
          title="Snaps"
          onPress={() => navigation.navigate('ShowAllSnap')}
          buttonStyle={{ backgroundColor: '#151515', borderRadius: 15, width: vw(45) }}
          titleStyle={{ color: '#FFF', fontSize: 14 }}
        />
      </View>


      <View style={styles.reception}>
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <View style={styles.oneDialog} >
              <View style={styles.headerDialog}>
                <View>
                  <Image
                    style={styles.imgUsers}
                    source={require('../assets/user5.png')}
                  />
                </View>
                <Text style={styles.friend}>{item.email}</Text>
              </View>
            </View>)}
          keyExtractor={item => item.email}
        />
      </View>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
    width: vw(100)
  },
  header: {
    backgroundColor: '#353535',
    width: vw(100),
    top: 50,
    display: 'flex',
    flexDirection: 'row',
    zIndex: 1000
  },
  logo: {
    width: vw(14),
    height: vw(14),
    borderRadius: 50,
    margin: 30
  },
  newTchat: {
    width: vw(3),
    height: vh(3),
  },

  settingContainer: {
    top: vh(1.5),
    left: vw(1),
    width: vw(10),
    height: vw(10),
    borderRadius: 50,
    backgroundColor: 'white',
    padding: 6,
    justifyContent: 'center'
  },
  settingIcon: {
    width: vw(7),
    height: vw(7),
  },
  dialogContainer: {
    top: vh(4),
    left: vw(1),
    width: vw(8),
    height: vw(8),
    borderRadius: 50,
    backgroundColor: '#ffc900',
    justifyContent: 'center',
    padding: 3
  },
  oneDialog: {
    backgroundColor: '#909090',
    width: vw(100),
    margin: 2,
    padding: 2
  },
  reception: {
    marginTop: vh(25)
  },
  headerDialog: {
    flex: 1,
    flexDirection: 'row'
  },
  friend: {
    color: '#353535',
    marginTop: vh(3.5),
    fontSize: vw(5),
    fontWeight: 'bold',
    width: vw(75)
  },
  imgUsers: {
    borderRadius: 50,
    width: vw(12),
    height: vw(12),
    margin: vw(5)
  },
  send: {
    position: 'absolute',
    top: 100
  }
});
