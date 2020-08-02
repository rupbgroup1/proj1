import React, { Component, createElement } from 'react';
import { View, StyleSheet, Text, Image, Alert, AsyncStorage, TouchableOpacity, Picker, SafeAreaView, ScrollView } from 'react-native';
import Header from '../components/Header';
import colors from '../assets/constant/colors';
import BackButton from '../components/BackButton';
import { Input, Button } from 'react-native-elements';
import OurButton from '../components/OurButton';
import Autocomplete from 'react-native-autocomplete-input';
import { Dropdown } from 'react-native-material-dropdown';
import {
    SimpleLineIcons,
    FontAwesome5
} from '@expo/vector-icons';

//import { ScrollView } from 'react-native-gesture-handler';


export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            neighboor: {}
        }
    }

    componentDidMount() {
        let neighboor = this.props.navigation.getParam("neighboor");
        console.log(neighboor);
        this.setState({ MatchRate: neighboor.MatchRate });
        this.fetchGetNeighboor(neighboor);
    }

    fetchGetNeighboor(nei) {
        const loginDetails = {
            userId: nei.UserId
        }

        console.log(loginDetails);

        fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/User/login', {
            method: 'POST',
            body: JSON.stringify(loginDetails),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                //console.log('res=', res);
                return res.json()
            })
            .then(
                (result) => {
                    //console.log("fetch = ", result);
                    if (result.UserId > 0) {
                        this.setState({ neighboor: result }, () =>
                            console.log("after setstate,  ", result));
                        console.log("intrests: ", this.state.neighboor);
                    }
                    else {
                        console.log("result post=", result);
                        Alert.alert("איראה שגיאה, אנא נסה שנית");
                    }
                },
                (error) => {
                    console.log("err post=", error);
                    Alert.alert("איראה שגיאה, אנא נסה שנית");
                });
    }

    render() {
        const nei = this.state.neighboor;
        const gender = nei.Gender === 1 ? 'בת' : 'בן';
        const age = new Date().getFullYear() - nei.YearOfBirth;
        const jobName = nei.JobTitle != null ? nei.JobTitle.JobName : '';
        const { navigation } = this.props;
        const intrests = nei.Intrests != null && nei.Intrests.map((buttonIntersts) => (
            <Text>{buttonIntersts.Subintrest}  |  </Text>
        ));
        return (

            <View style={styles.screen} >
                <Header navigation={navigation}/>
                <BackButton goBack={() => this.props.navigation.navigate('FindNeighboor')} />
                <View style={styles.container}>
                    <View style={styles.screen}>
                        {this.state.neighboor.ImagePath &&
                            <Image style={styles.avatar}
                                source={{ uri: nei.ImagePath }}
                            />
                        }

                        <Text style={styles.subTitle}>{nei.FirstName} {nei.LastName}</Text>
                        <Text style={styles.noteCenter}>{this.state.MatchRate}% התאמה</Text>

                        <Text style={styles.title}>פרטים כללים</Text>
                        <Text style={styles.note}>{gender} {age}, {nei.FamilyStatus}</Text>
                        <Text style={styles.note}>{nei.AboutMe}</Text>
                        <Text style={styles.note}>{jobName}, {nei.WorkPlace}</Text>
                        <Text style={styles.title}>תחומי עניין</Text>
                        <Text style={styles.note}>{intrests}</Text>
                        {/* {
                            nei.Intrests != null && nei.Intrests.map((int, i) => (
                                <Text style={styles.note}>{int.Subintrest}</Text>
                            ))
                        } */}
                        {nei.NumOfChildren > 0 &&
                            <View>
                                <Text style={styles.title}>ילדים</Text>
                                <Text style={styles.note}>{nei.NumOfChildren} ילדים</Text>
                                <View Style={styles.row}>
                                <Text style={styles.note}>גילאים: 
                                    {
                                        nei.Kids != null && nei.Kids.map((k, i) => (
                                            new Date().getFullYear() - k.YearOfBirth +", "
                                        ))
                                    } 
                                    </Text>
                                </View>
                            </View>
                        }
                       <View style={{padding:30}}>
                        <Button
                        buttonStyle={styles.sendButton} title={'שלח הודעה'} onPress={()=>navigation.navigate('Chat', {userCode:nei.UserId})}>
                        </Button>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "white",
    },
    sendButton: {
        borderRadius: 30,
        marginBottom: 0,
        width: '60%',
        alignSelf: 'center',
        backgroundColor: colors.turkiz,
        elevation: 4
    },
    avatar: {
        width: '53%',
        height: '30%',
        borderWidth: 1,
        borderColor: "white",
        alignSelf: "center",
        borderRadius: 160,
        marginTop: 5
    },
    screen: {
        flex: 1,
        backgroundColor: 'white'
    },
    note: {
        fontFamily: 'rubik-regular',
        marginVertical: 1,
        fontSize: 20,
        color: 'black',
        //justifyContent:"center",
        textAlign: "center",
        marginBottom: 5
    },
    noteCenter: {
        fontFamily: 'rubik-regular',
        marginVertical: 1,
        fontSize: 20,
        color: colors.subTitle,
        textAlign: "center",
        marginBottom: 5
    },
    subTitle: {
        fontFamily: 'rubik-regular',
        fontSize: 40,
        color: colors.subTitle,
        textAlign: 'center',

    },
    title: {
        fontFamily: 'rubik-regular',
        fontSize: 25,
        color: "#009999",
        marginTop: '5%',
        textAlign:"center"
    },

    image: {
        width: 30,
        height: 30,
        marginTop: 15,
        marginLeft: 15,
    },

    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    text: {
        fontFamily: 'rubik-regular', fontSize: 20, color: '#708090', marginTop: 10, marginBottom: 5

    },

    button: {
        width: '90%',
        paddingTop: 40,
        alignSelf: "center",

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
});
