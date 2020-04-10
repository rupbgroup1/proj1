import React, { memo } from 'react';
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard,Platform
} from 'react-native';

const Background = ({ children }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}><ImageBackground
    source={require('../assets/marius-spita-a1IjOJoHbM8-unsplash.jpg')}
    resizeMode="cover"
    style={styles.background}
  >
    <KeyboardAvoidingView style={styles.container}  behavior={Platform.Os == "ios" ? "padding" : "height"} >
      {children}
    </KeyboardAvoidingView>
   
  </ImageBackground>
  </TouchableWithoutFeedback> 
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    padding: 10,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(Background);