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


export default class MyLosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            text: '',
            filteredArray: [],
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
                this.fetchGetMyLosts(userObj.UserId));
        }
        );

    }

    //*fetch GET ALL */
    fetchGetMyLosts(user) {
        console.log("in fetch", user);
        return fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/Losts/My?userId=' + user, {

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
                        console.log("Losts = ", result);
                        this.arrayholder = result;
                        this.setState({ filteredArray: result })
                    }
                    else
                    console.log("no losts");
                },
                (error) => {
                    console.log("err post=", error);
                    Alert.alert("מצטערים, אנא נסה שנית!");
                }
            );
    }

     //*fetch UPDATE */
     fetchMarkLostsAsReturned(lost) {
        console.log("in fetch R", lost);
        return fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/Losts/Update', {

            method: 'PUT',
            body: JSON.stringify(lost),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        })
            .then(res => {
                return res.json();
            })
            .then(
                (result) => {
                    if (result === 1) {
                        Alert.alert("המציאה סומנה כהושבה!");
                        this.fetchGetMyLosts(this.state.user.UserId);
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
            const itemData = item.ServiceName;
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


    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>

                <Header navigation={navigation}/>
                <BackButton goBack={() => navigation.navigate('MainPage')} />

                <View style={styles.row}>
                    <View style={styles.search}>
                        <SearchBar
                            placeholder="חפש/י מציאות בשכונה.."
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
                            onPress={() => navigation.navigate('CreateLost')}>
                            <MaterialIcons name="add" size={40} color={colors.header} />
                        </OurButton>
                    </View>
                </View>

                <ScrollView>
                    {
                        this.state.filteredArray.length > 0 &&
                        this.state.filteredArray.map((l) => {

                            return (

                                <View style={{ right: 3.5 }}>
                                    <Card
                                        key={l.Id}
                                        titleStyle={styles.cardTitle}
                                        image={{ uri: l.ImageId }}
                                        containerStyle={styles.cardContainer}
                                    >
                                        <Text style={styles.cardTitleText}>{l.Title}</Text>
                                        <View>
                                            <Text style={styles.cardText}>{l.Description}</Text>
                                            <Text style={styles.cardText}>{l.Location}</Text>
                                            <Text style={styles.cardText}>{l.FoundDate}</Text>
                                        </View>
                                        <View style={{ paddingVertical: 10 }}>
                                            <Button
                                                title='סמן כהושבה'
                                                buttonStyle={styles.cardButton}
                                                titleStyle={styles.cardButtonText}
                                                onPress={() => {
                                                    this.fetchMarkLostsAsReturned(l);
                                                }}
                                            > </Button>
                                        </View>


                                    </Card>
                                </View>

                            )
                        })
                    }
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
    locationButton: {
        borderRadius: 30,
        alignSelf: 'flex-start',
        color: 'grey',

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
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderColor: '#D1D3D4',
        shadowColor: '#D1D3D4'
    },
    selectedCategory: {
        backgroundColor: colors.Losts,
        borderRadius: 0,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderColor: '#D1D3D4',
        shadowColor: '#D1D3D4'
    },
    titleCat: {
        color: colors.turkiz,
        fontFamily: 'rubik-regular'
    },
    coloredTitleCat: {
        color: 'white',
        fontFamily: 'rubik-bold'
    },

    cardContainer: {
        width: Dimensions.get('window').width - 24,
        borderRadius: 6,
        borderColor: '#D1D3D4',
        shadowRadius: 5
    },
    innerCardContainer: {
        width: 300,
        alignSelf: 'center'
    },
    cardTitle: {
        fontSize: 26,
        color: "black",
        fontFamily: 'rubik-regular'
    },
    cardTitleText: {
        alignSelf: 'center',
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
        backgroundColor: colors.Losts,
        elevation: 4
    },
    cardButtonText: {
        fontSize: 16,
        fontFamily: 'rubik-regular'
    },
    locationText: {
        fontFamily: 'rubik-regular',
        fontSize: 16,
        color: colors.Losts
    },
    innerCardImage: {
        height: 200,
        marginLeft: 0,
        marginRight: 0
    }
});