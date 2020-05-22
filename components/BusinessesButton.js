import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const BusinessesBTN = props => {
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
        backgroundColor: '#218c74',
        paddingVertical:0,
        paddingHorizontal:10,
        borderColor: '#38ada9',
        shadowColor: '#38ada9',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation:20,
        height: 75,
        width: 75,
        borderRadius:400,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    buttonText:{
        color:'white',
        fontFamily: 'rubik-regular',
        fontSize:20,
        textAlign:'center',
        paddingVertical:25,
        textShadowOffset: { width: 1, height: 3 },
        textShadowRadius: 10,
        textShadowColor:'#f7f1e3'
    }
});

export default BusinessesBTN;