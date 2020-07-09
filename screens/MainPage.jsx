import React, { Component } from 'react';
import { Button, View, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback, } from 'react-native';
import colors from '../assets/constant/colors';
import Feed from '../components/Feed';
import Header from '../components/Header';
import BusinessesBTN from '../components/BusinessesButton';
import NeiButton from '../components/NeighboorsButton';
import EventsBTN from '../components/EventsButton';
import FindingsButton from '../components/FindingsButton';
import { Card, Text } from 'react-native-elements';



export default class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    return (
      <TouchableWithoutFeedback>
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
          <Header  navigation={navigation}/>
          <View style={{
            width: '95%', height: '60%', borderRadius: 10,
            shadowColor: 'black',
            shadowOpacity: 0.5,
            elevation: 3,
            backgroundColor: 'white',
            marginTop: 10
          }}>
            <Text style={styles.header}>מה חדש בשכונה?</Text>

            <Feed />
          </View>

          <View style={styles.row}>
          
            <View style={styles.item1}>
              <NeiButton
                onPress={() => navigation.navigate('FindNeighboor')}>
                הכר את שכניך
              </NeiButton>
            </View>

            <View style={styles.item2}>
              <EventsBTN
                onPress={() => navigation.navigate('GeneralEvents')}>
                אירועים בקהילה
              </EventsBTN>
            </View>

            <View style={styles.item3}>
              <BusinessesBTN
                onPress={() => navigation.navigate('GeneralServices')}>
                עסקים בקהילה
              </BusinessesBTN>
            </View>

          </View>

          <View style={styles.item4}>
            <FindingsButton
              onPress={() => navigation.navigate('GeneralLosts')}>
              נמצא בשכונה
            </FindingsButton>
          </View>
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
