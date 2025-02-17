import React, { Component } from 'react';
import { createButtomTabNavigator, createAppContainer } from 'react-navigation';
import { View, Text, StyleSheet, AsyncStorage, Image, ScrollView, Alert, Dimensions, TouchableOpacity, TouchableHighlight } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MyServices from './MyServices';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import colors from '../../assets/constant/colors';
import { SearchBar, Card, Button, Overlay, Rating } from 'react-native-elements';
import OurButton from '../../components/OurButton';
import { MaterialIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import moment from "moment";
import MapView, { Marker } from 'react-native-maps';
import { getDistance } from 'geolib';
// import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
// import home from '@material-ui/icons/DeleteRounded';
//import home from '@material-ui/icons';

class GeneralServices extends React.Component {
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
            selectedOwner: {},
            mapVisible: false,
        };
        this.arrayholder = [];
        this.catArray = [];

    }

    componentDidMount() {
        this.fetchGetAllCategories();
        this.getUser();
        
    }

    getUser() {
        AsyncStorage.getItem('user', (err, userJSON) => {
            const userObj = JSON.parse(userJSON);
            //console.log("obj==", userObj);
            this.setState({ user: userObj }, () =>
                this.fetchGetAllServices(userObj.NeighborhoodName));
        }
        );

    }

    //*fetch */
    fetchGetAllServices(userNei) {
        console.log("in fetch");
        return fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/Services/All?neiName=' + userNei, {

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
                        //console.log("SERVICES = ", result);
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

    fetchPostRate(rating) {
        console.log("fetch test=", rating, this.state.selectedS.ServiceId)
        return fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/Services/UpdateRate/' + this.state.selectedS.ServiceId + '/' + rating, {

            method: 'PUT',
            //body: JSON.stringify(this.state.selectedS),
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
                        Alert.alert("נשמר בהצלחה");
                        console.log(result);
                        this.props.navigation.navigate('GeneralServices');
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

    ratingCompleted = (rating) => {
        console.log("Rating is: " + rating);
        Alert.alert(
            'האם תרצה לשמור את הדירוג - ' + rating + '?',
            "",
            [
                { text: 'כן', onPress: () => this.fetchPostRate(rating) },
                {
                    text: 'לא',
                    style: 'cancel',
                }
            ],

        );
    }

    fetchGetAllCategories() {
        //console.log("in fetch");
        return fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/SubCategory/All', {

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

    //filter the events by selected category 
    filterByCat(catId) {
        if (catId == this.state.selectedCat) {
            this.setState({ filteredArray: this.arrayholder })
        }
        else {
            const newData = this.arrayholder.filter(function (item) {
                //applying filter for the inserted text in search bar
                const itemData = item.Categories;
                return itemData == catId;
            });
            this.setState({
                filteredArray: newData,
                selectedCat: catId
            });
            console.log(this.state.filteredArray)
        }
    }


    buildFunc() {
        console.log("test");
    }

    toggleOverlay() {
        this.setState({ visible: false });
    }
    toggleMapOverlay() {
        this.setState({ mapVisible: false });
    }

    render() {
        const { navigation } = this.props;
        const { selectedDays } = this.state;
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>

                <Header navigation={navigation} />
                <BackButton goBack={() => navigation.navigate('MainPage')} />

                <View style={styles.row}>
                    <View style={styles.search}>
                        <SearchBar
                            placeholder="חפש/י עסקים בשכונה.."
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
                            onPress={() => navigation.navigate('CreateService')}>
                            <MaterialIcons name="add" size={40} color={colors.header} />
                        </OurButton>
                    </View>
                </View>
                <View style={{ height: 40, }}>
                    <ScrollView horizontal={true}>
                        {this.catArray.map((c) => {
                            return (
                                <View style={{ paddingHorizontal: 1 }}>
                                    <OurButton
                                        title={c.Name}
                                        key={c.Id}
                                        style={styles.categories}
                                        onPress={cat => this.filterByCat(c.Id)}>
                                        <FontAwesome name={c.Icon} size={22} color={c.Id === this.state.selectedCat ? colors.Business : colors.header} />

                                    </OurButton>
                                    <OurButton
                                        title={c.Name}
                                        key={c.Id}
                                        style={styles.categories}
                                        onPress={cat => this.filterByCat(c.Id)}>
                                        <Text style={{ color: c.Id === this.state.selectedCat ? colors.Business : colors.header, fontFamily: 'rubik-regular' }}>{c.Name}</Text>
                                    </OurButton>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
                <ScrollView>
                    {
                        this.state.filteredArray.length > 0 &&
                        this.state.filteredArray.map((s) => {
                            const distance = getDistance(
                                { latitude: s.Lat, longitude: s.Lan },
                                { latitude: this.state.user.Lat, longitude: this.state.user.Lan }
                            );
                            return (

                                <View style={{ right: 5 }}>
                                    <Card
                                        key={s.ServiceId}
                                        titleStyle={styles.cardTitle}
                                        image={{ uri: s.ImageGallery }}
                                        containerStyle={styles.cardContainer}
                                    >
                                        <Text style={styles.cardTitleText}>{s.ServiceName}</Text>
                                        <View style={{ flexDirection: 'row' }}>

                                            <Text style={styles.cardText}>{s.Description}</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.locationButton}
                                            onPress={() => this.setState({ mapVisible: true, selectedS: s })}>
                                            <MaterialIcons
                                                name="location-on"
                                                size={22}
                                                color={colors.turkiz}>
                                            </MaterialIcons>
                                            {distance < 1000 ?
                                                <Text style={styles.cardText}> {distance} מטר ממיקומך</Text> :
                                                <Text style={styles.cardText}> {distance / 1000} ק"מ ממיקומך</Text>
                                            }
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.locationButton}
                                            onPress={() => this.setState({ rateVisible: true, selectedS: s })}>
                                            <MaterialIcons
                                                name="star"
                                                size={22}
                                                color={colors.turkiz}>
                                            </MaterialIcons>
                                            <Text style={styles.cardText}>דרג את העסק</Text>
                                        </TouchableOpacity>
                                        {(this.state.rateVisible && this.state.selectedS.ServiceId === s.ServiceId) &&
                                            <Rating
                                                type='star'
                                                ratingCount={5}
                                                imageSize={30}
                                                onFinishRating={this.ratingCompleted}
                                                style={{ paddingVertical: 10 }}
                                                fractions={0}
                                                startingValue={this.state.selectedS.Rate}
                                            />
                                        }
                                        {this.state.selectedS != null &&
                                            <Overlay overlayStyle={styles.overlay} isVisible={this.state.mapVisible} onBackdropPress={() => this.toggleMapOverlay()}>
                                                <MapView
                                                    style={{
                                                        width: "100%",
                                                        height: "100%"
                                                    }}
                                                    region={{
                                                        latitude: this.state.selectedS.Lat,
                                                        longitude: this.state.selectedS.Lan,
                                                        latitudeDelta: 0.003,
                                                        longitudeDelta: 0.003,
                                                    }}>
                                                    <Marker
                                                        coordinate={{
                                                            latitude: this.state.selectedS.Lat,
                                                            longitude: this.state.selectedS.Lan,
                                                            latitudeDelta: 0.003,
                                                            longitudeDelta: 0.003,

                                                        }}
                                                        title={this.state.selectedCard.ServiceAddress}
                                                    />

                                                </MapView>
                                            </Overlay>
                                        }
                                        <View style={{ paddingVertical: 10 }}>
                                            <Button
                                                title='פרטים נוספים'
                                                buttonStyle={styles.cardButton}
                                                titleStyle={styles.cardButtonText}
                                                onPress={() => this.setState({ visible: true, selectedCard: s, selectedOwner: s.Owner })}
                                            >
                                            </Button>
                                        </View>
                                        <Overlay overlayStyle={styles.overlay} isVisible={this.state.visible} onBackdropPress={() => this.toggleOverlay()}>
                                            <Card
                                                key={this.state.selectedCard.ServiceId}
                                                image={{ uri: this.state.selectedCard.ImageGallery }}
                                                containerStyle={styles.innerCardContainer}
                                            >
                                                <View style={styles.details}>
                                                    <Text style={styles.cardTitleText} >{this.state.selectedCard.ServiceName}</Text>
                                                    <Text style={styles.serviceDesc}>{this.state.selectedCard.Description}</Text>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <FontAwesome name={'star'} size={24} color={colors.Business} />
                                                        <Text style={styles.serviceDetails}> עסק זה קיבל דירוג של {this.state.selectedCard.Rate} כוכבים</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <FontAwesome name={'calendar'} size={24} color={colors.Business} />
                                                        <Text style={styles.serviceDetails}> פתוח {this.state.selectedCard.OpenDays}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <FontAwesome name={'clock-o'} size={24} color={colors.Business} />
                                                        <Text style={styles.serviceDetails}> בין השעות {this.state.selectedCard.OpenHoursStart} ל- {this.state.selectedCard.OpenHoursEnds}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <FontAwesome name={'map-marker'} size={24} color={colors.Business} />
                                                        <Text style={styles.serviceDetails}>  {this.state.selectedCard.ServiceAddress}</Text>
                                                    </View>

                                                    
                                                </View>

                                                <Button
                                                    title='צור קשר'
                                                    buttonStyle={styles.cardButton}
                                                    titleStyle={styles.cardButtonText}
                                                    onPress={() => {
                                                        this.setState({ visible: false }, () =>
                                                            navigation.navigate('Chat', { userCode: this.state.selectedCard.Owner }));
                                                    }}
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
    locationButton: {
        borderRadius: 30,
        alignSelf: 'flex-start',
        color: 'grey',
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
    titleCat: {
        color: colors.turkiz,
        fontFamily: 'rubik-regular'
    },
    coloredTitleCat: {
        color: 'white',
        fontFamily: 'rubik-bold'
    },
    bottomIcons: {
        paddingBottom: 2
    },
    categories: {
        // backgroundColor: 'white',
        // borderRadius: 0,
        // paddingVertical: 5,
        // paddingHorizontal: 10,
        // borderColor: '#D1D3D4',
        // shadowColor: '#D1D3D4'
        paddingHorizontal: 20,
        marginBottom: 5,
        alignItems: 'center'
    },
    titleCat: {
        color: colors.Business,
        fontFamily: 'rubik-regular'
    },
    coloredTitleCat: {
        color: 'white',
        fontFamily: 'rubik-bold'
    },
    selectedCategory: {
        backgroundColor: colors.Business,
        borderRadius: 0,
        paddingVertical: 5,
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
    width: 330,
    height: 650,
    alignSelf: 'center',
    borderWidth: 0
  },
    cardTitle: {
        fontSize: 26,
        color: "black",
        fontFamily: 'rubik-regular'
    },
    cardTitleText: {
        textAlign: 'center',
        fontSize: 26,
        color: "black",
        fontFamily: 'rubik-regular',
        paddingBottom: 10
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
        margin: 10,
        width: '50%',
        height: 40,
        alignSelf: 'center',
        backgroundColor: colors.Business,
        elevation: 4
    },
    cardButtonText: {
        fontSize: 16,
        fontFamily: 'rubik-regular'
    },
    locationText: {
        fontFamily: 'rubik-regular',
        fontSize: 16,
        color: colors.Business
    },
    innerCardImage: {
        height: 200,
        marginLeft: 0,
        marginRight: 0
    },
    overlay: {
        backgroundColor: 'rgba(52, 52, 52, 0)',
        width: 330,
        height: 650,
        justifyContent: 'center'
    },
    serviceDesc: {
        textAlign: 'center',
        paddingVertical: 5,
        fontSize: 18
    },
    serviceDetails: {
        paddingVertical: 5,
        alignSelf: 'flex-start',
        fontSize: 18, 
        paddingLeft:5
    },
    details: {
        paddingVertical: 20
    }
});

const TabNavigator = createMaterialBottomTabNavigator(
    {
        General: {
            screen: GeneralServices,
            navigationOptions: {
                tabBarLabel: 'עסקים בקהילה',
                activeColor: colors.Business,
                inactiveColor: 'black',
                barStyle: { backgroundColor: 'white' },
                key: 1,

                tabBarIcon: () => (
                    <View>
                        <FontAwesome5 name={'home'} size={23} color={'black'} />
                    </View>
                )

            }
        },
        MyServices: {
            screen: MyServices,
            navigationOptions: {
                tabBarLabel: 'העסקים שלי',
                activeColor: colors.Business,
                inactiveColor: 'black',
                barStyle: { backgroundColor: 'white' },
                key: 2,
                tabBarIcon: () => (
                    <View>
                        <FontAwesome5 name={'user-alt'} size={24} color={'black'} />
                    </View>
                )

            }
        },
    }
);
export default createAppContainer(TabNavigator);