import React, { Component } from 'react';
import { Button, View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import colors from '../assets/constant/colors';
import Feed from '../components/Feed';
import Header from '../components/Header';
import PagesNav from '../components/PagesNav';
import OurButton from '../components/OurButton';
import firebaseSvc from '../FirebaseSvc';
import BusinessesBTN from '../components/BusinessesButton';
import NeiButton from '../components/NeighboorsButton';
import EventsBTN from '../components/EventsButton';

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
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Header />
        <Text style={styles.header}>מה חדש בשכונה?</Text>
        <View style={{ width: '100%', height: '50%' }}>
          <Feed />
        </View>
        {/* <View style={styles.row}>

          <Button
            onPress={() => navigation.navigate('FindNeighboor')}
            style={styles.item}
            title={'הכר את שכניך'}
          />
          <Button
            onPress={() => navigation.navigate('RegistrationExtra')}
            style={styles.item}
            title={'המשך הרשמה'}
          />

          <Button
            onPress={() => navigation.navigate('ProfileEdit')}
            style={styles.item}
            title={'פרופיל'}
          />
        </View> */}
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

          <View style={styles.item3} >
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
    flexDirection: 'row',
    justifyContent:'space-evenly'
  },
  item1:{
    top:40,
   
  },
  item2:{
    top:100,
    left:10,
  },
  item3:{
    top:30,
   left:10
  },

});