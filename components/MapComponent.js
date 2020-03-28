import React, { Component } from 'react';
import {Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const MapComponent = (props) => {
   return (
      <MapView
          style={{ flex: 1, width: Dimensions.get('window').width,
          height: Dimensions.get('window').height }}
          region={props.region}
          showsUserLocation={true}
          onRegionChange={(reg) => props.onRegionChange(reg)}>
          <Marker coordinate={props.region} />
      </MapView>
  )
   }

export default MapComponent;