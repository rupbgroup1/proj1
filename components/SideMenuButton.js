import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import PropTypes from 'prop-types';

export default class SMButton extends React.Component {
    render() {
        return (
            <TouchableOpacity style={styles.headerButtonContainer} onPress={this.props.onPress}>
                <FontAwesome5 name="bars" size={24} color={'white'} />
            </TouchableOpacity>
        );
    }
}

SMButton.propTypes = {
    onPress: PropTypes.func
};

const styles = StyleSheet.create({
    headerButtonContainer: {
        paddingTop:28,
        paddingHorizontal:20
    },
    headerButtonImage: {
        justifyContent: 'flex-start',
        width: 25,
        height: 25,
        margin: 6, 
        direction:'rtl'
    }
});