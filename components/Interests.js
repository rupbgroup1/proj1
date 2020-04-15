import OurButton from '../components/OurButton';
import { EvilIcons, FontAwesome5 } from '@expo/vector-icons';
import { Input, Divider } from 'react-native-elements';
import colors from '../assets/constant/colors';
import React, { Component, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';


const Interest = (props) => {
    const [selectedSub, setSelectedSub] = useState(0);

    return (
        <View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: "center", alignItems: "center" }}>

            {props.IntrestsArray !== null && props.IntrestsArray.map((Interest, i) =>
                <OurButton style={styles.intrestButtons}
                    title={Interest.IName}
                    key={Interest.Id}
                    onPress={() => props.handleMainChange(Interest.MainInterest)}>
                    <FontAwesome5 name={Interest.Icon} size={25} color={'#1985A1'} />
                </OurButton>

            )}
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: "center", alignItems: "center" }}>
            {props.subInArray !== null && props.subInArray.map((Interest, i) =>
                <OurButton

                    style={selectedSub!==Interest.Id ? styles.intrestButtons: styles.subButton}
                    title={Interest.Subintrest}
                    key={Interest.Id}
                    onPress={() => {
                        setSelectedSub(Interest.Id);
                        props.callFetch(Interest.Id);
                    }}>


                    {Interest.Subintrest}
                </OurButton>

            )}
        </View>
        </View>
            
       
        )
};
const styles = StyleSheet.create({
    intrestButtons: {
        backgroundColor: 'white',
        borderRadius: 15,
        margin: 3,
        paddingHorizontal: 5,
        paddingVertical: 5,
      borderColor:'black',
        borderBottomWidth:1,
        borderTopWidth:1,
        borderRightWidth:1,
        borderLeftWidth:1        
        
    },
    subButton: {
        backgroundColor: '#1985A1',
        borderRadius: 15,
        margin: 3,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderColor:'black',
        borderBottomWidth:1,
        borderTopWidth:1,
        borderRightWidth:1,
        borderLeftWidth:1 
    }
});
export default Interest;