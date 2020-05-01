import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, AsyncStorage, Alert, FlatList } from 'react-native';
import MapComponent from '../components/Maps/MapComponent';
import GoogleAPIAutoComplete from '../components/Maps/GoogleAPIAutoComplete';
import { getLocation } from '../components/Maps/GeoCodes';
import colors from '../assets/constant/colors';
import Header from '../components/Header';
import { Right } from 'native-base';
import BackButton from '../components/BackButton';
import { Dropdown } from 'react-native-material-dropdown';


export default class RegistraionP4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {},
            CityName: '',
            NeiList: [],
            NeiName: '',
            ShowDropDown: false,
            searchData: [],
            canSubmit: false,
            mapVisible: false
        };
    }

    //SAVE USER IN DB
    async getUser() {
        let userJSON = await AsyncStorage.getItem('user');
        const userObj = await JSON.parse(userJSON);
        //console.log(userJSON);
        console.log("asyn", userObj);
        this.setState({ user: userObj },()=>
        this.fetchPostNewUser());
    }

    fetchPostNewUser = () => {
        console.log("fetch user:",this.state.user);
        fetch('http://proj.ruppin.ac.il/bgroup1/prod/api/User', {
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
                    if (result === 1)
                        this.props.navigation.navigate('RegistrationP5');
                    else {
                        Alert.alert("מצטערים, הפרופיל לא נוצר בהצלחה. אנא נסה שנית.");
                        this.props.navigation.navigate('RegistrationP1');

                    }
                },
                (error) => {
                    console.log("err post=", error);
                    Alert.alert("אנא נסה שנית");
                }
            );

    }

    fetcGetNeigborhood = (name) => {
        fetch('http://proj.ruppin.ac.il/bgroup1/prod/api/Neighboorhoods?cityName=' + name, {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8'
            })
        })
            .then(res => {
                //console.log('res=', res);
                //con
                return res.json()
            })
            .then(
                (result) => {
                    console.log("fetch Get= ", result);
                    if (result.length > 1) {
                        this.setState({ ShowDropDown: true, NeiList: result })
                    }
                    else this.setState({ canSubmit: true, ShowDropDown: false, NeiName: name });
                },
                (error) => {
                    console.log("err post=", error);
                    Alert.alert("אנא נסה שנית");
                }
            );

    }


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
        //this.fetchGetNeiInCity();

    }

    handleCityName(name) {
        this.setState({ CityName: name });
        this.fetcGetNeigborhood(name);
    };


    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.screen}>
                <Header style={styles.header} />
                <BackButton goBack={() => navigation.navigate('Pic')} />
                <View style={styles.topPage}>
                <Text style={styles.subTitle} >
                    אנא בחר/י מקום מגורים
                </Text>
                <Text style={{ fontFamily: 'rubik-regular', textAlign: 'center', marginBottom: 10 }}>
                    מקום המגורים לא יחשף ללא הרשאתך
                     </Text>

                <GoogleAPIAutoComplete  notifyChange={(loc) => this.getCoordsFromName(loc)} CityName={(name) => this.handleCityName(name)} />

                {this.state.ShowDropDown &&
                    <Text style={{ fontFamily: 'rubik-regular', textAlign: 'center', marginBottom: 10 }}>אנא בחר/י שכונת מגורים אליה תשתייכ/י </Text>
                }
                {
                    this.state.ShowDropDown &&
                    <View style={styles.dropDown}>
                        <Dropdown
                            label='רשימת שכונות'
                            //value={this.state.Name}
                            valueExtractor={({ NCode }) => NCode}
                            labelExtractor={({ Name }) => Name}
                            data={this.state.NeiList}
                            selectedItemColor='#008b8b'
                            onChangeText={(value) => {
                                this.setState({
                                    NeiName: value,
                                    canSubmit: true
                                });
                            }}
                        />
                    </View>
                }
                </View>
                
                <View style={styles.bottomPage}>
                {this.state.mapVisible &&
                    <Text style={{ fontFamily: 'rubik-regular', textAlign: 'center', paddingBottom:10 }}>אנא סמנ/י מיקומך על המפה</Text>
                }

                {
                    this.state.mapVisible &&
                    <View style={styles.map}>
                        <MapComponent
                            region={this.state.region}
                            onRegionChange={(reg) => this.onMapRegionChange(reg)}
                            searchData={this.state.searchData}
                        />
                    </View>
                }
                
                {this.state.canSubmit &&
                    <Button title={'המשך'}
                        //need to check user filled in all fields!!
                        onPress={() => {
                            let userDetails = {
                                CityName: this.state.CityName,
                                NeighborhoodName: this.state.NeiName
                            }
                            AsyncStorage.mergeItem('user', JSON.stringify(userDetails));
                            this.getUser()
                        }}
                    />
                }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'center',
        alignContent:'flex-start',
        backgroundColor: colors.reeBackgrouond
    },
    header:{
        flex:1
    },
    topPage:{
        flex:2,
        paddingBottom:30
    },
    bottomPage:{
        flex:3
    },
    subTitle: {
        fontFamily: 'rubik-regular',
        textAlign: 'center',
        marginBottom: 10,
        marginVertical: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.subTitle,
        paddingTop: 25,
    },
    map: {
        alignContent: 'flex-start',
        height: '70%'

    },
    dropDown:{
        alignContent:'flex-start',
        flexDirection:'column-reverse',
        paddingLeft:20,
        paddingRight:20
    }

});