import React, { Component } from 'react';
import { createButtomTabNavigator, createAppContainer } from 'react-navigation';
import { View, Text, StyleSheet, AsyncStorage, Image, ScrollView, Alert } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements';
import AttendanceEvents from './AttendanceEvents';
import MyEvents from './MyEvents';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import colors from '../../assets/constant/colors';
import { SearchBar, Card, Button } from 'react-native-elements';
import OurButton from '../../components/OurButton';
import { MaterialIcons } from '@expo/vector-icons';

class GeneralEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            allEvents: {},
            isLoading: true,
            text: '',
            filteredArray: []
        };
        this.arrayholder = [];
        this.catArray = [];
    }

    componentDidMount() {
        this.getUser();
        //this.fetchGetAllCategories();
    }

    getUser() {
        AsyncStorage.getItem('user', (err, userJSON) => {
            const userObj = JSON.parse(userJSON);
            //console.log("obj==", userObj);
            this.setState({ user: userObj }, () =>
                this.fetchGetAllEvents(userObj.NeighborhoodName));
        }
        );

    }

    fetchGetAllEvents(userNei) {
        console.log("in fetch");
        return fetch('http://proj.ruppin.ac.il/bgroup1/prod/api/Events/All?neiName=' + userNei, {

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

    fetchGetAllCategories() {
        //console.log("in fetch");
        return fetch('http://proj.ruppin.ac.il/bgroup1/prod/api/Category/All', {

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


    SearchFilterFunction(text) {
        //passing the inserted text in textinput

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
                //After setting the data it will automatically re-render the view
                filteredArray: newData,
                text: text,
            })
            : this.setState({ filteredArray: this.arrayholder, text: text });
    }


    createNewEvent() {
        console.log("hi");
    }

    render() {
        const { search } = this.state;
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>

                <Header />
                {/* <BackButton goBack={() => navigation.navigate('MainPage')}/> */}
                <View style={styles.row}>
                    <Text style={styles.title}>אירועים בשכונה</Text>
                    <OurButton
                        title='add'
                        key='add'
                        onPress={() => this.createNewEvent()}>
                        <MaterialIcons name="add-circle" size={40} color={colors.turkiz} style={styles.addIcon} />
                    </OurButton>
                </View>
                <View style={styles.row}>
                    <SearchBar
                        round
                        searchIcon={{ size: 24 }}
                        placeholder="חפש/י.."
                        onChangeText={text => this.SearchFilterFunction(text)}
                        onClear={text => this.SearchFilterFunction('')}
                        value={this.state.text}
                        lightTheme={true}
                        inputContainerStyle={{ backgroundColor: 'white' }}
                        containerStyle={{ width: '100%', backgroundColor: colors.reeBackgrouond }}
                    />

                </View>
                <ScrollView horizontal={true}>

                </ScrollView>
                <ScrollView>
                    {
                        this.state.filteredArray.length > 0 &&
                        this.state.filteredArray.map((e) => {
                            console.log(e.Image);
                            return (
                                
                                <Card
                                    key={e.Id}
                                    title={e.Name}
                                    image={{ uri: e.Image }}
                                    style={{ marginLeft: 0, marginRight: 0 }}
                                >

                                    <Text style={{ marginBottom: 10 }}>{e.Desc}</Text>
                                    <View style={{ alignItems: "flex-end", direction: 'rtl', flexDirection: 'row' }}>
                                        <MaterialIcons name="date-range" size={20} color={'black'}></MaterialIcons>
                                        <Text style={{ color: 'black', marginRight: 20 }}>{new Date(e.StartDate).toLocaleDateString()}</Text>
                                    </View>
                                    <Button title='ראה פרטים' buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}></Button>

                                </Card>

                            )
                        }
                        )}
                    {this.state.filteredArray.length < 1 && this.state.text != '' ?
                        this.arrayholder.map((e) => {
                            return (
                                <Card
                                    key={e.Id}
                                    title={e.Name}

                                    image={{ uri: e.Image }}
                                    style={{ marginLeft: 0, marginRight: 0 }}
                                >
                                    <Text style={{ marginBottom: 10 }}>{e.Desc}</Text>
                                    <Button title='ראה פרטים' buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}></Button>

                                </Card>

                            )
                        }
                        ) : null}
                </ScrollView>
            </View>
        );
    }
};
const styles = StyleSheet.create({
    imageCard: {

        resizeMode: 'cover'
    },
    title: {
        alignItems: 'center',
        fontSize: 32,
        color: colors.turkiz,
        fontFamily: 'rubik-regular',
        fontWeight: 'bold'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'stretch',
        marginTop: 15,
        marginLeft: 0,
        marginRight: 0
    },
    addIcon: {
        marginTop: 15,
    }
});

const TabNavigator = createMaterialBottomTabNavigator(
    {
        General: {
            screen: GeneralEvents,
            navigationOptions: {
                tabBarLabel: 'כללי',
                activeColor: colors.turkiz,
                inactiveColor: 'black',
                barStyle: { backgroundColor: 'white' },

                tabBarIcon: () => (
                    <View>
                        <Icon name={'home'} size={25} style={{ color: 'black' }} />
                    </View>
                )

            }
        },
        MyEvents: {
            screen: MyEvents,
            navigationOptions: {
                tabBarLabel: 'האירועים שלי',
                activeColor: colors.turkiz,
                inactiveColor: 'black',
                barStyle: { backgroundColor: 'white' },
                tabBarIcon: () => (
                    <View>
                        <Icon name={'person'} size={25} style={{ color: 'black' }} />
                    </View>
                )

            }
        },
        AttendanceEvents: {
            screen: AttendanceEvents,
            navigationOptions: {
                tabBarLabel: 'מגיע/ה',
                activeColor: colors.turkiz,
                inactiveColor: 'black',
                barStyle: { backgroundColor: 'white' },
                tabBarIcon: () => (
                    <View>
                        <Icon name={'star'} size={25} style={{ color: 'black' }} />
                    </View>
                )

            }
        }

    }
);
export default createAppContainer(TabNavigator);
