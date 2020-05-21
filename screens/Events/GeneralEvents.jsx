import React, { Component } from 'react';
import { createButtomTabNavigator, createAppContainer } from 'react-navigation';
import { View, Text, StyleSheet, AsyncStorage, Image, ScrollView, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements';
import AttendanceEvents from './AttendanceEvents';
import MyEvents from './MyEvents';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import colors from '../../assets/constant/colors';
import { SearchBar, Card, Button, Overlay } from 'react-native-elements';
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
            visible: false,
            selectedCat: 0,
            selectedCard:{},
            selectedOwner:{}
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
                this.fetchGetAllEvents(userObj.NeighborhoodName, userObj.UserId));
        }
        );

    }

    //*fetch */
    fetchGetAllEvents(userNei, userId) {
        console.log("in fetch");
        return fetch('http://proj.ruppin.ac.il/bgroup1/prod/api/Events/All/'+userId+'/' + userNei, {

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

    fetchPostAttend() {
        //console.log("in fetch");
        const att={
            Id: this.state.selectedCard,
            Attandance: [{UserId: this.state.user.UserId}]
        }
        return fetch('http://proj.ruppin.ac.il/bgroup1/prod/api/Event/PostAtt', {

            method: 'POST',
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
                    console.log("fetch POST att = ", result);
                    if (result === 1)
                    Alert.alert("השתתפותך נרשמה, תהנה באירוע!");
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

    fetchDeleteAttend() {
        //console.log("in fetch");
        const att={
            Id: this.state.selectedCard,
            Attandance: [{UserId: this.state.user.UserId}]
        }
        return fetch('http://proj.ruppin.ac.il/bgroup1/prod/api/Event/DeleteAtt', {

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

    //filter the events by selected category 
    filterByCat(catId) {
        if (catId == this.state.selectedCat) {
            this.setState({ filteredArray: this.arrayholder })
        }
        else {
            const newData = this.arrayholder.filter(function (item) {
                //applying filter for the inserted text in search bar
                const itemData = item.CategoryId;
                return itemData == catId;
            });
            this.setState({
                filteredArray: newData,
                selectedCat: catId
            });
            console.log(this.state.filteredArray)
        }
    }


    //press on plus
    createNewEvent() {
        console.log("hi");
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
                <BackButton goBack={() => navigation.navigate('MainPage')}/>

                <View style={styles.row}>
                    <SearchBar
                        placeholder="חפש/י אירועים בשכונה.."
                        onChangeText={text => this.SearchFilterFunction(text)}
                        onClear={text => this.SearchFilterFunction('')}
                        value={this.state.text}
                        lightTheme={true}
                        inputContainerStyle={{ backgroundColor: 'white' }}
                        containerStyle={{ width: '90%', backgroundColor: colors.reeBackgrouond }}
                    />
                    <OurButton
                        title='add'
                        key='add'
                        onPress={() => this.createNewEvent()}>
                        <MaterialIcons name="add-circle" size={30} color={colors.turkiz} style={styles.addIcon} />
                    </OurButton>
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

                            return (

                                <Card
                                    key={e.Id}
                                    title={e.Name}
                                    image={{ uri: e.Image }}
                                    style={{ marginLeft: 0, marginRight: 0 }}
                                    containerStyle={{ width: Dimensions.get('window').width - 20 }}
                                >

                                    <Text style={{ marginBottom: 10 }}>{e.Desc}</Text>
                                    <View style={{ alignItems: "flex-end", direction: 'rtl', flexDirection: 'row' }}>
                                        <MaterialIcons name="date-range" size={20} color={'black'}></MaterialIcons>
                                        <Text style={{ color: 'black', marginRight: 20 }}>{new Date(e.StartDate).toLocaleDateString()}</Text>
                                    </View>
                                    <Button
                                        title='ראה פרטים'
                                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                        onPress={() => this.setState({ visible: true , selectedCard:e, selectedOwner:e.Admin})}
                                    ></Button>
                                    <Overlay isVisible={this.state.visible} onBackdropPress={() => this.toggleOverlay()}>
                                        <Card
                                            key={this.state.selectedCard.Id}
                                            image={{ uri: this.state.selectedCard.Image }}
                                            title={this.state.selectedCard.Name}
                                            style={{ marginLeft: 0, marginRight: 0 }}
                                        >

                                            <Text style={{ marginBottom: 10 }}>{this.state.selectedCard.Desc}</Text>
                                            <View style={{ alignItems: "flex-end", direction: 'rtl', flexDirection: 'row' }}>
                                                <MaterialIcons name="date-range" size={20} color={'black'}></MaterialIcons>
                                                <Text style={{ color: 'black', marginRight: 20 }}>{new Date(this.state.selectedCard.StartDate).toLocaleDateString()} - </Text>
                                                <Text style={{ color: 'black', marginRight: 20 }}>{new Date(this.state.selectedCard.EndDate).toLocaleDateString()}</Text>
                                            </View>
                                            <Text>מספר משתתפים: {this.state.selectedCard.NumOfParticipants}</Text>
                                            <Text>מחיר: {this.state.selectedCard.Price}</Text>
                                            <Text>מארגן האירוע: {this.state.selectedOwner.FirstName + ' ' + this.state.selectedOwner.LastName}</Text>
                                            <Text>טווח גילאים: {this.state.selectedCard.ToAge + ' - ' + this.state.selectedCard.FromAge}</Text>
                                            <TouchableOpacity

                                                onPress={() => this.setState({ visible: false })}>
                                                {/* nav to map */}
                                                <Text>לחץ לצפייה במיקום האירוע</Text>
                                            </TouchableOpacity>
                                            {this.state.selectedCard.Attend!=1?
                                            <Button
                                                type="outline"
                                                raised={true}
                                                title='מעוניינ/ת'
                                                onPress={() => this.fetchPostAttend()}
                                            > </Button>
                                            :
                                            <Button
                                                type="outline"
                                                raised={true}
                                                title='ביטול הגעה'
                                                onPress={() => this.fetchDeleteAttend()}
                                            > </Button>
                                            }
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
