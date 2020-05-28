import React, { Component } from 'react';
import { createButtomTabNavigator, createAppContainer } from 'react-navigation';
import { View, Text, StyleSheet, AsyncStorage, Image, ScrollView, Alert, Dimensions, TouchableOpacity, TouchableHighlight } from 'react-native';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import colors from '../../assets/constant/colors';
import { SearchBar, Card, Button, Overlay } from 'react-native-elements';
import OurButton from '../../components/OurButton';
import { MaterialIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import moment from "moment";

// import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
// import home from '@material-ui/icons/DeleteRounded';
//import home from '@material-ui/icons';

export default class AttendanceEvents extends React.Component {
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
            selectedOwner: {}
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
            this.setState({ user: userObj });
            this.fetchGetEvents(userObj.UserId);
        }
        );

    }

    //*I'm going to  */
    fetchGetEvents(userId) {
        console.log("in fetch");
        return fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/Events/Att?userId=' + userId, {

            method: 'GET',
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

    fetchDeleteAttend() {
        //console.log("in fetch");
        const att = {
            Id: this.state.selectedCard,
            Attandance: [{ UserId: this.state.user.UserId }]
        }
        return fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/Events/DeleteAtt', {

            method: 'DELETE',
            body: JSON.stringify(att),
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
                    console.log("fetch delete = ", result);
                    if (result === 1)
                        Alert.alert("השתתפותך בוטלה");
                    else {
                        Alert.alert("אירעה שגיאה, אנא נסה שנית");
                    }
                },
                (error) => {
                    console.log("err post=", error);
                    Alert.alert("אנא נסה שנית");
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

    attendToEvent() {
        this.fetchPostAttend();

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
                            onPress={() => navigation.navigate('CreateEvent')}>
                            <MaterialIcons name="add" size={40} color={colors.header} />
                        </OurButton>
                    </View>
                </View>
               
                <ScrollView>
                    {
                        this.state.filteredArray.length > 0 &&
                        this.state.filteredArray.map((e) => {

                            return (

                                <View style={{ right: 5 }}>
                                    <Card
                                        key={e.Id}
                                        //title={e.Name}
                                        titleStyle={styles.cardTitle}
                                        image={{ uri: e.Image }}
                                        containerStyle={styles.cardContainer}
                                    >
                                        <Text style={styles.cardTitleText}>{e.Name}</Text>
                                        <View style={{ flexDirection: 'row' }}>

                                            <Text style={styles.cardText}>{e.Desc}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', }}>
                                            <View style={styles.cardIcons}>
                                                <FontAwesome5 name="calendar-alt" size={22}></FontAwesome5>
                                                <Text style={styles.cardIconsText}>{moment(e.StartDate).format("DD/MM/YYYY")}</Text>
                                            </View>
                                            <View style={styles.cardIcons}>
                                                <FontAwesome5 name="users" size={22} ></FontAwesome5>
                                                <Text style={styles.cardIconsText}>{e.NumOfParticipants}</Text>
                                            </View>
                                            <View style={styles.cardIcons}>
                                                <FontAwesome5 name="dollar-sign" size={22}></FontAwesome5>
                                                <Text style={styles.cardIconsText}> {e.Price + '  ש"ח'}</Text>
                                            </View>

                                        </View>
                                        <View style={{ paddingVertical: 10 }}>
                                            <Button
                                                title='ראה פרטים'
                                                buttonStyle={styles.cardButton}
                                                titleStyle={styles.cardButtonText}
                                                onPress={() => this.setState({ visible: true, selectedCard: e, selectedOwner: e.Admin })}
                                            >
                                            </Button>
                                        </View>
                                        <Overlay overlayStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)' }} isVisible={this.state.visible} onBackdropPress={() => this.toggleOverlay()}>
                                            <Card
                                                key={this.state.selectedCard.Id}
                                                image={{ uri: this.state.selectedCard.Image }}
                                                containerStyle={styles.innerCardContainer}
                                            >
                                                <Text style={styles.cardTitleText} >{this.state.selectedCard.Name}</Text>
                                                <Text >{this.state.selectedCard.Desc}</Text>
                                                <View style={styles.cardIcons}>
                                                    <FontAwesome5 name="calendar-alt" size={20}></FontAwesome5>
                                                    <Text style={styles.cardIconsText}>{moment(this.state.selectedCard.StartDate).format("DD/MM/YYYY")} עד </Text>
                                                    <Text style={styles.cardIconsText}>{moment(this.state.selectedCard.EndDate).format("DD/MM/YYYY")}</Text>
                                                </View>
                                                <View style={styles.cardIcons}>
                                                    <FontAwesome5 name="users" size={22}></FontAwesome5>
                                                    <Text style={styles.cardIconsText}> {this.state.selectedCard.NumOfParticipants + '  משתתפים'}</Text>
                                                </View>
                                                <View style={styles.cardIcons}>
                                                    <FontAwesome5 name="dollar-sign" size={22}></FontAwesome5>
                                                    <Text style={styles.cardIconsText}> {this.state.selectedCard.Price + '  ש"ח'}</Text>
                                                </View>
                                                <View style={styles.cardIcons}>
                                                    <FontAwesome name="user" size={22}></FontAwesome>
                                                    <Text style={styles.cardIconsText}> {this.state.selectedOwner.FirstName + ' ' + this.state.selectedOwner.LastName}</Text>
                                                </View>
                                                <View style={styles.cardIcons}>
                                                    <FontAwesome5 name="id-card" size={22}></FontAwesome5>
                                                    <Text style={styles.cardIconsText}> {'מיועד לגילאים  ' + this.state.selectedCard.ToAge + ' - ' + this.state.selectedCard.FromAge}</Text>
                                                </View>
                                                <TouchableOpacity
                                                    style={{ paddingVertical: 20, alignSelf: 'center' }}
                                                    onPress={() => this.setState({ visible: false })}>
                                                    {/* nav to map */}
                                                    <Text style={styles.locationText}>לחץ לצפייה במיקום האירוע</Text>
                                                </TouchableOpacity>
                                                <Button
                                                        title='ביטול הגעה'
                                                        buttonStyle={styles.cardButton}
                                                        titleStyle={styles.cardButtonText}
                                                        onPress={() => this.fetchDeleteAttend()}
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
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderColor: '#D1D3D4',
        shadowColor: '#D1D3D4'
    },
    cardContainer: {
        width: Dimensions.get('window').width - 24,
        borderRadius: 6,
        borderColor: '#D1D3D4',
        shadowRadius: 5
    },
    innerCardContainer: {
        paddingHorizontal: 40,
        paddingVertical: 20,
        width: 300,
        alignSelf: 'center'
    },
    cardTitle: {
        fontSize: 26,
        color: "black",
        fontFamily: 'rubik-regular'
    },
    cardTitleText: {
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
        textAlign: 'left'
    },
    cardButton: {
        borderRadius: 30,
        marginBottom: 0,
        width: '60%',
        alignSelf: 'center',
        backgroundColor: colors.turkiz
    },
    cardButtonText: {
        fontSize: 20,
        fontFamily: 'rubik-regular'
    },
    locationText: {
        fontFamily: 'rubik-regular',
        fontSize: 16,
        color: colors.turkiz
    }
});