import React, { useEffect, useState } from 'react';
import { getSnaps, readSnap, seenSnap } from '../services/snap/index';
import { Dimensions, Text, StyleSheet, View, SafeAreaView, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';

import Image from 'react-native-scalable-image';
import Header from '../components/header';
import { vw, vh } from 'react-native-expo-viewport-units';


const AllSnaps = () => {
  const [snaps, setSnaps] = useState([]);
  const [snap, setSnap] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getSnaps(setSnaps);
  }, [snap]);

  const openSnap = ({ snap_id, duration }) => {
    setLoader(true);
    readSnap(snap_id, setSnap)
      .then(() => {
        setLoader(false);
      })
      .finally(() => {
        setTimeout(() => {
          seenSnap(snap_id, setSnap);
          setLoader(false);
        }, duration * 1000);
      });
  };

  function Item ({ snap_id, duration, from }) {
    from = typeof from === 'string' ? from.split('@')[0] : '';
    return (
      <View style={styles.item}>
        <Text style={styles.item3}>{from} </Text>
        <Text style={styles.duration}>{duration}</Text>
        <Text style={styles.circle}></Text>
        <Button
          buttonStyle={styles.openSnap}
          title="Open snap"
          onPress={() => openSnap({ snap_id, duration })}
        />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <Header padding={false} />
      <ScrollView style={styles.allSnap}>
        <Text style={styles.item2}>If you have some snaps, they are gonna be showable here</Text>
        <FlatList
          data={snaps}
          renderItem={({ item }) => <Item snap_id={item.snap_id} duration={item.duration} from={item.from} />}
          keyExtractor={item => item.snap_id.toString()}
        />
        {loader === true && <ActivityIndicator size="large" color="#0000ff" />}
        {snap !== '' &&
          <Image width={Dimensions.get('window').width} source={{ uri: snap }}
          />
        }
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#CADBDC',
    color: '#342B38',
    fontSize: 25,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  item2: {
    backgroundColor: '#CADBDC',
    color: '#342B38',
    fontSize: 19,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    fontWeight: 'bold'
  },
  item3: {
    color: '#342B38',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 1000,
    backgroundColor: '#64ff4c',
    padding: 15,
    left: 280,
    top: 10,
    position: 'absolute',
    opacity: .5,
    alignItems: 'center'
  },
  duration: {
    color: '#222',
    fontSize: 19,
    padding: 20,
    left: 275,
    top: -3,
    position: 'absolute'
  },
  allSnap: {
    marginTop: vh(5)
  },
  openSnap: {
    backgroundColor: '#ffd100',
    width: vw(75),
    marginTop: vh(3)
  }
});
export default AllSnaps;
