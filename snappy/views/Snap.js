import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import Header from '../components/header';
import { Camera } from 'expo-camera';
// import { Picker } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { vw, vh } from 'react-native-expo-viewport-units';
// import {Picker} from '@react-native-community/picker';
import { fetchEmails, sendSnap } from '../services/snap/index';
export default function App () {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [emails, setEmails] = useState([]);
  const [email, setEmail] = useState([]);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [snap, setSnap] = useState('');
  const [duration, setDuration] = useState([]);
  const durations = [...Array(10).keys()].map(i => i + 1);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    fetchEmails(setEmails).then((rep) => {
      setEmail(rep[0].email);
    });
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  async function takePhoto () {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      await setSnap(photo.uri);
    }
  }

  async function resetSnap () {
    await setSnap('');
  }

  async function sendNewSnap () {
    console.log(snap, duration, email[0]);
    await sendSnap({ photo: snap, duration: duration[0], email: email[0] });
    setSnap('');
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#222' }}>
      {snap !== '' &&
        <View>
          <Header padding={false} />
          <Text style={styles.title}>CHOOSE YOUR CONTACT</Text>
          <View style={styles.emailSelect}>
            <MultiSelect
              items={emails.map((i) => {
                return {
                  id: i.email,
                  name: i.email
                };
              })}
              single="true"
              uniqueKey="id"
              onSelectedItemsChange={(value) => setEmail(value)}
              selectedItems={email}
              selectText="Pick Email"
              searchInputPlaceholderText="Search Email..."
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              searchInputStyle={{ color: '#CCC' }}
              submitButtonColor="#CCC"
              submitButtonText="Submit"
            />
          </View>

          <View style={styles.emailSelect}>
            <MultiSelect
              items={durations.map((i) => {
                return {
                  id: i.toString(),
                  name: i.toString()
                };
              })}
              single='true'
              uniqueKey="id"
              onSelectedItemsChange={(value) => setDuration(value)}
              selectedItems={duration}
              selectText="Pick Duration"
              searchInputPlaceholderText="Search Duration..."
              emailsInput tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              searchInputStyle={{ color: '#CCC' }}
              submitButtonColor="#CCC"
              submitButtonText="Submit"
            />
          </View>
          <Button title="Send" buttonStyle={{ backgroundColor: '#ffd100', marginTop: vh(20), marginBottom: vh(4), width: vw(80), marginLeft: vw(10) }} onPress={sendNewSnap} />
          <Button title="Reset" buttonStyle={{ backgroundColor: '#575757', width: vw(80), marginLeft: vw(10) }} onPress={resetSnap} />
        </View>
      }
      {/* _________________________________________________________________________________________________________________________ */}
      {snap === '' &&
        <Camera style={{ flex: 1 }} type={type} ref={ref => {
          setCameraRef(ref);
        }}
        >

          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              justifyContent: 'flex-end'
            }}>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end'
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={takePhoto}>
              <View style={{
                borderWidth: 2,
                borderRadius: 50,
                borderColor: 'white',
                height: 50,
                width: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              >
                <View style={{
                  borderWidth: 2,
                  borderRadius: 50,
                  borderColor: 'white',
                  height: 40,
                  width: 40,
                  backgroundColor: 'white'
                }} >
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </Camera>
      }
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: vw(6),
    padding: vw(5),
    fontWeight: 'bold',
    marginBottom: vh(5),
    textDecorationLine: 'underline',
    color: '#EEE'
  },
  emailSelect: {
    width: vw(80),
    marginLeft: vw(10),
    marginBottom: vh(3)
  }
});
