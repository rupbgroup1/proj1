import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../assets/constant/colors';
import SMButton from '../components/SideMenuButton';


function Header (props) {
  return (
    <View style={styles.header}>
      <SMButton onPress={() => {
          props.navigation.openDrawer();
        }}/>
      <Text style={styles.headerTitle} >Commy</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 100,
    paddingTop: 25,
    backgroundColor:colors.header,
    flexDirection:'row-reverse'
  },
  headerTitle: {
    color: 'white',
    fontSize: 30, 
    fontFamily: 'kalam-regular',
    paddingTop:20,
    textAlign:'center'
  }
});

export default Header;