import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { vw, vh } from 'react-native-expo-viewport-units';

import { register, login } from '../services/auth';
import UserContext from '../context/context';

export default function Auth ({ navigation }) {
  const { setAuth, isAuth } = useContext(UserContext);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    if (isAuth) {
      navigation.navigate('Home');
    }
  }, [isAuth]);

  const handleRegister = async () => {
    try {
      await register(email, password);
      await handleLogin();
    } catch (e) {
      setErr(e.response.data.data);
    }
  };

  const handleLogin = async () => {
    try {
      const log = await login(email, password);
      await setAuth(log.data.data);
      navigation.navigate('Home');
    } catch (e) {
      setError(e.response.data.data);
    }
  };
  const handleEmailChange = (value) => {
    setEmail(value);
  };
  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bar}></View>
      <View style={styles.header}>
        <Text style={styles.title}>SNAPPY</Text>
      </View>

      <View style={styles.topContainer}>
        <View>
          <TextInput style={styles.input} placeholder='EMAIL' onChangeText={handleEmailChange} />
          <TextInput secureTextEntry={true} style={styles.input} placeholder='PASSWORD' onChangeText={handlePasswordChange} />
          <Text style={styles.agree}> By logging in you accepts the terms of snappy</Text>
        </View>
        {error != '' && <Text style={styles.error}>{error}</Text>}
        {err != '' && <Text style={styles.error}>{err}</Text>}

        <View style={styles.buttons}>
          <Button style={styles.register} title="REGISTER" buttonStyle={{ backgroundColor: '#ffd800', borderRadius: 15, width: vw(50), marginLeft: vw(26), marginBottom: vw(3) }} titleStyle={{ color: '#000', fontSize: 14 }} onPress={handleRegister} />
          <Button style={styles.login} title="LOGIN" buttonStyle={{ backgroundColor: '#151515', borderRadius: 15, width: vw(50), marginLeft: vw(26) }} titleStyle={{ color: '#FFF', fontSize: 14 }} onPress={handleLogin} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252525',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: vw(100)
  },
  header: {
    backgroundColor: '#353535',
    width: vw(100),
    position: 'absolute',
    top: 0
  },
  title: {
    marginTop: 100,
    marginBottom: 100,
    color: '#bdbdbd',
    fontWeight: 'bold',
    fontSize: vw(11),
    width: '100%',
    textAlign: 'center',
  },
  topContainer: {
    marginTop: '50%',
    alignItems: 'center'
  },
  input: {
    backgroundColor: '#555555',
    color: '#121212',
    marginTop: 25,
    width: vw(60),
    height: 40,
    borderRadius: 20,
    textAlign: 'center'
  },
  buttons: {
    width: vw(100),
    height: vh(15),
    margin: 20
  },
  agree: {
    color: '#808080',
    marginTop: 15,
    fontSize: 10,
    textAlign: 'center'
  },
  bar: {
    display: 'flex',
    width: 12,
    height: '100%',
    backgroundColor: '#ffd800',
    position: 'absolute',
    zIndex: 1000,
    left: 0,
    top: 0
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
