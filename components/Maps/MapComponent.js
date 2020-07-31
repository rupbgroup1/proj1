import React, { useState, Component, useCallback, useEffect } from 'react';
import { Dimensions, TouchableOpacity, AsyncStorage, Text, Image, Alert, View } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import OverlayExample from '../../screens/OverlayExample';



const MapComponent = (props) => {
    const [selectedLocation, setSelectedLocation] = useState();
    //const blueMarker ="#0C2C33";
    // //const pinkMarker ="#703D57";
    const blueImage = require('./MarkerIcons/location-icon-m.jpg');
    const pinkImage = require('./MarkerIcons/location-icon-f.jpg');



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
                    if (user.Lat!=null && user.Lan!=null) {
                        //console.log("TEST=", props.searchData);
                        let age = new Date().getFullYear() - user.YearOfBirth;
                        let about = (user.AboutMe != null ? user.AboutMe : '');


                        return (

                            <Marker
                                key={user.UserId}
                                coordinate={{
                                    latitude: user.Lat,
                                    longitude: user.Lan,
                                }}
                                identifier={i + "M"}
                                title={user.FirstName + ", " + age + about}
                                onPress={(e) => {
                                    //     //e.isPropagationStopped();
                                    e.stopPropagation();
                                    //     Alert.alert("ללל"+user.FirstName);
                                }}

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
                                <Callout style={{width:140}}
                                    onPress={(e) => {
                                        e.stopPropagation();
                                        e.isPropagationStopped();
                                        //props.nav.navigate('Profile');                    
                                        Alert.alert(
                                           "רוצה להכיר את "+user.FirstName + " "+ user.LastName+"?",
                                            user.AboutMe,
                                            [
                                                {
                                                    text: 'צפייה בפרופיל',
                                                    onPress: () => {
                                                        console.log('to profile', user.UserId);
                                                        props.nav.navigate('Profile', {neighboor:user});
                                                    }
                                                },
                                                {
                                                    text: 'שלח הודעה',
                                                    onPress: () => props.nav.navigate('Chat', {userCode:user.UserId})
                                                },
                                                {
                                                    text: 'ביטול',
                                                    onPress: () => console.log('Cancel Pressed'),
                                                    style: 'cancel'
                                                },

                                            ],
                                            {cancelable: false}
                                        );

                                            
                                    }}>
                                    <View>
                                        <Text style={{fontFamily:'rubik-medium' }}>{user.FirstName + ", " + age}</Text>
                                        <Text style={{fontFamily:'rubik-regular', color:'#0fb9b1' }}>{about}</Text>
                                    </View>

                                </Callout>
                            </Marker>
                        )
                    }
                })
                }

                {markerCoordinates != null ? <Marker title='המיקום שלי' coordinate={markerCoordinates}></Marker> : <Marker title='המיקום שלי' coordinate={props.region}></Marker>}
                
            </MapView>

        </TouchableOpacity >
    )
}

export default MapComponent;