import React, { Component } from 'react';
import { Button, View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import colors from '../assets/constant/colors';
import Feed from '../components/Feed';
import Header from '../components/Header';
import PagesNav from '../components/PagesNav';
import OurButton from '../components/OurButton';
import firebaseSvc from '../FirebaseSvc';


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
        <View style={styles.row}>

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
        onPress={() => navigation.navigate('Profile')}
        style={styles.item}
        title={'פרופיל'}
        />
        </View>

        {/* <Button onPress={() => navigation.navigate('Feed')}
          title={'פיד'}
        /> */}

      </View>
    );
  }
}

const styles = StyleSheet.create({

  item: {
    flex: 1,
    height: 90,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'grey',

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
    height: 90,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 5,

  },
  header: {
    fontFamily: 'rubik-regular',
    marginVertical: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.subTitle,
    paddingTop: 25
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: colors.regBackground,
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  introductionText: {
    fontFamily: 'rubik-regular',
    marginVertical: 1,
    fontSize: 20,
    marginRight: 35,
    marginLeft: 35,
    textAlign: 'center',
  },
  button: {
    fontFamily: 'rubik-regular',
    width: '60%',
    paddingTop: 50,
    paddingVertical: 20,
    paddingHorizontal: 20


  }

});
