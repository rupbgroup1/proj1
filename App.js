import React, { Component, useState } from 'react';
import {View, StyleSheet,Dimensions,Image,TouchableOpacity,Platform,Text,} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
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
import Profile from './screens/Profile';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import ProfileEdit from './screens/ProfileEdit';
import GeneralEvents from './screens/Events/GeneralEvents';
import CreateEvent from './screens/Events/CreateEvent';
import MyEvents from './screens/Events/MyEvents';
import EventLocation from './screens/Events/EventLocation';
import GeneralServices from './screens/Services/GeneralServices';
import MyServices from './screens/Services/MyServices';
import { Notifications } from 'expo';
import Chat from './screens/Chat';
import CreateService from './screens/Services/CreateService'
import registerForPushNotificationsAsync from './components/registerForPushNotificationsAsync';

//cancel the timer error
YellowBox.ignoreWarnings(['Setting a timer']);
console.disableYellowBox = true;
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

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
  RegistrationIntroduction:RegistrationIntroduction,
  RegistrationP5:RegistrationP5,
  MainPage:MainPage,
  Feed:Feed,
  Param:Param,
  Profile:Profile,
  ProfileEdit:ProfileEdit,
  GeneralEvents:GeneralEvents,
  CreateEvent:CreateEvent,
  MyEvents:MyEvents,
  EventLocation:EventLocation,
  GeneralServices:GeneralServices,
  MyServices:MyServices,
  Chat:Chat,
  CreateService:CreateService,
  }, {
        initialRouteName: 'CreateEvent',
        defaultNavigationOptions: {
        headerShown: false
     }
  })
const Na = createAppContainer(navigator)


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: {},
      dataLoaded: false,
    };
  }

  componentDidMount() {
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log('token from app.js=', token);
        this.setState({ token });
        console.log('state.token from app.js=', this.state.token);
      });


    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    this.setState({ notification: notification });
  };

  //check that the fonts are loaded before the screen
  //const [dataLoaded, setDataLoaded] = useState(false);
  render() {
    return (
      !this.state.dataLoaded ?
        <AppLoading
          startAsync={fetchFonts}
          onFinish={() => this.setState({ dataLoaded: true })}
          onError={(err) => console.log(err)}
        />
        :
        <Na />
    )
  }
}


