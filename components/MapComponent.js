import React, { useState, Component } from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';


const MapComponent = (props) => {
    const [selectedLocation, setSelectedLocation]= useState();

    const selectLocation=event=>{
        console.log(event);
        setSelectedLocation({
            lat:event.nativeEvent.coordinate.latitude,
            lng:event.nativeEvent.coordinate.longitude
        });
        console.log(selectLocation.lat);
    };

    let markerCoordinates;
    if(selectedLocation){
        markerCoordinates={
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        };
    }

   return (
       <TouchableOpacity style={{flex:1}} onPress={props.onPress}>
      <MapView
          style={{ flex: 1, width: Dimensions.get('window').width,
          height: Dimensions.get('window').height }}
          region={props.region}
          showsUserLocation={true}
         // onRegionChange={(reg) => props.onRegionChange(reg)}
         onPress={selectLocation}
        >
         { markerCoordinates && <Marker title='המיקום שלי' coordinate={markerCoordinates}></Marker>}
      </MapView>
      
      </TouchableOpacity>
  )
   }

export default MapComponent;