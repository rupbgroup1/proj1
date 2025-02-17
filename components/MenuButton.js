import React from 'react';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';


export default class MenuButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={styles.btnClickContain}
        underlayColor="rgba(128, 128, 128, 0.1)"
      >
        <View style={styles.btnContainer}>
          <Text style={styles.btnText}>{this.props.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

MenuButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string
};

const styles = StyleSheet.create({
    btnClickContain: {
      flexDirection: 'row',
      padding: 5,
      marginTop: 5,
      marginBottom: 5
    },
    btnContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start'
    },
    btnIcon: {
      height: 25,
      width: 25
    },
    btnText: {
      fontSize: 22,
      marginLeft: 10,
      marginTop: 2,
      fontFamily: 'rubik-regular',
     
    }
  });