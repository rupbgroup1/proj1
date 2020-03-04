import React, { Component } from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';

const RegistrationIntroduction = () => {
 
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
        <Button
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
    backgroundColor: '#ecf0f1',
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
