import React, { Component } from 'react';
import { Button, View, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback, } from 'react-native';
import colors from '../assets/constant/colors';
import Header from '../components/Header';
import { Card, Text } from 'react-native-elements';



export default class MyChats extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    return (
      <TouchableWithoutFeedback>
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
          <Header  navigation={navigation}/>
          
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  header: {
    //flex:1,
    textAlign: 'center',
    fontFamily: 'rubik-regular',
    marginVertical: 1,
    fontSize: 20,
    color: 'black',
    paddingTop: 15,
    paddingBottom: 15
  },
  feed: {
    flex: 3,
    width: '95%'
  },
  row: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  item1: {
    top: 20,
    left: -40
  },
  item2: {
    top: 85,
    left: -45,
  },
  item3: {
    top: 20,
    left: -60
  },
  item4: {
    top: -15,
    right: -110
  }

});
