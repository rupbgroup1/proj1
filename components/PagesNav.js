import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';


const calendarIcon = require('../assets/Icons/calendar.png');
const galleryIcon = require('../assets/Icons/gallery.png');
const profileIcon = require('../assets/Icons/profile.png');

const PagesNav=(props)=> {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        
        <TouchableOpacity
          //onPress={() => props.navigation.navigate('FindNeighboor')}
          style={styles.item}
        >
          <Image
            resizeMode="contain"
            source={galleryIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          //onPress={() => props.navigation.navigate('FindNeighboor')}
          style={styles.item}
        >
          <Image
            resizeMode="contain"
            source={profileIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
         // onPress={() => props.navigation.navigate('FindNeighboor')}
          style={styles.item}
        >
          <Image
            resizeMode="contain"
            source={calendarIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Calendar</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
    height:5,
    width:'100%'
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  item: {
    flex: 1,
    height: 90,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 5,
  },
  itemText: {
    color: '#555CC4',
  },
  itemImage: {
    height: 35,
  },
});

export default PagesNav;