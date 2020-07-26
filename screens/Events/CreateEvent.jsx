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
            newEvent: {
                Name:'',
                Desc:'',
            },
            eventDetails: {},
            //formated date
            showStart: '',
            showEnd: '',
            setLoc: false,
            picUri:'https://www.ladn.eu/wp-content/uploads/2017/04/my-event.png',
            picName: 'event_' + new Date().getTime() + '.jpg',
            change: false,
            editMode: false
        };
        this.catArray = [];
        this.editMode = false;
        this.eventDetails = {};
        this.uplodedPicPath = 'http://proj.ruppin.ac.il/bgroup29/prod/uploadFiles/';


    }

    componentDidMount() {
        console.log("Nav====", this.props.navigation.getParam('edit'), this.props.navigation.getParam('eventDetails'));
        this.editMode = this.props.navigation.getParam('edit');
        this.editMode &&
            this.setState({ newEvent: this.props.navigation.getParam('eventDetails'), picUri: this.props.navigation.getParam('eventDetails').Image, change:true , editMode: true});
        this.getUser();
        this.fetchGetAllCategories();
        this.fetchGetAllIntrests();
        console.log("new event= ", this.state.newEvent, this.state.setLoc);
        const { navigation } = this.props;
        this._unsubscribe = navigation.addListener('didFocus', () => {
            AsyncStorage.getItem('cameraDetails', (err, cameraDetailsJSON) => {
      
              if (cameraDetailsJSON !== null) {
                const cameraDetailsObj = JSON.parse(cameraDetailsJSON);
                this.setState({ picUri: cameraDetailsObj.picUri, picName: 'event_' + new Date().getTime() + '.jpg' });
                console.log("cameraDetailsObj:" + cameraDetailsObj.picUri);
                
              }
            });
      
            console.log("chande" + this.state.change);
            console.log(this.state.editMode);
          });

        //console.log(this.editMode, this.eventDetails);

    }

    updateImage() {
        if (this.state.change && this.editMode) {
            this.btnUpload()
        }
        else {

            this.fetchUpdateEvent()

        }

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
                        //console.log("Cat = ", result);
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
                    //delete:
                    //Image: '../assets/createEvent.jpg'
                   // Image: 'https://www.ladn.eu/wp-content/uploads/2017/04/my-event.png'
                  // picUri: use
                }
            }));

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

    validateInputes() {
        this.state.newEvent.Name === '' ? Alert.alert("אנא מלא/י כותרת") : (
            this.state.newEvent.Desc === '' ? Alert.alert("אנא מלא/י תיאור") : (
                !this.state.newEvent.StartDate ? Alert.alert("אנא מלא/י תאריך התחלה") : (
                    !this.state.newEvent.EndDate ? Alert.alert("אנא מלא/י תאריך סיום") : (
                        !this.state.newEvent.StartHour ? Alert.alert("אנא מלא/י שעת התחלה") : (
                            !this.state.newEvent.EndHour ? Alert.alert("אנא מלא/י שעת סיום") : (
                                !this.props.navigation.getParam('Location') ? Alert.alert("אנא מלא/י מיקום") : this.updateLocation()
                            )
                        )
                    )
                )
            )
        )
    }

    updateLocation() {
        const LocationString = this.props.navigation.getParam('Location');
        const locationCoords = this.props.navigation.getParam('region');
        console.log("update loc - ", LocationString, "r= ", locationCoords.latitude);
        const Lat = locationCoords.latitude;
        const Lan = locationCoords.longitude;
        this.setState(prevState => ({
            newEvent: {
                ...prevState.newEvent,
                Location: LocationString,
                Lat: Lat,
                Lan: Lan
            },
        }), () => this.btnUpload()
        );
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
                  newEvent: {
                      ...prevState.newEvent,
                      Image: this.uplodedPicPath + imageNameWithGUID
                  }
              }))
              console.log("Image" + this.state.newEvent.Image)


              AsyncStorage.removeItem('cameraDetails');
              {this.editMode ? this.fetchUpdateEvent() : this.fetchCreatEvent()}
              //this.fetchCreatEvent();
                console.log(this.state.newEvent.Image);

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

    fetchCreatEvent() {
         console.log("in new event fetch =", this.state.newEvent);
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
                        //console.log(result);
                        AsyncStorage.removeItem('cameraDetails');
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
        const blue = colors.Events;
        const newEvent = this.state.newEvent;

        return (
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: "flex-start", paddingBottom: 20 }}>
                <Header navigation={navigation}/>
                <BackButton goBack={() => navigation.navigate('GeneralEvents')} />
                
                <ScrollView>
                    
                    
                        <View style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 1, borderRadius: 15, justifyContent: 'center', alignItems: "center", }}>
                          {this.state.picUri === "https://www.ladn.eu/wp-content/uploads/2017/04/my-event.png" ? null :  <ImageBackground source={{uri:this.state.picUri}} style={{flex: 1,resizeMode: "cover",justifyContent: "center", height:300, width:'100%'}}></ImageBackground>  }
                          
                            
                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop:5}}>
                                <OurButton onPress={() => this.props.navigation.navigate('CameraPage')} style={{ paddingHorizontal: 20 }}><MaterialIcons name="camera-alt" size={40} color={colors.turkiz}/></OurButton>
                                <OurButton onPress={() => this.props.navigation.navigate('ImageGallery')} style={{ paddingHorizontal: 20 }}><MaterialIcons name="photo" size={40} color={colors.turkiz}/></OurButton>
                            </View>
                    <TextInput
                        style={styles.input}
                        autoFocus={true}
                        placeholder="כותרת האירוע"
                        placeholderTextColor={'grey'}
                        selectionColor={blue}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        value={newEvent.Name}
                        onChangeText={text => this.setState(prevState => ({
                            newEvent: {
                                ...prevState.newEvent,
                                Name: text
                            }
                        }))}
                    >
                    </TextInput>
                    <View style={styles.dateTimeView}>
                        <View style={styles.dateTimeTitle}>
                            <MaterialIcons
                                name="event"
                                size={22}
                                color={colors.Events}>
                            </MaterialIcons>
                            <TouchableOpacity onPress={this.showDatepicker1} >
                                <Text style={styles.dateTimeText}>
                                    תאריך התחלה
                            </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
                            <MaterialIcons
                                name="access-time"
                                size={22}
                                color={colors.Events}>
                            </MaterialIcons>
                            <TouchableOpacity onPress={this.showTimepicker1}>
                                <Text style={styles.dateTimeText}>
                                    שעת התחלה
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.dateTimeDisplay}>
                        {moment(newEvent.StartHour).format("HH:mm")}         {moment(newEvent.StartDate).format("DD/MM/YYYY")}
                    </Text>
                    <View style={styles.dateTimeView}>
                        <View style={styles.dateTimeTitle}>
                            <MaterialIcons
                                name="event"
                                size={22}
                                color={colors.Events}>
                            </MaterialIcons>
                            <TouchableOpacity onPress={this.showDatepicker2}>
                                <Text style={styles.dateTimeText}>
                                    תאריך סיום
                            </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', paddingLeft: 45 }}>
                            <MaterialIcons
                                name="access-time"
                                size={22}
                                color={colors.Events}>
                            </MaterialIcons>
                            <TouchableOpacity onPress={this.showTimepicker2}>
                                <Text style={styles.dateTimeText}>
                                    שעת סיום
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.dateTimeDisplay}>
                        {moment(newEvent.EndHour).format("HH:mm")}         {moment(newEvent.EndDate).format("DD/MM/YYYY")}
                    </Text>
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
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="תיאור"
                            placeholderTextColor={'grey'}
                            selectionColor={blue}
                            multiline={true}
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
                        placeholderTextColor={'grey'}
                        selectionColor={blue}
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
                        placeholder="גיל מינימלי"
                        placeholderTextColor={'grey'}
                        selectionColor={blue}
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
                        placeholderTextColor={'grey'}
                        selectionColor={blue}
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
                        placeholderTextColor={'grey'}
                        selectionColor={blue}
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
                        this.setState({ setLoc: true }, () => navigation.navigate('EventLocation', { type: "e" }));
                    }}>
                        <Text style={styles.eventLoc}> לחץ/י להזנת מיקום האירוע </Text>
                    </TouchableOpacity>
                    {!this.editMode &&
                        <Text style={styles.interstsAndCategory}>תחומי עניין </Text>}
                    <Text style={styles.interstsDetails}>בחירת תחומי העניין תסייע להתאמת האירוע לחברי הקהילה </Text>
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
                                selectedItemColor={colors.Events}
                                onChangeText={(value) => this.setState(prevState => ({
                                    newEvent: {
                                        ...prevState.newEvent,
                                        CategoryId: value
                                    }
                                }))
                                }

                            />
                            <Text style={styles.interstsAndCategory}>קטגוריית האירוע</Text>

                        </View>
                    </View>

                </ScrollView>
                <Button
                    title={this.editMode ? "עדכן" : "צור אירוע"}
                    buttonStyle={styles.createButton}
                    containerStyle={{ marginTop: 1 }}
                   onPress={() => this.editMode ? this.updateImage() : this.validateInputes()}
                   // onPress={()=> this.btnUpload()}
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
        color: colors.Events,
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
    },
    createButton: {
        borderRadius: 30,
        marginBottom: 0,
        width: '60%',
        alignSelf: 'center',
        backgroundColor: colors.Events,
        elevation: 4
    },
    scrollView: {
        flexDirection: 'row',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: "center",
        height: '20%'
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    imageIconsView: { 
        flexDirection: 'row', 
        alignSelf: 'center' 
    },
    dateTimeView: { 
        flexDirection: 'row', 
        paddingVertical: 10 
    },
    dateTimeText: { 
        fontFamily: 'rubik-regular', 
        fontSize: 20, 
        color: colors.Events, 
        paddingHorizontal: 5 
    },
    dateTimeTitle: { 
        flexDirection: 'row', 
        paddingLeft: 10 
    },
    eventLoc: { 
        fontFamily: 'rubik-regular', 
        fontSize: 22, 
        color: colors.Events, 
        textAlign: 'left', 
        paddingLeft: 10 
    },
    interstsAndCategory: { 
        fontFamily: 'rubik-regular', 
        fontSize: 22, color: 'grey', 
        textAlign: 'center', 
        paddingTop: 30, 
        paddingBottom: 5 
    },
    interstsDetails: { 
        fontFamily: 'rubik-regular', 
        fontSize: 15, 
        color: 'grey', 
        textAlign: 'center', 
        paddingBottom: 20 
    }
});

