import React, { Component } from 'react';
import { Button, View, StyleSheet, Text, ActivityIndicator, TextInput, AsyncStorage } from 'react-native';
import Header from '../components/Header';
import colors from '../assets/constant/colors';
import MapComponent from '../components/Maps/MapComponent';
import { Input, Divider } from 'react-native-elements';
import Interests from '../components/Interests';
import BackButton from '../components/BackButton';


export default class FindNeighboor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchName: '',
            //usersAround: [],
            region: {
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
                //for now: **delete**
                //longitude:34.121212,
                //latitude:34.121212
            },
            IntrestsArray: [],
            searchData: [],
            subInArray: [],
            mainI: ''
        };
    }

    componentDidMount() {
        this.fetchGetAllIntrests();
        this.getUser();
    }

    async getUser() {
        let userJSON = await AsyncStorage.getItem('user');
        const userObj = await JSON.parse(userJSON);
        this.setState({
            region: {
                ...this.state.region,
                latitude: userObj.Lat,
                longitude: userObj.Lan
            }
        });
        console.log(userJSON);
        console.log(userObj);
        this.setState({ user: userObj });

    }
    //fetch -get all intrests to search by
    fetchGetAllIntrests() {
        return fetch('http://proj.ruppin.ac.il/bgroup1/test1/tar1/api/Intrests', {

            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        })
            .then(res => {
                //console.log('res=', res);
                //console.log("in");
                //const statusCode = res.status;
                //console.log(statusCode);
                return res.json();
            })
            .then(
                (result) => {
                    if (result.length > 0) {
                        console.log(result);
                        this.setState({ IntrestsArray: result })
                    }
                    else
                        Alert.alert("מצטערים, אנו נסו שנית!");
                },
                (error) => {
                    console.log("err post=", error);
                    Alert.alert("מצטערים, אנו נסו שנית!");
                }
            );
    }
    //fetch - search the user from the nei by the name the user searched
    fetchSearchNeiByName = () => {
        const searchKeys = {
            FirstName: this.state.searchName,
            NeighborhoodName: "test"
            //CityName: this.state.user.CityName
        }

        // console.log(this.state.searchName+this.state.user.CityName);
        return fetch('http://proj.ruppin.ac.il/bgroup1/test1/tar1/api/Neighboors/userName', {
            method: 'POST',
            body: JSON.stringify(searchKeys),
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8'
            })
        })
            .then(res => {
                console.log('SEARCHDATA');
                return res.json();

            })
            .then(
                (result) => {
                    console.log("fetch result= ", result);
                    this.setState({ searchData: result });

                },
                (error) => {
                    console.log("err post=", error);
                });

    }


    //get sub intrest of main
    fetchSubInterest = () => {
        console.log(this.state.mainI);
        // console.log(this.state.searchName+this.state.user.CityName);
        return fetch('http://proj.ruppin.ac.il/bgroup1/test1/tar1/api/Intrests/Sub?mainI=' + this.state.mainI, {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8'
            })
        })
            .then(res => {
                return res.json();
            })

            .then(
                (result) => {
                    console.log("fetch result= ", result[0]);
                    this.setState({ subInArray: result });
                    console.log("2");
                },
                (error) => {
                    console.log("err post=", error);
                });

    }

    //fetch - search the user from the nei by interest the user searched
    fetchSearchNeiByInterest = (Id) => {

        this.setState({ selectedInterest: Id });
        const intrestId = Id;
        const NeighborhoodName = this.state.user.NeighborhoodName;

        return fetch('http://proj.ruppin.ac.il/bgroup1/test1/tar1/api/Neighboors/Intrest/' + NeighborhoodName + '/' + intrestId, {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8'
            })
        })
            .then(res => {
                console.log('SEARCH BY I');
                return res.json();

            })
            .then(
                (result) => {
                    console.log("fetch I result= ", result);
                    this.setState({ searchData: result });

                },
                (error) => {
                    console.log("err post=", error);
                });

    }

    onMapRegionChange(region) {
        this.setState({ region });

    }

    handleMainChange(mainI) {
        this.setState({ mainI: mainI }, () => {
            this.fetchSubInterest();
        });

    }

    render() {

        return (
            <View style={styles.screen}>
                <Header />
                <BackButton goBack={() => navigation.navigate('MainPage')} />
                <Text style={styles.text} >
                    חפש שם של שכן
                   </Text>
                   <TextInput
                    value={this.state.searchName}
                    onChangeText={(text) => this.setState({ searchName: text })}
                    placeholder={'...'}
                    style={styles.input}
                    leftIcon={{ type: 'EvilIcons', name: 'search' }}
                    onEndEditing={() => this.fetchSearchNeiByName()}

                //placeholderTextColor="black"

                />
                <Divider style={{ backgroundColor: 'blue', height: 2 }} />
                <Text style={styles.text} >
                    או
                   </Text>
                <Text style={styles.text} >
                    חפש לפי תחום עניין משותף
                   </Text>
                <Interests
                    IntrestsArray={this.state.IntrestsArray}
                    handleMainChange={(mainI) => this.handleMainChange(mainI)}
                    subInArray={this.state.subInArray}
                    callFetch={(id) => this.fetchSearchNeiByInterest(id)}
                /><View style={{width:'100%',justifyContent: 'space-between', backgroundColor:'black'}}>
                <Text style={styles.textHead} >
                  שכנים שכדאי לך להכיר
                   </Text>
                   </View>
                <View style={styles.mapView}>
                    <MapComponent
                        region={this.state.region}
                        onRegionChange={(reg) => this.onMapRegionChange(reg)}
                        searchData={this.state.searchData}
                        style={{ flex: 1, height: '100%', width: '100%', borderRadius: 10 }}

                    />
                </View>
            
            </View>
        );
    }
}

const styles = StyleSheet.create({
    subTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.subTitle,
        paddingTop: 25,
        paddingBottom: 10,
        justifyContent: "center",
        alignItems: "center",

    },
    intrestButtons: {
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 3,
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    mapView: {
        flex: 1,
        zIndex: -1,
        borderWidth: 1,
        borderColor: 'black',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontFamily: 'rubik-regular',
        marginVertical: 1,
        marginBottom: 10,
        fontSize: 18,
        paddingTop: 10,
        color: 'black',
    },
    textHead:{
        fontFamily: 'rubik-regular',
        marginVertical: 1,
        marginBottom: 10,
        fontSize: 20,
        paddingTop: 10,
        color: colors.header,
        alignSelf: 'flex-start'
    },
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.reeBackgrouond
    },
    input: {
        // height: 35,
        paddingTop: 5,
        backgroundColor: 'white',
        //borderRadius: 10,
        width: '90%',
        paddingLeft: 10,
        textAlign: 'right',
        borderRadius: 8,
        borderColor: "black",
        borderWidth:1

    },
    buttonSearch: {
        width: '100%'
    }

});