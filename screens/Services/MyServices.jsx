import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, Image, ScrollView, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import colors from '../../assets/constant/colors';
import { SearchBar, Card, Button, Overlay } from 'react-native-elements';
import OurButton from '../../components/OurButton';
import ProfileButton from '../../components/ProfileButton';
import { MaterialIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import moment from "moment";
import MapView, { Marker } from 'react-native-maps';

export default class MyServices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            allEvents: {},
            isLoading: true,
            text: '',
            filteredArray: [],
            visible: false,
            selectedCat: 0,
            selectedCard: {},
            selectedOwner: {},
            mapVisible: false

        };
        this.arrayholder = [];
        this.catArray = [];


    }

    componentDidMount() {
        this.getUser();
    }

    getUser() {
        AsyncStorage.getItem('user', (err, userJSON) => {
            const userObj = JSON.parse(userJSON);
            //console.log("obj==", userObj);
            this.setState({ user: userObj }, () =>
                this.fetchGetMyServices(userObj.UserId));
        }
        );

    }
    //I'm the owner
    fetchGetMyServices(userId) {
        console.log("in fetch");
        return fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/Services/My?userId=' + userId, {

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
                        console.log("Events = ", result);
                        this.arrayholder = result;
                        this.setState({ filteredArray: result })
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

    //filter the events by text
    SearchFilterFunction(text) {
        const newData = this.arrayholder.filter(function (item) {
            //applying filter for the inserted text in search bar
            const itemData = item.Name;
            return itemData.indexOf(text) > -1;
        });
        console.log("filter==", newData);
        newData.length < 1 && Alert.alert("לא נמצאו תוצאות");
        text != '' ?
            this.setState({
                //setting the filtered newData on datasource
                filteredArray: newData,
                text: text,
            })
            : this.setState({ filteredArray: this.arrayholder, text: text });
    }

    toggleOverlay() {
        this.setState({ visible: false });
    }

    toggleMapOverlay() {
        this.setState({ mapVisible: false });
    }

   




    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
                <Header />
                <BackButton goBack={() => navigation.navigate('MainPage')} />
                <View style={styles.row}>
                    <View style={styles.search}>
                        <SearchBar
                            placeholder="חפש/י אירועים בשכונה.."
                            onChangeText={text => this.SearchFilterFunction(text)}
                            onClear={text => this.SearchFilterFunction('')}
                            value={this.state.text}
                            lightTheme={true}
                            inputContainerStyle={{ backgroundColor: 'white', direction: 'rtl' }}
                            containerStyle={styles.searchContainer}
                        />
                    </View>
                    <View style={styles.addButton}>
                        <OurButton
                            title='add'
                            key='add'
                            onPress={() => navigation.navigate('CreateService')}>
                            <MaterialIcons name="add" size={40} color={colors.header} />
                        </OurButton>
                    </View>
                </View>
                <ScrollView>
                    {
                        this.state.filteredArray.length > 0 &&
                        this.state.filteredArray.map((s) => {

                            return (

                                <View style={{ right:  3.5 }}>
                                    <Card
                                        key={s.ServiceId}
                                        titleStyle={styles.cardTitle}
                                        image={{ uri: s.ImageGallery }}
                                        containerStyle={styles.cardContainer}
                                    >
                                        <Text style={styles.cardTitleText}>{s.ServiceName}</Text>
                                        <View style={{ flexDirection: 'row' }}>

                                            <Text style={styles.cardText}>{s.Description}</Text>
                                        </View>

                                        <View style={{ paddingVertical: 10 }}>
                                            <Button
                                                title='פרטים נוספים'
                                                buttonStyle={styles.cardButton}
                                                titleStyle={styles.cardButtonText}
                                                onPress={() => this.setState({ visible: true, selectedCard: s, selectedOwner: s.Owner })}
                                            >
                                            </Button>
                                        </View>
                                        <Overlay overlayStyle={styles.overlay} isVisible={this.state.visible} onBackdropPress={() => this.toggleOverlay()}>
                                            <Card
                                                key={this.state.selectedCard.ServiceId}
                                                image={{ uri: this.state.selectedCard.ImageGallery }}
                                                containerStyle={styles.innerCardContainer}
                                            >
                                                <View style={styles.details}>
                                                <Text style={styles.cardTitleText} >{this.state.selectedCard.ServiceName}</Text>
                                                <Text style={styles.serviceDetails}>{this.state.selectedCard.Description}</Text>
                                                <Text style={styles.serviceDetails}> דירוג העסק: {this.state.selectedCard.Rate}</Text>
                                                <Text style={styles.serviceDetails}> פתוח בימים:  {this.state.selectedCard.OpenDays}</Text>
                                                <Text style={styles.serviceDetails}> בין השעות: {this.state.selectedCard.OpenHoursStart}-{this.state.selectedCard.OpenHoursEnds}</Text>
                                                <Text style={styles.serviceDetails}> כתובת: {this.state.selectedCard.ServiceAddress}</Text>
                                                </View>
                                                <TouchableOpacity
                                                    style={{ paddingVertical: 20, alignSelf: 'center' }}
                                                    onPress={() => this.setState({ mapVisible: true })}>
                                                    {/* nav to map */}
                                                    <Text style={styles.locationText}>לחץ לצפייה במיקום העסק</Text>
                                                </TouchableOpacity>
                                                <Overlay isVisible={this.state.mapVisible} onBackdropPress={() => this.toggleMapOverlay()}>
                                                    <MapView
                                                        style={{
                                                            width: "100%",
                                                            height: "100%"
                                                        }}
                                                        region={{
                                                            latitude: this.state.selectedCard.Lat,
                                                            longitude: this.state.selectedCard.Lan,
                                                            latitudeDelta: 0.009,
                                                            longitudeDelta: 0.009,
                                                        }}>
                                                        <Marker
                                                            coordinate={{
                                                                latitude: this.state.selectedCard.Lat,
                                                                longitude: this.state.selectedCard.Lan,
                                                                latitudeDelta: 0.009,
                                                                longitudeDelta: 0.009,
                                                            }}
                                                            title={this.state.selectedCard.ServiceAddress}
                                                        />

                                                    </MapView>
                                                </Overlay>
                                                <Button
                                                    title='עריכה'
                                                    buttonStyle={styles.cardButton}
                                                    titleStyle={styles.cardButtonText}
                                                    onPress={() => {
                                                        this.setState({ visible: false }, () =>
                                                        navigation.navigate('CreateService', { edit: true, serviceDetails: this.state.selectedCard }));
                                                    }}
                                                > </Button>


                                            </Card>

                                        </Overlay>

                                    </Card>
                                </View>

                            )
                        }
                        )}
                </ScrollView>
            </View>
        );
    }
};
const styles = StyleSheet.create({
    imageCard: {
        resizeMode: 'cover'
    },
    row: {
        flexDirection: 'row',
    },
    addButton: {
        flexDirection: 'row',
        right: 15,
        top: 15
    },
    search: {
        flexDirection: 'row',
        width: '95%',
        paddingVertical: 5,
        left: 15
    },
    searchContainer: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 30,
        borderWidth: 0.5,
        borderColor: '#D1D3D4',
        height: '85%',
        marginVertical: 5
    },
    bottomIcons: {
        paddingBottom: 2
    },
    categories: {
        backgroundColor: 'white',
        borderRadius: 0,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderColor: '#D1D3D4',
        shadowColor: '#D1D3D4'
    },
    selectedCategory:{
        backgroundColor: colors.Business,
        borderRadius: 0,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderColor: '#D1D3D4',
        shadowColor: '#D1D3D4'
    },
    titleCat: { 
        color: colors.Business, 
        fontFamily:'rubik-regular' 
    },
    coloredTitleCat: { 
        color: 'white', 
        fontFamily:'rubik-bold' 
    },

    cardContainer: {
        width: Dimensions.get('window').width - 24,
        borderRadius: 6,
        borderColor: '#D1D3D4',
        shadowRadius: 5
    },
    innerCardContainer: {
        width: 330,
        height:550,
        alignSelf: 'center',
        borderWidth:0,
        top:40
    },
    cardTitle: {
        fontSize: 26,
        color: "black",
        fontFamily: 'rubik-regular'
    },
    cardTitleText: {
        alignSelf:'center',
        fontSize: 26,
        color: "black",
        fontFamily: 'rubik-regular'
    },
    cardIcons: {
        alignItems: "flex-end",
        direction: 'rtl',
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    cardIconsText: {
        right: -10,
        left: 10,
        fontFamily: 'rubik-regular'
    },
    cardText: {
        marginBottom: 10,
        fontFamily: 'rubik-regular',
        fontSize: 16,
        textAlign:'left'
    },
    cardButton: {
        borderRadius: 30,
        margin:10,
        width: '50%',
        height:40,
        alignSelf: 'center',
        backgroundColor: colors.Business,
        elevation: 4
    },
    cardButtonText: {
        fontSize: 16,
        fontFamily: 'rubik-regular'
    },
    locationText: {
        fontFamily: 'rubik-regular',
        fontSize: 16,
        color: colors.Business
    },
    innerCardImage: {
        height:200, 
        marginLeft:0, 
        marginRight:0
    },
    overlay:{
        backgroundColor: 'rgba(52, 52, 52, 0)'
    },
    serviceDetails:{
        paddingVertical:5,
        alignSelf:'flex-start',
        fontSize:16
    },
    details:{
        paddingVertical:20
    } 
});

