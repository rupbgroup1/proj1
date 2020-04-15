import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import ApiKey from '../../assets/constant/ApiKey';
import { AsyncStorage } from 'react-native';
import React, {useState} from 'react';

const GoogleAPIAutoComplete=(props) =>{
    
    return (

        <GooglePlacesAutocomplete
            placeholder='חפש'
            minLength={2} // minimum length of text to search
            autoFocus={true}
            returnKeyType={'search'} // Can be left out for default return key 
            listViewDisplayed={false}    // true/false/undefined
            fetchDetails={true}
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                props.notifyChange(details.geometry.location);
                props.CityName(details.name);
            }}
            query={{
                key: ApiKey.id,
                language: 'he',

            }}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={300}
            GooglePlacesDetailsQuery={{
                //fields: 'address_component'
                //fields: 'formatted_address'
            }}
            styles={{
                textInputContainer: {
                  backgroundColor: 'rgba(0,0,0,0)',
                  borderTopWidth: 0,
                  borderBottomWidth:0, 
                  
                },
                textInput: {
                  marginLeft: 0,
                  marginRight: 0,
                  height: 38,
                  color: '#5d5d5d',
                  fontSize: 16,
        paddingLeft: 10,
        textAlign: 'right',
        borderRadius: 8,
        borderColor: "black",
        borderWidth:1
                },
                predefinedPlacesDescription: {
                  color: 'rgba(0,0,0,0)'
                },
              }}
        />
    );
}

export default GoogleAPIAutoComplete;