import OurButton from '../components/OurButton';
import { EvilIcons, FontAwesome5 } from '@expo/vector-icons';
import { Input, Divider } from 'react-native-elements';
import colors from '../assets/constant/colors';
import React, { Component, useState , useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';


const Interest = (props) => {
    const [selectedSub, setSelectedSub] = useState(0);
    const [selectedMultiSub, setSelectedMultiSub] = useState([]);
    
    //pass the updated intrests selected
    useEffect(() => {
        props.isMulti&&props.callFetch(selectedMultiSub)
      },[selectedMultiSub] );

//when i is pressed it checks wether it's multi/single and updates the value
    handleSubPress = (interestId) => {
        if (props.isMulti) {
            if (selectedMultiSub.includes(interestId)) {
                setSelectedMultiSub(selectedMultiSub.filter(item => item !== interestId));
            }
            else {
                setSelectedMultiSub(selectedMultiSub => [...selectedMultiSub, interestId]);
            }
        }
        else {
            setSelectedSub(interestId);
            props.callFetch(interestId);
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
                        style={(!props.isMulti & selectedSub === Interest.Id) || (props.isMulti & selectedMultiSub.includes(Interest.Id)) ? styles.subButton : styles.intrestButtons}
                        title={Interest.Subintrest}
                        key={Interest.Id}
                        isMulti={props.isMulti}
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