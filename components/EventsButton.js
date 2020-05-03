import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const EventsBTN = props => {
    return(
        <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button:{
        backgroundColor: '#1dd1a1',
        paddingVertical:0,
        paddingHorizontal:10,
        borderColor: '#1dd1a1',
        shadowColor: '#1dd1a1',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation:20,
        height: 80,
        width: 80,
        borderRadius:400,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    buttonText:{
        color:'white',
        fontFamily: 'rubik-regular',
        fontSize:15,
        textAlign:'center',
        paddingVertical:20,
        textShadowOffset: { width: 1, height: 3 },
        textShadowRadius: 10,
        textShadowColor:'#f7f1e3'
    }
});

export default EventsBTN;