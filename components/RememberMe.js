import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, AsyncStorage, Alert } from 'react-native';
import {CheckBox} from 'react-native-elements';



const RememberMe = ({ navigation }) => {
  
  const [email, setEmail] = useState({ value: '', error: '' }); 
  const [password, setPassword] = useState({ value: '', error: '' });
  const [rememberMe, setRememberMe] = useState(false);

   
  
  
//remember me function
 const toggleRememberMe = () => {
    if(rememberMe === true){
      setRememberMe(false)
      forgetUser();
    }
    else{
      setRememberMe(true)
      rememberUser();
    }
      
  }

  //this func save user details if he press on remember me
 const rememberUser = async () => {
  const user = {
    Email: email.value,
    Password: password.value,
    rememberMe: rememberMe
  }
  
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      // Error saving data
    }
    }

    //each time when the screen shows, it will check if there is or not a user that store in the async storage
   useEffect(() =>{
    getRememberedUser()
    
   }, [])
   
   //check if there is or not user in async storage, if there is, his data will show automatically in the screen
    const getRememberedUser = async () => {
      try {
        
        const user = await AsyncStorage.getItem('user');
        const userDetails = JSON.parse(user);
        if (user !== null) {
          // We have username!!
         
          setEmail({ ...email, value: userDetails.Email })
          setPassword({ ...password, value: userDetails.PasswordTourist }) 
          setRememberMe(true)
        }
      } catch (error) {
        // Error retrieving data
      }
      };

//this func will forget user details if he press on remember me
    const forgetUser = async () => {
      try {
        await AsyncStorage.removeItem('user');
      } catch (error) {
       // Error removing
      }
    };

  return (
      <CheckBox
        center
        title='זכור אותי'
        checked={rememberMe}
        containerStyle={{backgroundColor: 'transparent', borderColor: 'transparent' }}
        textStyle={{color: 'white', fontFamily: 'rubik-regular'}}
        checkedColor='white'
        onPress={toggleRememberMe}
      />

      
  );
}


export default RememberMe;
