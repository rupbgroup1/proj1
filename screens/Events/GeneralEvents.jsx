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
import { SearchBar, Card, Button, Overlay  } from 'react-native-elements';
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
            filteredArray: [],
            visible:false
            
        };
        this.arrayholder = [];
        this.catArray = [];

       
    }

    componentDidMount() {
        this.getUser();
        this.fetchGetAllCategories();
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



    //filter the events by selected category 
    filterByCat(catId) {
        const newData = this.arrayholder.filter(function (item) {
            //applying filter for the inserted text in search bar
            const itemData = item.CategoryId;
            return itemData == catId;
        });
        this.setState({
            filteredArray: newData
        });
        console.log(this.state.filteredArray)
    }


    //press on plus
    createNewEvent() {
        console.log("hi");
    }

    toggleOverlay() {
        this.setState({visible:false});
      }
    


    render() {
        const { search } = this.state;
        const vis = false;
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>

                <Header />
                {/* <BackButton goBack={() => navigation.navigate('MainPage')}/> */}
                <View style={styles.row}>
                    <Text style={styles.title}>אירועים בשכונה</Text>
                    <OurButton
                        title='add'
                        key='add'
                        onPress={() => this.createNewEvent()}>
                        <MaterialIcons name="add-circle" size={30} color={colors.turkiz} style={styles.addIcon} />
                    </OurButton>
                </View>
                <View style={styles.row}>
                    <SearchBar
                        placeholder="חפש/י.."
                        onChangeText={this.updateSearch}
                        value={search}
                        lightTheme={true}
                        inputContainerStyle={{ backgroundColor: 'white' }}
                        containerStyle={{ width: '100%', backgroundColor: colors.reeBackgrouond }}
                    />

                </View>
                <View style={{ height: 40 }}>
                    <ScrollView horizontal={true}>
                        {this.catArray.map((c) => {
                            return (
                                <Button
                                    type="outline"
                                    title={c.CategoryName}
                                    key={c.CategoryId}
                                    onPress={cat => this.filterByCat(c.CategoryId)}
                                    raised={true}
                                >
                                </Button>)
                        })}
                    </ScrollView>
                </View>
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
                                    <Button
                                        title='ראה פרטים'
                                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                        onPress={()=>this.setState({visible:true})}
                                    ></Button>
                                     <Overlay isVisible={this.state.visible} onBackdropPress={()=>this.toggleOverlay()}>
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
                                    </Card>
                                        </Overlay>

                                </Card>

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
    title: {
        alignItems: 'center',
        fontSize: 24,
        color: colors.turkiz,
        fontFamily: 'rubik-regular'
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
