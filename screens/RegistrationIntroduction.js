import React, { Component } from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import colors from '../assets/constant/colors';

const RegistrationIntroduction = ({navigation}) => {
 
    return (
      <View style={styles.container}>
        <Text style={styles.introductionText} >
         לפנייך תהליך הרשמה קצר. 
        </Text>
        <Text style={styles.introductionText} >
    לאחר ההרשמה, ניתן להמשיך את 
        </Text>
        <Text style={styles.introductionText} >
    הגדרת הפרופיל בכל עת
        </Text>
        <View style={styles.button}>
        <Button onPress={() => navigation.navigate('RegistrationP4')}
          title={'שנתחיל?'}
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
  introductionText: {
    fontFamily: 'rubik-regular',
    marginVertical: 1,
    fontSize: 20,
    marginRight:35,
    marginLeft: 35,
    textAlign: 'center',
  },
  button:{
   fontFamily: 'rubik-medium',
   width: '60%',
   paddingTop: 50
  }
 
});

 export default RegistrationIntroduction;
