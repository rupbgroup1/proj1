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
//import geolib from 'geolib';

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
            selectedS:{}
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
                        console.log("SERVICES = ", result);
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

    fetchPostRate(rating){
        console.log("fetch test=", rating, this.state.selectedS.ServiceId)
        return fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/Services/UpdateRate/'+this.state.selectedS.ServiceId+'/'+rating, {

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
            this.setState({ filteredArray: this.arrayholder, selectedCat: 0 })
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

    ratingCompleted=(rating)=> {
        console.log("Rating is: " + rating);
        Alert.alert(
            'האם תרצה לשמור את הדירוג - '+rating+'?',
       "",
            [
              {text: 'כן', onPress: () => this.fetchPostRate(rating)},
              {
                text: 'לא',
                style: 'cancel',
              }
            ],
           
          ); 
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
                                    <Button
                                        type="outline"
                                        title={c.Name}
                                        titleStyle={c.Id === this.state.selectedCat
                                            ? styles.coloredTitleCat
                                            : styles.titleCat}
                                        key={c.Id}
                                        onPress={cat => this.filterByCat(c.Id)}
                                        raised={true}
                                        buttonStyle={c.Id === this.state.selectedCat ? styles.selectedCategory : styles.categories}
                                    >
                                    </Button>
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

                                <View style={{ right: 3.5 }}>
                                    <Card
                                        key={s.ServiceId}
                                        //title={e.Name}
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

                                        {(this.state.rateVisible&&this.state.selectedS.ServiceId===s.ServiceId) &&
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
                                            <Overlay isVisible={this.state.mapVisible} onBackdropPress={() => this.toggleMapOverlay()}>
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
                                        <Overlay overlayStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)' }} isVisible={this.state.visible} onBackdropPress={() => this.toggleOverlay()}>
                                            <Card
                                                key={this.state.selectedCard.ServiceId}
                                                image={{ uri: this.state.selectedCard.ImageGallery }}
                                                containerStyle={styles.innerCardContainer}
                                            >
                                                <Text style={styles.cardTitleText} >{this.state.selectedCard.ServiceName}</Text>
                                                <Text>{this.state.selectedCard.Description}</Text>
                                                <Text> דירוג העסק {this.state.selectedCard.Rate}</Text>
                                                <Text> פתוח בימי:  {this.state.selectedCard.OpenDays}</Text>
                                                <Text> בין השעות {this.state.selectedCard.OpenHoursStart}-{this.state.selectedCard.OpenHoursEnds}</Text>
                                                <Text> כתובת {this.state.selectedCard.ServiceAddress}</Text>

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
        backgroundColor: colors.turkiz,
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
        backgroundColor: colors.turkiz,
        elevation: 4
    },
    cardButtonText: {
        fontSize: 16,
        fontFamily: 'rubik-regular'
    },
    locationText: {
        fontFamily: 'rubik-regular',
        fontSize: 16,
        color: colors.turkiz
    },
    innerCardImage: {
        height: 200,
        marginLeft: 0,
        marginRight: 0
    }
});

const TabNavigator = createMaterialBottomTabNavigator(
    {
        General: {
            screen: GeneralServices,
            navigationOptions: {
                tabBarLabel: 'עסקים בקהילה',
                activeColor: colors.turkiz,
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
                activeColor: colors.turkiz,
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