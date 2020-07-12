import React, { Component, useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import AppContainer from './DrawerNavigation/AppNavigation';

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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: {},
      dataLoaded: false,
    };
  }

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
        <AppContainer />


    )
  }
}