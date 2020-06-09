import React from 'react';
// import { StyleSheet, Text, View, AppRegistry } from "react-native";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import { NativeRouter, Route, Link } from "react-router-native";
import Auth from './views/Auth';
import Home from './views/Home';
import Snap from './views/Snap';
import ShowAllSnap from './views/ShowAllSnap';
import { UserConsumer, UserProvider } from './context/context';

const Stack = createStackNavigator();

function App () {
  return (
    <UserProvider>
      <UserConsumer>
        {({ isAuth }) => (
          <NavigationContainer>
            <Stack.Navigator initialRouteName={isAuth ? 'Home' : 'Auth'}>
              <Stack.Screen name="Auth" component={Auth} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Snap" component={Snap} />
              <Stack.Screen name="ShowAllSnap" component={ShowAllSnap} />
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </UserConsumer>
    </UserProvider>
  );
}

export default App;
