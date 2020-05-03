import React, { Component } from 'react';
import { Button, View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import colors from '../assets/constant/colors';
import Feed from '../components/Feed';
import Header from '../components/Header';
import PagesNav from '../components/PagesNav';
import OurButton from '../components/OurButton';
import firebaseSvc from '../FirebaseSvc';
import NeiButton from '../components/NeighboorsButton';
import EventsBTN from '../components/EventsButton';
import BusinessesBTN from '../components/BusinessesButton';
import MenuNavigator from '../components/SideBarMenu';


export default class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   this.getUser();
  // }

  // async getUser() {
  //   let userJSON = await AsyncStorage.getItem('user');
  //   const userObj = await JSON.parse(userJSON);
  //   //this.setState({ neiName: userObj.NeighborhoodName});
  //   //firebaseSvc.getNei(userObj.NeighborhoodName);
  // }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.screen}>
        <Header style={{flex:1}} />
        <View style={styles.header}>
        <Text>מה חדש בשכונה?</Text>
        <MenuNavigator></MenuNavigator>
        </View>
        
        <View style={{ width: '100%', height: '50%' }}>
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
            onPress={() => navigation.navigate('RegistrationExtra')}>
            המשך הרשמה
          </EventsBTN>
          </View>

          <View style={styles.item3}>
          <BusinessesBTN
            onPress={() => navigation.navigate('Profile')}>
            פרופיל
          </BusinessesBTN>
          </View>
        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({

  screen:{
    flex:1,
    justifyContent:'flex-start',
    flexDirection:'column'
  },
  header: {
    flex:1,
    textAlign:'center',
    fontFamily: 'rubik-regular',
    marginVertical: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.subTitle,
    paddingTop: 25
  },
  feed:{
    flex:3,
    width:'95%'
  },
  row: {
    flex:3,
    flexDirection: 'column',
  },
  item1:{
    position: 'absolute',
    bottom:10,
    left:10,
  },
  item2:{
    position: 'absolute',
    bottom:80,
    left:120,
  },
  item3:{
    position: 'absolute',
    bottom:30,
    left:220,
  },

});
