import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import MapComponent from '../components/MapComponent';
import GoogleAPIAutoComplete from '../components/GoogleAPIAutoComplete';
import { getLocation } from '../components/GeoCodes';
import colors from '../assets/constant/colors';
import Header from '../components/Header';


export default class RegistraionP4 extends Component {
    state = {
        region: {},
        addressName: ''
    };

    componentDidMount() {
        this.getInitialState();
    }

    //get current location of the user
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
            region: {
                latitude: loc.lat,
                longitude: loc.lng,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003
            }
        });
        geocodeLocationByCoords(loc.lat, loc.lan);
    }

    onMapRegionChange(region) {
        this.setState({ region });

    }


    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.screen}>
                <Header />
                <Text style={styles.subTitle} >
                    אנא בחר/י מקום מגורים
                </Text>
                <Text >
                    מקום המגורים לא יחשף ללא הרשאתך
                    </Text>
                    
                <View style={{ flex: 1 }}>
                    <GoogleAPIAutoComplete notifyChange={(loc) => this.getCoordsFromName(loc)}
                    />
                </View>

                {
                    this.state.region['latitude'] ?
                        <View style={{ flex: 1 }}>
                            <MapComponent
                                region={this.state.region}
                                onRegionChange={(reg) => this.onMapRegionChange(reg)} />
                        </View> : null}
                        <Text style={styles.subTitle} >
                   אנא סמנ/י שכונה על גבי המפה
                </Text>
                {
                    this.state.region['latitude'] ?
                        <View style={{ flex: 1 }}>
                            <MapComponent
                                region={this.state.region}
                                onRegionChange={(reg) => this.onMapRegionChange(reg)} />
                        </View> : null}
            <Button  title={'המשך'}
                onPress={() => this.props.navigation.navigate('RegistrationP5')}
            /> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
    },
    subTitle: {
        marginVertical: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.subTitle,
        paddingTop: 25
    }

});
