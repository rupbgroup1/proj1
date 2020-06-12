import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../assets/constant/colors';


const Header = props => {
  return (
    <View style={styles.header}>
       <Text style={styles.headerTitle}>Commy</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 100,
    paddingTop: 25,
    backgroundColor:colors.header,
    alignItems: 'center'
  },
  headerTitle: {
    color: 'white',
    fontSize: 30, 
    fontFamily: 'kalam-regular',
    paddingTop:10
  }
});

export default Header;
