import React, { Component, useState } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import RegistrationIntroduction from './screens/RegistrationIntroduction';
import RegistrationP4 from './screens/RegistrationP4';
import RegistrationP2 from './screens/RegistrationP2';
import RegistrationP1 from './screens/RegistrationP1';
import MapView from 'react-native-maps';


import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const fetchFonts = () => {
  return Font.loadAsync({
    'kalam-bold': require('./assets/fonts/Kalam-Bold.ttf'),
    'kalam-light': require('./assets/fonts/Kalam-Light.ttf'),
    'kalam-regular': require('./assets/fonts/Kalam-Regular.ttf'),
    'varela': require('./assets/fonts/VarelaRound-Regular.ttf'),
    'rubik-regular': require('./assets/fonts/Rubik-Regular.ttf'),
    'rubik-medium': require('./assets/fonts/Rubik-Medium.ttf')
  });
};


export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  return (

    <RegistrationP2 />

  );

}

