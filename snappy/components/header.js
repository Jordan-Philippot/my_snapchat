import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { vw, vh } from 'react-native-expo-viewport-units';

export default function Header ({ padding }) {
  if (padding === undefined) {
    padding = true;
  }

  return (
    <View style={padding == true ? styles.header : styles.withoutPadding}>
      <Image
        style={styles.logo}
        source={require('../assets/user1.png')}
      />
      <Text style={styles.name}>Snappy</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#353535',
    width: vw(100),
    top: 50,
    display: 'flex',
    flexDirection: 'row',
    zIndex: 1000
  },
  withoutPadding: {
    backgroundColor: '#353535',
    width: vw(100),
    top: 0,
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
  newTchat: {
    width: vw(3),
    height: vh(3),
  },
  name: {
    color: '#ffc900',
    marginTop: 38,
    fontSize: vw(8),
    fontWeight: 'bold',
    width: vw(50),
    marginLeft: vw(7)
  },
});
