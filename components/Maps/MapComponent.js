import React, { useState, Component, useCallback, useEffect } from 'react';
import { Dimensions, TouchableOpacity, AsyncStorage , Text} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapComponent = (props) => {
    const [selectedLocation, setSelectedLocation] = useState();
    const blueMarker ="#180e8c";
    const pinkMarker ="#c439c6";


    const selectLocation = event => {
        setSelectedLocation({
            Lat: event.nativeEvent.coordinate.latitude,
            Lan: event.nativeEvent.coordinate.longitude
        });
    };

    let markerCoordinates;
    if (selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.Lat,
            longitude: selectedLocation.Lan
        };
        AsyncStorage.mergeItem('user', JSON.stringify(selectedLocation));
    }

    return (
        <TouchableOpacity style={{ flex: 1 }} onPress={props.onPress}>
            <MapView
                style={{
                    flex: 1, width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height
                }}
                region={props.region}
                showsUserLocation={true}
                // onRegionChange={(reg) => props.onRegionChange(reg)}
                onPress={selectLocation}
                searchData={props.searchData}
            >
                {props.searchData.length>0&& props.searchData.map((user, i) => {
                    if (user.Lat && user.Lan) {
                        console.log("TEST=", user.Lat);
                        return (<Marker
                            key={user.UserId}
                            coordinate={{
                                latitude: user.Lat,
                                longitude: user.Lan
                            }}
                            title={user.FirstName+", "+user.AboutMe}
                            pinColor={user.Gender!==2?blueMarker:pinkMarker}

                        ></Marker>
                        )
                    }
                })
                }

                {/* {markerCoordinates ? <Marker title='המיקום שלי' coordinate={markerCoordinates}></Marker> : <Marker title='המיקום שלי' coordinate={props.region}></Marker>} */}
            </MapView>

        </TouchableOpacity>
    )
}

export default MapComponent;