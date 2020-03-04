import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


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
    height: 80,
    paddingTop: 15,
    backgroundColor: '#B0E0E6',
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
