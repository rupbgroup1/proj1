import React, { Component, useState } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen';
import ForgotPassword from './screens/ForgotPassword';
import Pic from './screens/Pic';
import CameraPage from './screens/CameraPage';
import ImageGallery from './screens/ImageGallery';
import RegistrationIntroduction from './screens/RegistrationIntroduction';
import RegistrationP4 from './screens/RegistrationP4';
import RegistrationP2 from './screens/RegistrationP2';
import RegistrationP1 from './screens/RegistrationP1';
import RegistrationExtra from './screens/RegistrationExtra'
import MapView from 'react-native-maps';
import FindNeighboor from './screens/FindNeighboor';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

//add fonts to the app
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

//add screens to nav
const navigator = createStackNavigator({
  LoginScreen:LoginScreen,
  ForgotPassword:ForgotPassword,
  Pic: Pic,
  CameraPage:CameraPage,
  ImageGallery:ImageGallery,
  RegistrationP1:RegistrationP1,
  RegistrationP2:RegistrationP2,
  RegistrationP4:RegistrationP4,
  RegistrationExtra:RegistrationExtra,
  FindNeighboor:FindNeighboor,
  RegistrationIntroduction:RegistrationIntroduction
  
  }, {
        initialRouteName: 'LoginScreen',
        defaultNavigationOptions: {
        headerShown: false
     }
  })
const Na = createAppContainer(navigator)


export default function App() {
  //check that the fonts are loaded before the screen
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

    <Na/>
  );
}

