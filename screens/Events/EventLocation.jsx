import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, AsyncStorage, Alert, FlatList } from 'react-native';
import MapComponent from '../../components/Maps/MapComponent'
import GoogleAPIAutoComplete from '../../components/Maps/GoogleAPIAutoComplete';
import { getLocation } from '../../components/Maps/GeoCodes';
import colors from '../../assets/constant/colors';


export default class EventLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {},
            CityName: '',
            NeiName: '',
            searchData: [],
            canSubmit: false,
            Location:""

        };
    }


    getInitialState() {
        getLocation().then(
            (data) => {
                console.log(data);
                this.setState({
                    region: {
                        latitude: data.latitude,
                        longitude: data.longitude,
                        latitudeDelta: 0.003,
                        longitudeDelta: 0.003

                    }
                });
            }
        );
    }


    getCoordsFromName(loc) {
        //console.log(loc);
        this.setState({
            mapVisible: true,
            region: {
                latitude: loc.lat,
                longitude: loc.lng,
                longitudeDelta: 0.003,
                latitudeDelta: 0.003
            }
        });
    }

    //when choosing the location on map
    onMapRegionChange(region) {
        console.log("reg=", region);
        this.setState({ ...this.state.region, region });
        

    }

    handleCityName(name) {
        this.setState({ CityName: name });
        console.log(name);
    }
    handleFullName(name) {
        this.setState({ Location: name });
        console.log(name);
    }

    render() {
        return (
            <View style={styles.screen}>
            <View style={styles.middlePage}>
                <Text style={styles.subTitle}>חפש מיקום או סמן על גבי המפה</Text>
                <GoogleAPIAutoComplete style={styles.API} notifyChange={(loc) => this.getCoordsFromName(loc)} FullAddress={(name) => this.handleFullName(name)} CityName={(name)=>this.handleCityName(name)} />

            </View>

            <View style={styles.bottomPage}>

                <View style={styles.map}>
                    <MapComponent
                        region={this.state.region}
                        onRegionChange={(reg) => this.onMapRegionChange(reg)}
                        searchData={this.state.searchData}
                    />
                    <Button title={'שמור'}
                    onPress={() => {
                        this.props.navigation.navigate('CreateEvent',{region:this.state.region, Location:this.state.Location})
                    }}
                />
                </View>

                

            </View>
            </View>
   );

    }
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent:'space-between',
        //alignContent: 'flex-start',
        alignItems: 'stretch',
        flexWrap: 'wrap',
        backgroundColor: colors.reeBackgrouond
        
    },
    middlePage: {
        flex: 2,
        paddingTop:60,
        minHeight:200,
        
    },
    bottomPage: {
        flex: 6,
        paddingTop:40
    },
    subTitle: {
        fontFamily: 'rubik-regular',
        textAlign: 'center',
        marginBottom: 5,
        marginVertical: 1,
        fontSize: 20,
        //fontWeight: 'bold',
        color: colors.subTitle,
    },
    API: {
        paddingBottom: 70,
        paddingTop:60,

    },
    map: {
        //paddingTop:40

    },

});