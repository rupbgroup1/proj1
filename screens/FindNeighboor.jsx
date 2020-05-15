import React, { Component } from 'react';
import { Button, View, StyleSheet, Text, ActivityIndicator, TextInput, AsyncStorage, Alert, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import colors from '../assets/constant/colors';
import MapComponent from '../components/Maps/MapComponent';
import Interests from '../components/Interests';
import BackButton from '../components/BackButton';


export default class FindNeighboor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchName: '',
            MatchUsers: [],
            region: {
                latitudeDelta: 0.009,
                longitudeDelta: 0.009,
            },
            IntrestsArray: [],
            searchData: [],
            subInArray: [],
            mainI: '',
            selectedInterest: 0,
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
            },
            user: userObj,
            NeighborhoodName: userObj.NeighborhoodName
        });

        this.fetchGetMatches(userObj.UserId);
    }

    //fetch - get match users
    fetchGetMatches(userId) {
        return fetch('http://proj.ruppin.ac.il/bgroup1/prod/api/Neighboors/Match?userId=' + userId, {

            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        })
            .then(res => {
                return res.json();
            })
            .then(
                (result) => {
                    if (result.length > 0) {
                        console.log("matcch", result);
                        this.setState({ MatchUsers: result })
                    }
                    else
                        Alert.alert(" מצטערים, אנו נסו שנית!");
                },
                (error) => {
                    console.log("err post=", error);
                    Alert.alert("מצטערים, אנו נסו שנית!");
                }
            );
    }

    //fetch -get all intrests to search by
    fetchGetAllIntrests() {
        return fetch('http://proj.ruppin.ac.il/bgroup1/prod/api/Intrests', {

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
            NeighborhoodName: this.state.NeighborhoodName

        }

        //console.log("neiii==", this.state.NeighborhoodName);

        return fetch('http://proj.ruppin.ac.il/bgroup1/prod/api/Neighboors/userName', {
            method: 'POST',
            body: JSON.stringify(searchKeys),
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8'
            })
        })

            .then(res => {
                //console.log('SEARCHDATA');
                return res.json();

            })
            .then(
                (result) => {
                    if (result.length > 0) {
                        console.log("fetch result= ", result);
                        this.setState({ searchData: result });
                    }
                    else
                        Alert.alert("לא נמצא שכן");
                },
                (error) => {
                    console.log("err post=", error);
                });

    }


    //get sub intrest of main
    fetchSubInterest = () => {
        console.log(this.state.mainI);
        // console.log(this.state.searchName+this.state.user.CityName);
        return fetch('http://proj.ruppin.ac.il/bgroup1/prod/api/Intrests/Sub?mainI=' + this.state.mainI, {
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
        const NeighborhoodName = this.user.NeighborhoodName;

        return fetch('http://proj.ruppin.ac.il/bgroup1/prod/api/Neighboors/Intrest/' + NeighborhoodName + '/' + intrestId, {
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
        console.log(region);
    }

    handleMainChange(main) {
        this.setState({ mainI: main }, () => {
            this.fetchSubInterest();
        });

    }




    render() {

        return (
            <View style={styles.screen}>
                <Header />
                <BackButton goBack={() => this.props.navigation.navigate('MainPage')} />
                <Text style={styles.text} >
                    חיפוש לפי שם של שכן
                   </Text>
                <TextInput
                    value={this.state.searchName}
                    onChangeText={(text) => this.setState({ searchName: text })}
                    placeholder={'הזנ/י שם של שכן'}
                    style={styles.input}
                    leftIcon={{ type: 'EvilIcons', name: 'search' }}
                    onEndEditing={() => this.fetchSearchNeiByName()}


                />
                <Text style={styles.text} >
                    חפש לפי תחום עניין משותף
                   </Text>
                <Interests
                    IntrestsArray={this.state.IntrestsArray}
                    handleMainChange={(mainI) => this.handleMainChange(mainI)}
                    subInArray={this.state.subInArray}
                    callFetch={(id) => {
                        id !== this.state.intrestId && this.fetchSearchNeiByInterest(id)
                    }}
                    cleanUserName={() => this.setState({ searchName: '' })}
                    isMulti={false}
                />
                <Text>{'\n'}</Text>
                <View style={styles.textHeadBackground}>

                    <Text style={styles.textHead} >
                        שכנים שכדאי לך להכיר
                    </Text>


                </View>

                <View style={styles.mapView}>
                    <MapComponent
                        region={this.state.region}
                        onRegionChange={(reg) => this.onMapRegionChange(reg)}
                        //checking - show match or search result
                        searchData={(!this.state.searchName && this.state.selectedInterest < 1) ? this.state.MatchUsers : this.state.searchData}
                        style={{ flex: 1, height: '100%', width: '100%', borderRadius: 10 }}

                    />
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Param')}
                        style={{paddingVertical:15}}
                    >
                        <Text style={{fontFamily: 'rubik-regular', fontSize:16}}>מרוצה מההתאמה? עזור לנו להשתפר עבורך</Text>
                    </TouchableOpacity>
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
        paddingVertical: 5,
        borderColor: 'white'
    },
    mapView: {
        flex: 1,
        zIndex: -1,
        borderWidth: 1,
        borderColor: 'white',
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
    textHead: {
        fontFamily: 'rubik-regular',
        marginVertical: 1,
        fontSize: 20,
        //padding: 10,
        color: 'white',
        alignSelf: 'center',

    },
    textHeadBackground: {
        width: '100%',
        justifyContent: 'space-between',
        //backgroundColor:'#F36B74'
        backgroundColor: '#0fb9b1'

    },
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.reeBackgrouond
    },
    input: {
        fontFamily: 'rubik-regular',
        width: '95%',
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: 10,
        textAlign: 'right',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 10
    },
    buttonSearch: {
        width: '100%'
    }

});