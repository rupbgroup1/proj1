import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';


const OurButton = props => {
  return (
    <TouchableOpacity  activeOpacity={0.1} onPress={props.onPress}>
      <View style={styles.button, props.style}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  button: {
    backgroundColor:'white',
    paddingHorizontal: 15,
    paddingVertical:15,
    borderRadius: 30,
    marginRight:15,
    marginLeft:15,
    
  },
  buttonText: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'rubik-regular'
  }
});

export default OurButton;
