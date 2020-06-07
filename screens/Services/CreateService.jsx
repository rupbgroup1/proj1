import React, { Component, useState } from 'react';
import { View, TextInput, Text, StyleSheet, AsyncStorage, ImageBackground, ScrollView, Alert, Dimensions, TouchableOpacity, Platform, Keyboard } from 'react-native';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import { SearchBar, Card, Button, Overlay } from 'react-native-elements';
import OurButton from '../../components/OurButton';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import colors from '../../assets/constant/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-material-dropdown';
import moment from "moment";


export default class CreateEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            edit: true,
            isFocus: false,
            timeStart: new Date(),
            timeEnd: new Date(),
            show1: false,
            show2: false,
            region: {},
            CityName: '',
            selectedCat: '',
            newS: {},
            serviceDetails: {},
            //formated date
            showStart: '',
            showEnd: '',
            setLoc: false
        };
        this.catArray = [];
        this.editMode = false;
        this.serviceDetails = {};


    }

    componentDidMount() {
        this.editMode = this.props.navigation.getParam('edit');
        this.editMode &&
            this.setState({ newS: this.props.navigation.getParam('serviceDetails') });
        this.getUser();
        this.fetchGetAllCategories();
        console.log("new service= ", this.state.newS, this.state.setLoc);
        console.log(this.editMode, this.serviceDetails);

    }
    fetchGetAllCategories() {
        //console.log("in fetch");
        return fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/Category/All', {

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
                        console.log("Cat = ", result);
                        this.catArray = result;
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

    getUser() {
        AsyncStorage.getItem('user', (err, userJSON) => {
            const userObj = JSON.parse(userJSON);
            //console.log("obj==", userObj);
            this.setState(prevState => ({
                user: userObj,
                newS: {
                    ...prevState.newS,
                    Owner: userObj.UserId,
                    NeighborhoodId: userObj.NeighborhoodName,

                }
            }));

        }
        );

    }
    fetchGetAllCategories() {
        //console.log("in fetch");
        return fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/Category/All', {

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
                        console.log("Cat = ", result);
                        this.catArray = result;
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
    handleFocus = e => {
        this.setState({ isFocus: true });
    }
    handleBlur = e => {
        this.setState({ isFocus: false });
    }

    setTime = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.timeStart;
        const showVal = Platform.OS === 'ios' ? true : false;

        this.setState(prevState => ({
            newS: {
                ...prevState.newS,
                OpenHoursStart: moment(currentDate).format('hh:mm')
            },
            show1: showVal,
            timeStart: currentDate
        }));
    };

    setEndTime = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.timeEnd;
        const showVal = Platform.OS === 'ios' ? true : false;

        this.setState(prevState => ({
            newS: {
                ...prevState.newS,
                OpenHoursEnds: moment(currentDate).format('hh:mm')
            },
            show2: showVal,
            timeEnd: currentDate
        }));
    };



    showTimepicker1 = () => {
        this.setState({ show1: true, mode: 'time' });
    };

    showTimepicker2 = () => {
        this.setState({ show2: true, mode: 'time' });
    };

    fetchCreateService() {

        console.log("in new S=", this.state.newS);
        return fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/Services/New', {

            method: 'POST',
            body: JSON.stringify(this.state.newS),
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
                        Alert.alert("נשמר בהצלחה");
                        console.log(result);
                        this.props.navigation.navigate('GeneralServices');
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

    fetchUpdateService() {
        console.log("in update!!");
        const s = this.state.newS;
        const locationCoords = this.state.setLoc ? this.props.navigation.getParam('region') : "";
        let serviceToUpdate = {
            ServiceId: s.ServiceId,
            ServiceName: s.ServiceName,
            Description: s.Description,
            Owner: s.Owner,
            OpenDays: s.OpenDays,
            OpenHoursStart: s.OpenHoursStart,
            OpenHoursEnds: s.OpenHoursEnds,
            Categories: s.Categories,
            NeighborhoodId: s.NeighborhoodId,
            ServiceAddress: this.props.navigation.getParam('Location'),
            Lat: locationCoords.latitude,
            Lan: locationCoords.longitude,
        }
        console.log("s t o ", serviceToUpdate);

        return fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/Services/Update', {

            method: 'PUT',
            body: JSON.stringify(serviceToUpdate),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                return res.json();
            })
            .then(
                (result) => {
                    if (result === 1) {
                        Alert.alert("נשמר בהצלחה");
                        //console.log(result);
                        this.props.navigation.navigate('MyServices');
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
        const newS = this.state.newS;
        const serviceDetails = this.state.serviceDetails;
        console.log("service", newS)
        return (
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: "flex-start" }}>
                <Header />
                <BackButton goBack={() => navigation.navigate('GeneralServices')} />
                <ScrollView>
                <View style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 1, borderRadius: 15, justifyContent: 'center', alignItems: "center" }}>
                           <ImageBackground source={{uri:newS.ImageGallery}} style={{flex: 1,resizeMode: "cover",justifyContent: "center"}}>
                           <Text style={styles.textOr}>הוספת תמונה  </Text>
                            <OurButton onPress={() => this.props.navigation.navigate('CameraPage')}><SimpleLineIcons name="camera" size={30} color="black" /></OurButton>
                            <OurButton onPress={() => this.props.navigation.navigate('ImageGallery')}><SimpleLineIcons name="picture" size={30} color="black" /></OurButton>
                            </ImageBackground>
                        </View>
                    <TextInput
                        style={styles.input}
                        autoFocus={true}
                        placeholder="שם העסק"
                        placeholderTextColor={colors.turkiz}
                        selectionColor={blue}
                        underlineColorAndroid={this.state.isFocus ? blue : grey}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        value={newS.ServiceName}
                        onChangeText={text => this.setState(prevState => ({
                            newS: {
                                ...prevState.newS,
                                ServiceName: text
                            }
                        }))}
                    ></TextInput>


                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="תיאור"
                            placeholderTextColor={colors.turkiz}
                            selectionColor={blue}
                            underlineColorAndroid={this.state.isFocus ? blue : grey}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            onChangeText={text => this.setState(prevState => ({
                                newS: {
                                    ...prevState.newS,
                                    Description: text
                                }
                            }))}
                            value={newS.Description}
                        ></TextInput>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="פתוח בימי:"
                        placeholderTextColor={colors.turkiz}
                        selectionColor={blue}
                        underlineColorAndroid={this.state.isFocus ? blue : grey}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        onChangeText={text => this.setState(prevState => ({
                            newS: {
                                ...prevState.newS,
                                OpenDays: text
                            }
                        }))}
                        value={newS.OpenDays != null && newS.OpenDays + ""}
                    >    
                    </TextInput>
                    <View style={{ flexDirection: "row", alignContent: "space-between" }}>
                        <MaterialIcons name="access-time" size={22} color={colors.turkiz}></MaterialIcons>
                        <TouchableOpacity onPress={this.showTimepicker1}>
                            <Text
                                style={{ textAlign: "right", fontFamily: 'rubik-regular', fontSize: 20 }}>
                                שעת התחלה
                               </Text>
                            <Text style={{ textAlign: "center", fontFamily: 'rubik-regular', fontSize: 20 }}> {newS.OpenHoursStart}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: "row", alignContent: "space-around" }}>
                        <MaterialIcons name="access-time" size={22} color={colors.turkiz}></MaterialIcons>

                        <TouchableOpacity onPress={this.showTimepicker2}>
                            <Text
                                style={{ textAlign: "right", fontFamily: 'rubik-regular', fontSize: 20 }}>
                                שעת סיום
                            </Text>
                            <Text style={{ textAlign: "center", fontFamily: 'rubik-regular', fontSize: 20 }}> {newS.OpenHoursEnds}</Text>
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity onPress={() => {
                        this.setState({ setLoc: true }, () => navigation.navigate('EventLocation', { type: "s" }));
                    }}>
                        <Text style={{ fontFamily: 'rubik-regular', fontSize: 22, color: colors.turkiz, textAlign: 'left' }}> מיקום העסק </Text>
                    </TouchableOpacity>

                    <View style={styles.dropDown}>
                        <Dropdown
                            key={1}
                            label='בחר קטגוריה'
                            value={newS.CategoryId}
                            valueExtractor={({ CategoryId }) => CategoryId}
                            labelExtractor={({ CategoryName }) => CategoryName}
                            data={this.catArray}
                            selectedItemColor={colors.turkiz}
                            onChangeText={(value) => this.setState(prevState => ({
                                newS: {
                                    ...prevState.newS,
                                    Categories: value
                                }
                            }))
                            }

                        />
                    </View>

                    {this.state.show1 && (
                        <DateTimePicker
                            value={this.state.timeStart}
                            mode={this.state.mode}
                            is24Hour={true}
                            display="default"
                            onChange={this.setTime}
                        />
                    )}
                    {this.state.show2 && (
                        <DateTimePicker
                            value={this.state.timeEnd}
                            mode={this.state.mode}
                            is24Hour={true}
                            display="default"
                            onChange={this.setEndTime}
                        />
                    )}
                </ScrollView>
                <Button
                    title={this.editMode ? "עדכן" : "צור עסק חדש"}
                    buttonStyle={{ borderRadius: 5, marginLeft: 20, marginRight: 20 }}
                    containerStyle={{ marginTop: 1 }}
                    onPress={() => this.editMode ? this.fetchUpdateService() : this.fetchCreateService()}
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
        padding: 5,
        marginBottom: 10,
        textAlign: 'right',
        fontSize: 22,
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
        fontSize: 24

    },
    API: {
        paddingBottom: 10

    },
});

