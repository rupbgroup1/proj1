import React, { Component, useState } from 'react';
import { View, TextInput, Text, StyleSheet, AsyncStorage, ImageBackground, ScrollView, Alert, Dimensions, TouchableOpacity, Platform, Keyboard, KeyboardAvoidingView } from 'react-native';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import { SearchBar, Card, Button, Overlay } from 'react-native-elements';
import OurButton from '../../components/OurButton';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../../assets/constant/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
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
            newLost: {
                Title: '',
                Description: ''
            },
            picUri: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Lost_main_title.svg/1200px-Lost_main_title.svg.png",
            picName: 'losts_' + new Date().getTime() + '.jpg'
        };
        this.uplodedPicPath = 'http://proj.ruppin.ac.il/bgroup29/prod/uploadFiles/';
    }

    componentDidMount() {
        console.log(this.state.newLost);
        this.getUser();
        const { navigation } = this.props;
        this._unsubscribe = navigation.addListener('didFocus', () => {
            AsyncStorage.getItem('cameraDetails', (err, cameraDetailsJSON) => {

                if (cameraDetailsJSON !== null) {
                    const cameraDetailsObj = JSON.parse(cameraDetailsJSON);
                    this.setState({ picUri: cameraDetailsObj.picUri, picName: 'losts_' + new Date().getTime() + '.jpg' });
                    console.log("cameraDetailsObj:" + cameraDetailsObj.picUri);

                }
            });

        });
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
                    FoundDate: moment(),
                }
            }));
            console.log(this.state.newLost);
        }
        );

    }
    validateInputes() {
        this.state.newLost.Title === '' ? Alert.alert("אנא מלא/י כותרת") : (
            this.state.newLost.Description === '' ? Alert.alert("אנא מלא/י תיאור") : (
                this.btnUpload())
        )


    }
    btnUpload = () => {
        console.log("btnupload");
        console.log(this.state.picUri);
        console.log(this.state.picName);
        let img = this.state.picUri;
        let imgName = this.state.picName;
        this.imageUpload(img, imgName);
    }

    imageUpload = (imgUri, picName) => {
        let urlAPI = "http://proj.ruppin.ac.il/bgroup29/prod/uploadpicture";
        let dataI = new FormData();
        dataI.append('picture', {
            uri: imgUri,
            name: picName,
            type: 'image/jpg'
        });
        const config = {
            method: 'POST',
            body: dataI,
        };


        fetch(urlAPI, config)
            .then((res) => {
                console.log('res.status=', res.status);
                if (res.status == 201) {
                    return res.json();
                }
                else {
                    console.log('error uploding ...1');
                    return "err";
                }
            })
            .then((responseData) => {
                console.log(responseData);
                if (responseData != "err") {
                    let picNameWOExt = picName.substring(0, picName.indexOf("."));
                    let imageNameWithGUID = responseData.substring(responseData.indexOf(picNameWOExt), responseData.indexOf(".jpg") + 4);
                    this.setState(prevState => ({
                        newLost: {
                            ...prevState.newLost,
                            ImageId: this.uplodedPicPath + imageNameWithGUID
                        }

                    }))
                    console.log("Image" + this.state.newLost.Image)


                    this.fetchCreateLost();
                    AsyncStorage.removeItem('cameraDetails');
                    //{this.editMode ? this.fetchUpdateEvent() : this.fetchCreatEvent()}
                    //this.fetchCreatEvent();




                    //console.log(this.state.uplodedPicUri);

                }
                else {
                    console.log('error uploding ...2');
                    alert('error uploding ...2');
                }
            })
            .catch(err => {
                alert('err upload= ' + err);
            });
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
            <View style={styles.container}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={'height'}
                >
                    <Header navigation={navigation} />
                    <BackButton goBack={() => navigation.navigate('GeneralLosts')} />
                    <ScrollView>

                        <View style={styles.scrollView}>
                            {this.state.picUri === "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Lost_main_title.svg/1200px-Lost_main_title.svg.png" ? null : <ImageBackground source={{ uri: this.state.picUri }} style={{ flex: 1, resizeMode: "cover", justifyContent: "center", height: '100%', width: '100%' }}>

                            </ImageBackground>}
                        </View>
                        <View style={styles.imageIcons}>
                            <OurButton onPress={() => this.props.navigation.navigate('CameraPage')} style={{ paddingHorizontal: 20 }}><MaterialIcons name="camera-alt" size={40} color={colors.Losts} /></OurButton>
                            <OurButton onPress={() => this.props.navigation.navigate('ImageGallery')} style={{ paddingHorizontal: 20 }}><MaterialIcons name="photo" size={40} color={colors.Losts} /></OurButton>
                        </View>
                        <View style={styles.position}>
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
                        </View>

                        <View style={styles.position}>
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
                        </View>

                        <View style={styles.position}>
                            <View style={styles.dateTimeView}>
                                <View style={styles.dateTimeTitle}>
                                    <MaterialIcons
                                        name="event"
                                        size={22}
                                        color={colors.Losts}>
                                    </MaterialIcons>
                                    <TouchableOpacity onPress={this.showDatepicker1} >
                                        <Text style={styles.dateTimeText}>
                                            תאריך 
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
                        </View>

                        <View style={styles.position}>

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

                        </View>

                    </ScrollView>

                </KeyboardAvoidingView>
                <View style={styles.position}>
                    <Button
                        title="שמור"
                        buttonStyle={styles.createButton}
                        containerStyle={{ marginTop: 1 }}
                        onPress={() => this.validateInputes()}
                    ></Button>
                </View>
            </View>
        );
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: "flex-start",
        paddingBottom: 20
    },
    imageIcons: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 5
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
    dateTimeDisplay: {
        textAlign: 'left',
        fontFamily: 'rubik-regular',
        fontSize: 20,
        paddingHorizontal: 20
    },
    createButton: {
        borderRadius: 30,
        marginBottom: 0,
        width: '60%',
        alignSelf: 'center',
        backgroundColor: colors.Losts,
        elevation: 4
    },
    scrollView: {
        flexDirection: 'row',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: "center"
    },
    dateTimeView: {
        flexDirection: 'row',
        paddingVertical: 10
    },
    dateTimeText: {
        fontFamily: 'rubik-regular',
        fontSize: 20,
        color: colors.Losts,
        paddingHorizontal: 5
    },
    dateTimeTitle: {
        flexDirection: 'row',
        paddingLeft: 10
    },
    LostLoc: {
        fontFamily: 'rubik-regular',
        fontSize: 22,
        color: colors.Losts,
        textAlign: 'left',
        padding: 10
    },
    position: {
        paddingBottom: 20
    }
});