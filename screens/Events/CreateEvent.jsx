import React, { Component, useState } from 'react';
import { View, TextInput, Text, StyleSheet, AsyncStorage, Image, ScrollView, Alert, Dimensions, TouchableOpacity, Platform, Keyboard } from 'react-native';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import { SearchBar, Card, Button, Overlay } from 'react-native-elements';
import OurButton from '../../components/OurButton';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import colors from '../../assets/constant/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import GoogleAPIAutoComplete from '../../components/Maps/GoogleAPIAutoComplete';
import Interests from '../../components/Interests';
import { Dropdown } from 'react-native-material-dropdown';
import moment from "moment";


export default class CreateEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            edit: true,
            isFocus: false,
            dateStart: new Date(),
            dateEnd: new Date(),
            timeStart: new Date(),
            timeEnd: new Date(),
            mode: 'date',
            show1: false,
            show2: false,
            IntrestsArray: [],
            subInArray: [],
            mainI: '',
            choosenInterests: [],
            region: {},
            CityName: '',
            selectedCat: '',
            newEvent: {},
            eventDetails: {},
            //formated date
            showStart: '',
            showEnd: '',
            setLoc: false
        };
        this.catArray = [];
        this.editMode = false;
        this.eventDetails = {};


    }

    componentDidMount() {
        this.editMode = this.props.navigation.getParam('edit');
        this.editMode &&
            this.setState({ newEvent: this.props.navigation.getParam('eventDetails') });
        this.getUser();
        this.fetchGetAllCategories();
        this.fetchGetAllIntrests();
        console.log("new event= ", this.state.newEvent, this.state.setLoc);

        console.log(this.editMode, this.eventDetails);

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
                newEvent: {
                    ...prevState.newEvent,
                    OpenedBy: userObj.UserId,
                    NeiCode: userObj.NeighborhoodName,
                    Admin: userObj,
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


    setDate = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.dateStart;
        const showVal = Platform.OS === 'ios' ? true : false;

        this.setState(prevState => ({
            newEvent: {
                ...prevState.newEvent,
                StartDate: currentDate
            },
            show1: showVal,
            dateStart: currentDate,

        }));
    };

    setEndDate = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.dateEnd;
        const showVal = Platform.OS === 'ios' ? true : false;

        this.setState(prevState => ({
            newEvent: {
                ...prevState.newEvent,
                EndDate: currentDate
            },
            show2: showVal,
            dateEnd: currentDate,
        }));
    };

    setTime = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.timeStart;
        const showVal = Platform.OS === 'ios' ? true : false;

        this.setState(prevState => ({
            newEvent: {
                ...prevState.newEvent,
                StartHour: currentDate

            },
            show1: showVal,
            timeStart: currentDate
        }));
    };

    setEndTime = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.timeEnd;
        const showVal = Platform.OS === 'ios' ? true : false;

        this.setState(prevState => ({
            newEvent: {
                ...prevState.newEvent,
                EndHour: currentDate
            },
            show2: showVal,
            timeEnd: currentDate
        }));
    };


    showDatepicker1 = () => {
        this.setState({ show1: true, mode: 'date' });
    };

    showTimepicker1 = () => {
        this.setState({ show1: true, mode: 'time' });
    };
    showDatepicker2 = () => {
        this.setState({ show2: true, mode: 'date' });
    };

    showTimepicker2 = () => {
        this.setState({ show2: true, mode: 'time' });
    };

    fetchCreatEvent() {

        console.log("in fetch=", this.state.newEvent);

        console.log("in new event=", this.state.newEvent);
        return fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/Events/New', {

            method: 'POST',
            body: JSON.stringify(this.state.newEvent),
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
                        Alert.alert(" האירוע נשמר בהצלחה");
                        console.log(result);
                        this.props.navigation.navigate('GeneralEvents');
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

    fetchUpdateEvent() {
        console.log("in update!!");
        const e = this.state.newEvent;
        const locationCoords = this.state.setLoc ? this.props.navigation.getParam('region') : "";
        let eventToUpdate = {
            CategoryId: e.CategoryId,
            Desc: e.Desc,
            EndDate: moment(e.EndDate).format('YYYY-MM-DDThh:mm:ss'),
            EndHour: moment(e.EndHour).format('YYYY-MM-DDThh:mm:ss'),
            StartDate: moment(e.StartDate).format('YYYY-MM-DDThh:mm:ss'),
            StartHour: moment(e.StartHour).format('YYYY-MM-DDThh:mm:ss'),
            FromAge: e.FromAge,
            Id: e.Id,
            Image: e.Image,
            Name: e.Name,
            NeiCode: e.NeiCode,
            NumOfParticipants: e.NumOfParticipants,
            OpenedBy: e.OpenedBy,
            Price: e.Price,
            ToAge: e.ToAge,
            Location: this.props.navigation.getParam('Location'),
            Lat: locationCoords.latitude,
            Lan: locationCoords.longitude,
        }
        console.log("e t o ", eventToUpdate);

        return fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/Events/Update', {

            method: 'PUT',
            body: JSON.stringify(eventToUpdate),
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
                        Alert.alert(" האירוע נשמר בהצלחה");
                        //console.log(result);
                        this.props.navigation.navigate('MyEvents');
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

    handleMainChange(mainI) {
        this.setState({ mainI: mainI }, () => {
            this.fetchSubInterest();
        });

    }
    //fetch -get all intrests to search by
    fetchGetAllIntrests() {
        return fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/Intrests', {

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
                    this.setState({ IntrestsArray: result })
                },
                (error) => {
                    console.log("err post=", error);
                    Alert.alert("מצטערים, אנו נסו שנית!");
                }
            );
    }

    fetchSubInterest = () => {
        //console.log(this.state.mainI);
        // console.log(this.state.searchName+this.state.user.CityName);
        return fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/Intrests/Sub?mainI=' + this.state.mainI, {
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
                    //console.log("fetch result= ", result[0]);
                    this.setState({ subInArray: result });

                },
                (error) => {
                    console.log("err post=", error);
                });

    }



    render() {
        const { navigation } = this.props;
        const blue = colors.turkiz;
        const grey = "grey";
        const newEvent = this.state.newEvent;
        const eventDetails = this.state.eventDetails;
        console.log("event", newEvent)
        //console.log(this.state.CityName);
        return (
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: "flex-start" }}>
                <Header />
                <BackButton goBack={() => navigation.navigate('GeneralEvents')} />
                <ScrollView>
                    
                    <Card containerStyle={{ backgroundColor: 'grey', height: '20%', width: Dimensions.get('window').width, justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 1, borderRadius: 15, justifyContent: 'center', alignItems: "center" }}>
                            <Text style={styles.textOr}>הוספת תמונה  </Text>
                            <OurButton onPress={() => this.props.navigation.navigate('CameraPage')}><SimpleLineIcons name="camera" size={30} color="black" /></OurButton>
                            <OurButton onPress={() => this.props.navigation.navigate('ImageGallery')}><SimpleLineIcons name="picture" size={30} color="black" /></OurButton>
                        </View>
                    </Card>
                    <TextInput
                        style={styles.input}
                        autoFocus={true}
                        placeholder="כותרת האירוע"
                        placeholderTextColor={colors.turkiz}
                        selectionColor={blue}
                        underlineColorAndroid={this.state.isFocus ? blue : grey}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        value={newEvent.Name}
                        onChangeText={text => this.setState(prevState => ({
                            newEvent: {
                                ...prevState.newEvent,
                                Name: text
                            }
                        }))}
                    ></TextInput>
                    <View style={{ flexDirection: "row", alignContent: "space-between" }}>
                        <MaterialIcons name="access-time" size={22} color={colors.turkiz}></MaterialIcons>
                        <TouchableOpacity onPress={this.showDatepicker1}>
                            <Text style={{ textAlign: "right", fontFamily: 'rubik-regular', fontSize: 20 }}>
                                תאריך התחלה:
                                  </Text>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.showTimepicker1}>
                            <Text
                                style={{ textAlign: "right", fontFamily: 'rubik-regular', fontSize: 20 }}>
                                שעת התחלה
                               </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ textAlign: "center", fontFamily: 'rubik-regular', fontSize: 20 }}>{moment(newEvent.StartDate).format("DD/MM/YYYY")}, {moment(newEvent.StartHour).format("HH:mm")}</Text>
                    <View style={{ flexDirection: "row", alignContent: "space-around" }}>
                        <MaterialIcons name="access-time" size={22} color={colors.turkiz}></MaterialIcons>
                        <TouchableOpacity onPress={this.showDatepicker2}>
                            <Text style={{ textAlign: "right", fontFamily: 'rubik-regular', fontSize: 20 }}>
                                תאריך סיום
                                  </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.showTimepicker2}>
                            <Text
                                style={{ textAlign: "right", fontFamily: 'rubik-regular', fontSize: 20 }}>
                                שעת סיום
                               </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ textAlign: "center", fontFamily: 'rubik-regular', fontSize: 20 }}>{moment(newEvent.EndDate).format("DD/MM/YYYY")}, {moment(newEvent.EndHour).format("HH:mm")}</Text>
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
                                newEvent: {
                                    ...prevState.newEvent,
                                    Desc: text
                                }
                            }))}
                            value={newEvent.Desc}
                        ></TextInput>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="מספר משתתפים"
                        placeholderTextColor={colors.turkiz}
                        selectionColor={blue}
                        underlineColorAndroid={this.state.isFocus ? blue : grey}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        keyboardType={'number-pad'}
                        onChangeText={text => this.setState(prevState => ({
                            newEvent: {
                                ...prevState.newEvent,
                                NumOfParticipants: text
                            }
                        }))}
                        value={newEvent.NumOfParticipants != null && newEvent.NumOfParticipants + ""}
                    ></TextInput>
                    <TextInput
                        style={styles.input}
                        placeholder="גיל מינימלי" placeholderTextColor={colors.turkiz}
                        selectionColor={blue}
                        underlineColorAndroid={this.state.isFocus ? blue : grey}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        keyboardType={'number-pad'}
                        onChangeText={text => this.setState(prevState => ({
                            newEvent: {
                                ...prevState.newEvent,
                                FromAge: text
                            }
                        }))}
                        value={newEvent.FromAge != null && newEvent.FromAge + ""}
                    ></TextInput>
                    <TextInput
                        style={styles.input}
                        placeholder="גיל מקסימלי"
                        placeholderTextColor={colors.turkiz}
                        selectionColor={blue}
                        underlineColorAndroid={this.state.isFocus ? blue : grey}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        keyboardType={'number-pad'}
                        onChangeText={text => this.setState(prevState => ({
                            newEvent: {
                                ...prevState.newEvent,
                                ToAge: text
                            }
                        }))}
                        value={newEvent.ToAge != null && newEvent.ToAge + ""}
                    ></TextInput>
                    <TextInput
                        style={styles.input}
                        placeholder="מחיר"
                        placeholderTextColor={colors.turkiz}
                        selectionColor={blue}
                        underlineColorAndroid={this.state.isFocus ? blue : grey}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        keyboardType={'number-pad'}
                        onChangeText={text => this.setState(prevState => ({
                            newEvent: {
                                ...prevState.newEvent,
                                Price: text
                            }
                        }))}
                        value={newEvent.Price != null && newEvent.Price + ""}
                    ></TextInput>
                    <TouchableOpacity onPress={() => {
                        this.setState({ setLoc: true }, () => navigation.navigate('EventLocation',{type:"e"}));
                    }}>
                        <Text style={{ fontFamily: 'rubik-regular', fontSize: 22, color: colors.turkiz, textAlign: 'left' }}> מיקום האירוע </Text>
                    </TouchableOpacity>
                    {!this.editMode &&
                        <Text style={{ fontFamily: 'rubik-regular', fontSize: 22, color: colors.turkiz, textAlign: 'left' }}>יעניין שכנים עם תחומי העניין הבאים </Text>}
                    <View style={{ paddingBottom: 200 }}>
                        {!this.editMode &&
                            <Interests
                                IntrestsArray={this.state.IntrestsArray}
                                handleMainChange={(mainI) => this.handleMainChange(mainI)}
                                subInArray={this.state.subInArray}
                                callFetch={(iArray) => this.setState(prevState => ({
                                    newEvent: {
                                        ...prevState.newEvent,
                                        Intrests: iArray
                                    }
                                }))}
                                isMulti={true}
                                initialInterest={this.state.initialInterest ? this.state.initialInterest : []}
                            />}
                        <View style={styles.dropDown}>
                            <Dropdown
                                key={1}
                                label='בחר קטגוריה'
                                value={newEvent.CategoryId}
                                valueExtractor={({ CategoryId }) => CategoryId}
                                labelExtractor={({ CategoryName }) => CategoryName}
                                data={this.catArray}
                                selectedItemColor={colors.turkiz}
                                onChangeText={(value) => this.setState(prevState => ({
                                    newEvent: {
                                        ...prevState.newEvent,
                                        CategoryId: value
                                    }
                                }))
                                }

                            />
                        </View>
                    </View>
                    {this.state.show1 && (
                        <DateTimePicker
                            value={this.state.dateStart}
                            mode={this.state.mode}
                            is24Hour={true}
                            display="default"
                            onChange={this.state.mode == 'date' ? this.setDate : this.setTime}
                        />
                    )}
                    {this.state.show2 && (
                        <DateTimePicker
                            value={this.state.dateEnd}
                            mode={this.state.mode}
                            is24Hour={true}
                            display="default"
                            onChange={this.state.mode === 'date' ? this.setEndDate : this.setEndTime}
                        />
                    )}
                </ScrollView>
                <Button
                    title={this.editMode ? "עדכן" : "צור אירוע"}
                    buttonStyle={{ borderRadius: 5, marginLeft: 20, marginRight: 20 }}
                    containerStyle={{ marginTop: 1 }}
                    onPress={() => this.editMode ? this.fetchUpdateEvent() : this.fetchCreatEvent()}
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

