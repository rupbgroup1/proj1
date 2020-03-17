import React, { Component, useState } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import RegistrationIntroduction from './screens/RegistrationIntroduction';
import RegistrationP1 from './screens/RegistrationP1';
import RegistrationPicture from './screens/RegistrationPicture';
import ForgotPassword from './screens/ForgotPassword';
import Pic from './screens/Pic';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import CameraPage from './screens/CameraPage';
import ImageGallery from './screens/ImageGallery';



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

const navigator = createStackNavigator({
  ImageGallery:ImageGallery,
  CameraPage: CameraPage,
  Pic: Pic 
  
}, {
  initialRouteName: 'Pic',
  defaultNavigationOptions: {
    title: 'Pic'
  }
})
const Na = createAppContainer(navigator)

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
      <Na/>
    );
 
}

