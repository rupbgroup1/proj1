import React, { memo } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const ProfileButton = (props) => (
  <TouchableOpacity onPress={props.onPress} style={styles.container}>
    <Image style={styles.image} source={require('../assets/Icons/white-profile.png')} />
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 15 + getStatusBarHeight(),
    left: 10,
  },
  image: {
    width: 28,
    height: 28,
  },
});

export default memo(ProfileButton);