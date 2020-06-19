import React, { Component} from 'react';
import colors from '../assets/constant/colors';
import { Button, View, StyleSheet, Text, ActivityIndicator, TextInput, AsyncStorage, Alert, TouchableOpacity } from 'react-native';

import Overlay from 'react-native-elements';
 
const OverlayExample = props=>{
    return (
        <View>
        <Overlay isVisible={true} >
         
              <Text style={styles.subTitle}>שם פרטי + משפחה</Text>
              <Text style={styles.note}>גיל: (משתנה גיל) </Text>
              <Text style={styles.note}>מגדר: (משתנה מגדר) </Text>
              <Text style={styles.note}> מצב משפחתי: (משתנה מצב משפחתי)</Text>
              <Text style={styles.note}> מקצוע: (משתנה מקצוע)</Text>
              <Text style={styles.note}> מקום עבודה: (משתנה מקום עבודה)</Text>
              <Text style={styles.note}> על עצמי: (משתנה על עצמי)</Text>
              <Text style={styles.note}> מספר ילדים: (משתנה מספר ילדים)</Text>
              <Text style={styles.note}>אירועים</Text>
              <Text style={styles.note}>עסק</Text>
              <Text style={styles.note}></Text>
              
              
         
        </Overlay>
        </View>
    );
  }


const styles = StyleSheet.create({
    subTitle: {
        fontFamily: 'rubik-regular',
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.subTitle,
        textAlign: "center",
        

    },

    note: {
        fontFamily: 'rubik-regular',
        //marginVertical: 1,
        fontSize: 20,
        color: 'black',
        //justifyContent:"center",
        textAlign: "center",
        padding:10
    },


})
export default OverlayExample;