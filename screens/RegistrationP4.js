import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, AsyncStorage } from 'react-native';
import MapComponent from '../components/MapComponent';
import GoogleAPIAutoComplete from '../components/GoogleAPIAutoComplete';
import { getLocation } from '../components/GeoCodes';
import colors from '../assets/constant/colors';
import Header from '../components/Header';
import { Right } from 'native-base';


export default class RegistraionP4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {},
            addressName: '',
            user: this.props.navigation.getParam('user'),

            lat1: 0.00,
            lng1: 0.00


        };
    }

    //SAVE USER IN DB
    fetchPostNewUser = () => {

        fetch('http://proj.ruppin.ac.il/bgroup1/test1/tar1/api/User', {
            method: 'POST',
            body: JSON.stringify(this.state.user),
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8'
            })
        })
            .then(res => {
                //console.log('res=', res);
                return res.json()
            })
            .then(
                (result) => {
                    console.log("fetch POST= ", result);
                    //this.props.navigation.navigate('Pic');
                },
                (error) => {
                    console.log("err post=", error);
                    Alert.alert("אנא נסה שנית");
                }
            );

    }

test(){
    AsyncStorage.getItem('user', (err, result) => {
        console.log(result);
    });
}
    componentDidMount() {
        this.getInitialState();
        
    }

    // updateState(lat, lng) {

    //     this.setState({ lat1: lat, lng1: lng });
      
    // }
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
                <Text>{this.state.lat},{this.state.lng}</Text>
                <Text style={styles.subTitle} >
                    אנא בחר/י מקום מגורים
                </Text>
                <Text style={{ fontFamily: 'rubik-regular', textAlign: 'center', marginBottom: 10 }}>
                    מקום המגורים לא יחשף ללא הרשאתך
                    </Text>

                <View style={{ flex: 1, textAlign: 'right' }}>
                    <GoogleAPIAutoComplete style={{ textAlign: 'right' }} notifyChange={(loc) => this.getCoordsFromName(loc)}
                    />
                </View>

                {
                    this.state.region['latitude'] ?
                        <View style={{ flex: 1 }}>
                            <MapComponent
                                region={this.state.region}
                                onRegionChange={(reg) => this.onMapRegionChange(reg)}
                                //passToParent={(lat,lng)=>this.updateState(lat,lng)}
                            />
                        </View> : null}


                <Button title={'המשך'}
                    onPress={() => this.test()}
                    //this.props.navigation.navigate('RegistrationP5')
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
        fontFamily: 'rubik-regular',
        textAlign: 'center',
        marginBottom: 10,
        marginVertical: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.subTitle,
        paddingTop: 25
    }

});