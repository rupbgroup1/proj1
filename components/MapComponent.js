import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

const MapComponent = props => {
   return (
      <View>
         <MapView
            style={styles.map}
            showsUserLocation={false}
            followUserLocation={false}
            zoomEnabled={true}
            initialRegion={{
               latitude: 32.109333,
               longitude: 34.855499,
               latitudeDelta:  0.00922,
               longitudeDelta: 0.00421
            }}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   map: {
      height: 250,
      maxHeight: "80%",
      width: 400,
      maxWidth: "90%",
      marginTop: 30,
      marginBottom: 30,
   }
});

export default MapComponent;