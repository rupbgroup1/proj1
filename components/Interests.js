import OurButton from '../components/OurButton';
import { FontAwesome5 } from '@expo/vector-icons';
import colors from '../assets/constant/colors';
import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';


const Interest = (props) => {
    //one choice
    const [selectedSub, setSelectedSub] = useState(0);
    //multii
    const [selectedMultiSub, setSelectedMultiSub] = useState([]);

    //pass the updated interests selected (array) for multi only
    useEffect(() => {
        console.log(selectedMultiSub);
        props.isMulti&& props.callFetch(selectedMultiSub)
    }, [selectedMultiSub] 
    
     );

    //when i is pressed it checks wether it's multi/single and updates the value
    handleSubPress = (interestId) => {
        const iObj = {Id:interestId};
        if (props.isMulti) {
            //it check if the user press on the same i to cancel it or selected new i
            if  (selectedMultiSub.some(e => e.Id === interestId)) {
                //remove from array
                setSelectedMultiSub(selectedMultiSub.filter(item => item.Id !== interestId));
            }
            else {
                //add to array
                setSelectedMultiSub(selectedMultiSub => [...selectedMultiSub, iObj]);
            }
        }
        else {
            //it check if the user press on the same i to cancel it or selected new i
            //update state
            selectedSub===interestId? setSelectedSub(0) : setSelectedSub(interestId);
            //update parent
            selectedSub===interestId? props.callFetch(0) :props.callFetch(interestId);
        }

    };
    


    return (
        <View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: "center", alignItems: "center" }}>

                {props.IntrestsArray !== null && props.IntrestsArray.map((Interest, i) =>
                    //mainCat
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
                    //subCat
                    <OurButton
                    //change color when selected
                        style={(!props.isMulti && selectedSub === Interest.Id) || (props.isMulti && selectedMultiSub.some(e => e.Id === Interest.Id)) ? styles.subButton : styles.intrestButtons}
                        title={Interest.Subintrest}
                        key={Interest.Id}
                        //get from parent= is it multi selected?
                        isMulti={props.isMulti}
                        //change value when pressed
                        onPress={() => handleSubPress(Interest.Id)}>
                    
                        {Interest.Subintrest}
                    </OurButton>

                )}
            </View>
        </View>


    )
};
const styles = StyleSheet.create({
    //not selected
    intrestButtons: {
        backgroundColor: 'white',
        borderRadius: 15,
        margin: 3,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderColor: 'black',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1

    },
    //selected
    subButton: {
        backgroundColor: '#1985A1',
        borderRadius: 15,
        margin: 3,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderColor: 'black',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1
    }
});
export default Interest;