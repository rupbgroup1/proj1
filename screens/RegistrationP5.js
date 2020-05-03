import React, { Component } from 'react';
import { Button, View, StyleSheet, Text, Image } from 'react-native';
import colors from '../assets/constant/colors';
//import ProgressCircle from 'react-native-progress-circle';


const RegistrationIntroduction = ({ navigation }) => {
  const upload = navigation.getParam('uploadImage');
  const Per40 = require('../assets/Icons/icon-40-percent.png');
  const com = require('../assets/Icons/completed.png');
  return (
    <View style={styles.container}>
      <Text style={styles.introductionText} >
        הפרופיל נוצר בהצלחה!!
        </Text>
        {upload?
      <Text style={styles.introductionText} >
      חוזק הפרופיל כעת הוא 40%
        </Text>:
       <Text style={styles.introductionText} >
    חוזק הפרופיל כעת הוא 30%
        </Text>
         }
      <Image
        source={com}
        style={{ height: 150, width:150 }}
      />
      <View style={styles.button}>
        <Text style={styles.buttonsText} >
          {"\n"}
       ממליצים לך להמשיך בהרשמה ולחזק את הפרופיל, פרופיל חזק יעזור לך בהמשך השימוש באפליקציה
       {"\n"}
        </Text>
        <Button onPress={() => navigation.navigate('RegistrationExtra')}
          title={'לשיפור הפרופיל שלי'}
        />
        <Text style={styles.buttonsText} >
          {"\n"}{"\n"}
        תמיד אפשר גם בהמשך{"\n"}
        </Text>
        <Button onPress={() => navigation.navigate('MainPage')}
          title={'מעבר לאפליקציה '}
        />
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.regBackground,
  },
  PercentsText: {
    fontFamily: 'rubik-medium',
    marginVertical: 1,
    fontSize: 50,
    marginRight: 35,
    marginLeft: 35,
    textAlign: 'center',
  },
  introductionText: {
    fontFamily: 'rubik-regular',
    marginVertical: 1,
    fontSize: 24,
    marginRight: 35,
    marginLeft: 35,
    textAlign: 'center',
  },
  buttonsText: {
    fontFamily: 'rubik-regular',
    //marginVertical: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    fontFamily: 'rubik-medium',
    width: '80%',
    paddingTop: 50
  }

});

export default RegistrationIntroduction;
