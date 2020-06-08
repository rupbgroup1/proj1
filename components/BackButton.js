import React, { memo } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const BackButton = ({ goBack }) => (
  <TouchableOpacity onPress={goBack} style={styles.container}>
    <Image style={styles.image} source={require('../assets/whiteArrow.png')} />
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50 ,
    left: 10,
  },
  image: {
    width: 20,
    height: 24,
  },
});

export default memo(BackButton);