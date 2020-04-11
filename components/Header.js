import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GenderButton from './OurButton';
import { SimpleLineIcons } from '@expo/vector-icons';


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
    height: 83,
    paddingTop: 15,
    backgroundColor: '#008B8B',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    color: 'black',
    fontSize: 30, 
    fontFamily: 'kalam-regular',
    paddingTop:10
  }
});

export default Header;
