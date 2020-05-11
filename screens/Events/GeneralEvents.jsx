import React, { Component } from 'react';
import { createButtomTabNavigator, createAppContainer } from 'react-navigation';
import { View, Text, StyleSheet, AsyncStorage, Image } from 'react-native';
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
    }

    componentDidMount() {
        this.getUser();
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
                        //this.setState({ allEvents: result })
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
        this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            filteredArray: newData,
            text: text,
        });
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
                <Text style={styles.title}>אירועים בשכונה</Text>
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
                        containerStyle={{ width: '80%', backgroundColor: colors.reeBackgrouond }}
                    />
                    <OurButton
                        title='add'
                        key='add'
                        onPress={() => this.createNewEvent()}>
                        <MaterialIcons name="add-circle" size={40} color={colors.turkiz} style={styles.addIcon} />
                    </OurButton>
                </View>
                {this.state.filteredArray.map((e) => {
                    let imageLink = e.Image;
                    return (
                        <Card
                        key={e.Id}
                            title={e.Name}>
                                <Image
                                source={{uri:e.Image}}
                                style={styles.imageCard}

                                />
                          
                            <Text style={{ marginBottom: 10 }}>The idea with React Native Elements i </Text>
                            <Button title='ראה פרטים' buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}></Button>

                        </Card>

                    )
                }
                )}
            </View>
        );
    }
};
const styles = StyleSheet.create({
    imageCard:{
height:100,
width:'100%',
resizeMode:'cover'
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
        justifyContent: 'center',
        alignContent: 'space-between',
        marginTop: 15,
    },
    addIcon: {
        marginRight: 20,
        alignItems: "center",
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
