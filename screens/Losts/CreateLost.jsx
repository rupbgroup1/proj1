import React, { Component, useState } from 'react';
import { View, TextInput, Text, StyleSheet, AsyncStorage, ImageBackground, ScrollView, Alert, Dimensions, TouchableOpacity, Platform, Keyboard } from 'react-native';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import { SearchBar, Card, Button, Overlay } from 'react-native-elements';
import OurButton from '../../components/OurButton';
import { MaterialIcons } from '@expo/vector-icons';
//import { SimpleLineIcons } from '@expo/vector-icons';
import colors from '../../assets/constant/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import GoogleAPIAutoComplete from '../../components/Maps/GoogleAPIAutoComplete';
import Interests from '../../components/Interests';
import { Dropdown } from 'react-native-material-dropdown';
import moment from "moment";


export default class CreateLost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            isFocus: false,
            dateStart: new Date(),
            dateEnd: new Date(),
            mode: 'date',
            show1: false,
            show2: false,
            newLost:{}
        };
    }

    componentDidMount() {
        console.log(this.state.newLost);
        this.getUser();
    }

    getUser() {
        AsyncStorage.getItem('user', (err, userJSON) => {
            const userObj = JSON.parse(userJSON);
            this.setState({ user: userObj });
            this.setState(prevState => ({
                newLost: {
                    ...prevState.newLost,
                    WhoFound: userObj.UserId,
                    NeighboorhoodName: userObj.NeighborhoodName,
                    Status: false,
                    FoundDate:moment(),
                }
            }));
            console.log(this.state.newLost);
        }
        );

    }

    handleFocus = e => {
        this.setState({ isFocus: true });
    }

    handleBlur = e => {
        this.setState({ isFocus: false });
    }


    setDate = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.dateStart;
        const showVal = Platform.OS === 'ios' ? true : false;

        this.setState(prevState => ({
            newLost: {
                ...prevState.newLost,
                FoundDate: currentDate
            },
            show1: showVal,
            dateStart: currentDate,

        }));
        console.log(this.state.newLost);
    };

    showDatepicker1 = () => {
        this.setState({ show1: true, mode: 'date' });
    };

    fetchCreateLost() {

        console.log("in fetch=", this.state.newLost);

        return fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/Losts/New', {

            method: 'POST',
            body: JSON.stringify(this.state.newLost),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        })
            .then(res => {
                return res.json();
            })
            .then(
                (result) => {
                    if (result == 1) {
                        Alert.alert(" המציאה נשמרה בהצלחה");
                        console.log(result);
                        this.props.navigation.navigate('GeneralLosts');
                    }
                    else
                        Alert.alert(" מצטערים, אנו נסו שנית!");
                    console.log(result);
                },
                (error) => {
                    console.log("err post=", error);
                    Alert.alert("מצטערים, אנו נסו שנית!");
                }
            );
    }



    render() {
        const { navigation } = this.props;
        const blue = colors.turkiz;
        const grey = "grey";
        const newLost = this.state.newLost;
        return (
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: "flex-start", paddingBottom: 20 }}>
                <Header />
                <BackButton goBack={() => navigation.navigate('GeneralLosts')} />
                <ScrollView>
                    <View style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 1, borderRadius: 15, justifyContent: 'center', alignItems: "center", height: '20%' }}>
                        <ImageBackground source={{ uri: newLost.ImageId }} style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}>
                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <OurButton onPress={() => this.props.navigation.navigate('CameraPage')} style={{ paddingHorizontal: 20 }}><MaterialIcons name="camera-alt" size={40} color={colors.turkiz} /></OurButton>
                                <OurButton onPress={() => this.props.navigation.navigate('ImageGallery')} style={{ paddingHorizontal: 20 }}><MaterialIcons name="photo" size={40} color={colors.turkiz} /></OurButton>
                            </View>
                        </ImageBackground>
                    </View>
                    <TextInput
                        style={styles.input}
                        autoFocus={true}
                        placeholder="כותרת"
                        placeholderTextColor={'grey'}
                        selectionColor={blue}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        value={newLost.Title}
                        onChangeText={text => this.setState(prevState => ({
                            newLost: {
                                ...prevState.newLost,
                                Title: text
                            }
                        }))}
                    >
                    </TextInput>

                    <TextInput
                        style={styles.input}
                        placeholder="תיאור"
                        placeholderTextColor={'grey'}
                        selectionColor={blue}
                        multiline={true}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        onChangeText={text => this.setState(prevState => ({
                            newLost: {
                                ...prevState.newLost,
                                Description: text
                            }
                        }))}
                        value={newLost.Description}
                    ></TextInput>

                    <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                            <MaterialIcons
                                name="event"
                                size={22}
                                color={colors.turkiz}>
                            </MaterialIcons>
                            <TouchableOpacity onPress={this.showDatepicker1} >
                                <Text style={{ fontFamily: 'rubik-regular', fontSize: 20, color: colors.turkiz, paddingHorizontal: 5 }}>
                                    תאריך התחלה
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.dateTimeDisplay}>
                        {moment(newLost.FoundDate).format("DD/MM/YYYY")}
                    </Text>

                    {this.state.show1 && (
                        <DateTimePicker
                            value={this.state.dateStart}
                            mode={this.state.mode}
                            is24Hour={true}
                            display="default"
                            onChange={this.setDate}
                        />
                    )}

                    <TextInput
                        style={styles.input}
                        placeholder="היכן נמצא"
                        placeholderTextColor={'grey'}
                        selectionColor={blue}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        onChangeText={text => this.setState(prevState => ({
                            newLost: {
                                ...prevState.newLost,
                                Location: text
                            }
                        }))}
                        value={newLost.Location}
                    ></TextInput>

                </ScrollView>

                <Button
                    title="שמור"
                    buttonStyle={{ borderRadius: 5, marginLeft: 20, marginRight: 20 }}
                    containerStyle={{ marginTop: 1 }}
                    onPress={()=>this.fetchCreateLost()}
                ></Button>
            </View>
        );
    }
};
const styles = StyleSheet.create({
    icon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 20
    },
    input: {
        fontFamily: 'rubik-regular',
        width: '90%',
        height: 44,
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: '#F1F2F2',
        marginVertical: 15,
        marginHorizontal: 15,
        textAlign: 'right',
        backgroundColor: 'white',
        borderRadius: 10,
        fontSize: 18
    },
    imageCard: {
        resizeMode: 'cover'
    },
    title: {
        alignItems: 'center',
        fontSize: 24,
        color: colors.turkiz,
        fontFamily: 'rubik-regular'
    },
    dropDown: {
        alignContent: 'flex-start',
        flexDirection: 'column-reverse',
        paddingLeft: 20,
        paddingRight: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'stretch',
        marginLeft: 0,
        marginRight: 0
    },
    addIcon: {
        marginTop: 15,
    },
    textOr: {
        fontFamily: 'rubik-regular',
        fontSize: 24,
        paddingRight: 10,
        color: 'white',
        paddingBottom: 10

    },
    API: {
        paddingBottom: 10

    },
    dateTimeDisplay: {
        textAlign: 'left',
        fontFamily: 'rubik-regular',
        fontSize: 20,
        paddingHorizontal: 20
    }
});

