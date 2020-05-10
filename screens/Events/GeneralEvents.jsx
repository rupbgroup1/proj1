import React, { Component } from 'react';
import { createButtomTabNavigator, createAppContainer } from 'react-navigation';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements';
import AttendanceEvents from './AttendanceEvents';
import MyEvents from './MyEvents';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import colors from '../../assets/constant/colors';
import { SearchBar } from 'react-native-elements';
import OurButton from '../../components/OurButton';
import { MaterialIcons } from '@expo/vector-icons';

class GeneralEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        };
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
            // return fetch('http://proj.ruppin.ac.il/bgroup1/prod/api/Events/Match?userId=' + userNei, {
    
            //     method: 'GET',
            //     headers: new Headers({
            //         'Content-Type': 'application/json; charset=UTF-8',
            //     })
            // })
            //     .then(res => {
            //         return res.json();
            //     })
            //     .then(
            //         (result) => {
            //             if (result.length > 0) {
            //                 console.log("matcch", result);
            //                 this.setState({ MatchUsers: result })
            //             }
            //             else
            //                 Alert.alert(" מצטערים, אנו נסו שנית!");
            //         },
            //         (error) => {
            //             console.log("err post=", error);
            //             Alert.alert("מצטערים, אנו נסו שנית!");
            //         }
            //     );
        }
    

    updateSearch = search => {
        this.setState({ search });
    };

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
                        placeholder="חפש/י.."
                        onChangeText={this.updateSearch}
                        value={search}
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
            </View>
        );
    }
};
const styles = StyleSheet.create({
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
    addIcon:{
        marginRight:20,
        alignItems:"center",
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
