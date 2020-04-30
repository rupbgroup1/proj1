import React, { Component, useState } from 'react';
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
import FindNeighboor from './screens/FindNeighboor';
import RegistrationExtra from './screens/RegistrationExtra'
import RegistrationP5 from './screens/RegistrationP5';
import MainPage from './screens/MainPage';
import Feed from './components/Feed';
import Param from './screens/Param';
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
    'rubik-medium': require('./assets/fonts/Rubik-Medium.ttf'),
    'rubik-bold': require('./assets/fonts/Rubik-Bold.ttf')
  });  
};

//add screens to nav
const navigator = createStackNavigator({
  LoinScreen:LoginScreen,
  ForgotPassword:ForgotPassword,
  Pic: Pic,
  CameraPage:CameraPage,
  ImageGallery:ImageGallery,
  RegistrationP1:RegistrationP1,
  RegistrationP2:RegistrationP2,
  RegistrationP4:RegistrationP4,
  RegistrationExtra:RegistrationExtra,
  FindNeighboor:FindNeighboor,
  RegistrationIntroduction:RegistrationIntroduction,
  RegistrationP5:RegistrationP5,
  MainPage:MainPage,
  Feed:Feed,
  Param:Param
  
  }, {
        initialRouteName: 'FindNeighboor',
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

