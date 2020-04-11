import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import ApiKey from '../../assets/constant/ApiKey';

function GoogleAPIAutoComplete(props){
    return (

        <GooglePlacesAutocomplete
            
        placeholder='חפש'
        minLength={2} // minimum length of text to search
        autoFocus={true}
        returnKeyType={'search'} // Can be left out for default return key 
        listViewDisplayed={false}    // true/false/undefined
        fetchDetails={true}
        onPress={( data,details = null) => { // 'details' is provided when fetchDetails = true
         props.notifyChange(details.geometry.location);
         console.log(data,details);
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
    />
        );
}

export default GoogleAPIAutoComplete;