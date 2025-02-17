import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../assets/constant/colors';

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
        backgroundColor: colors.Business,
        paddingVertical:0,
        paddingHorizontal:10,
        borderColor: colors.Business,
        shadowColor: colors.Business,
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
        fontSize:17,
        textAlign:'center',
        paddingVertical:18,
        textShadowOffset: { width: 1, height: 3 },
        textShadowRadius: 10,
        textShadowColor:'#f7f1e3'
    }

});

export default BusinessesBTN;