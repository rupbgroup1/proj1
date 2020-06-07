import React, { useState, Component, useCallback, useEffect } from 'react';
import { Dimensions, TouchableOpacity, AsyncStorage, Text, Image, Alert, View } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import OverlayExample from '../OverlayExample';



const MapComponent = (props) => {
    const [selectedLocation, setSelectedLocation] = useState();
    //const blueMarker ="#0C2C33";
    // //const pinkMarker ="#703D57";
    const blueImage = require('./MarkerIcons/location-icon-m.jpg');
    const pinkImage = require('./MarkerIcons/location-icon-f.jpg');

    // const blueImage = require('./MarkerIcons/blue-loc.png');
    // const pinkImage = require('./MarkerIcons/red-loc.png');



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
            longitude: selectedLocation.Lan,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009

        };
        AsyncStorage.mergeItem('user', JSON.stringify(selectedLocation));
    }

    return (
        <TouchableOpacity style={{ flex: 1 }} onPress={props.onPress}>
            <MapView
                //ref={map => {this.map = map}}
                style={{
                    flex: 1, width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height
                }}
                region={props.region}
                showsUserLocation={true}
                //onRegionChange={(reg) => props.onRegionChange(reg)}
                onRegionChangeComplete={(reg) => props.onRegionChange(reg)}
                onPress={selectLocation}
                searchData={props.searchData}
                fitToSuppliedMarkers={(["10M", "1M", "2M", "3M", "4M", "5M", "6M", "7M", "8M", "9M"], {
                    edgePadding:
                    {
                        top: 5,
                        right: 5,
                        bottom: 5,
                        left: 5
                    }

                })
                }
            >
                {props.searchData.length > 0 && props.searchData.map((user, i) => {
                    if (user.Lat && user.Lan) {
                        console.log("TEST=", props.searchData);
                        let age = new Date().getFullYear() - user.YearOfBirth;
                        let about = (user.AboutMe != null ? ", " + user.AboutMe : '');

                        return (
                            <Marker
                                key={user.UserId}
                                coordinate={{
                                    latitude: user.Lat,
                                    longitude: user.Lan,
                                }}
                                identifier={i + "M"}
                                title={user.FirstName + ", " + age + about}
                                // onPress={(e) => {
                                //     //e.isPropagationStopped();
                                //     e.stopPropagation();
                                //     Alert.alert("ללל"+user.FirstName);
                                // }}

                            >

                                {user.Gender !== 1 ?
                                    <Image
                                        source={blueImage}
                                        style={{ height: 36, width: 26 }}
                                    /> :
                                    <Image
                                        source={pinkImage}
                                        style={{ height: 36, width: 26 }}
                                    />
                                }
                                <Callout
                                    onPress={(e) => {
                                        //e.stopPropagation();
                                        Alert.alert("knlk"+user.FirstName);
                                    }}>
                                    <View>
                                        <Text>{user.FirstName + ", " + age + about}</Text>
                                    </View>

                                </Callout>
                            </Marker>
                        )
                    }
                })
                }

                {markerCoordinates!=null ? <Marker title='המיקום שלי' coordinate={markerCoordinates}></Marker> : <Marker title='המיקום שלי' coordinate={props.region}></Marker>}
                {/* {<Marker
                    coordinate={{
                        latitude: 32.358049736540236,
                         longitude: 34.92328689199281,
                         latitudeDelta: 0.009,
                         longitudeDelta: 0.009
                    }}
                >
                    <Callout
                    onPress={() => {
                      Alert.alert("knlk");
                    }}>
                    <View>
                        <Text>This is a plain view</Text>
                    </View>
                </Callout>
                </Marker>} */}
            </MapView>

        </TouchableOpacity >
    )
}

export default MapComponent;