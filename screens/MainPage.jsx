import React, { Component } from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import colors from '../assets/constant/colors';

const MainPage = ({navigation}) => {
 
    return (
      <View style={styles.container}>
        <Button onPress={() => navigation.navigate('FindNeighboor')}
          title={'הכר את שכניך'}
        />
        <Button onPress={() => navigation.navigate('RegistrationExtra')}
          title={'המשך הרשמה'}
        />
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
    fontFamily: 'rubik-regular',
   width: '60%',
   paddingTop: 50,
   
  }
 
});

 export default MainPage;
