import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text, AsyncStorage } from 'react-native';
import Header from '../components/Header';
import colors from '../assets/constant/colors';
import { Input } from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';
import OurButton from '../components/OurButton';
import { EvilIcons, FontAwesome5 } from '@expo/vector-icons';



export default class RegistrationExtra extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jobType: '',
            jobArea: '',
            aboutMe: '',
            familyStatus: '',
            numOfKids: '',
            kidsYearOfBirth: '',
            intresrs: '',
            acceptInvitations: true,
            selectedYears: [],
            user: {},
            IntrestsArray: []
        };

    }

    componentDidMount = () => {
        this.fetchGetAllIntrests();
        this.getUser();
    }

    async getUser() {
        let userJSON = await AsyncStorage.getItem('user');
        const userObj = await JSON.parse(userJSON);
        this.setState({ user: userObj })
    }

    onSelectedItemsChange = selectedYears => {
        this.setState({ selectedYears });
    }

    //fetch -get all intrests to search by
    fetchGetAllIntrests() {
        return fetch('http://proj.ruppin.ac.il/bgroup1/test1/tar1/api/Intrests', {

            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        })
            .then(res => {
                //console.log('res=', res);
                //console.log("in");
                //const statusCode = res.status;
                //console.log(statusCode);
                return res.json();
            })
            .then(
                (result) => {
                    this.setState({ IntrestsArray: result })
                },
                (error) => {
                    console.log("err post=", error);
                    Alert.alert("מצטערים, אנו נסו שנית!");
                }
            );
    }

    render() {
        const thisYear = (new Date()).getFullYear();
        const years = Array.from(new Array(60), (index, val) => (thisYear - index).toString());

        const { navigation } = this.props;
        return (

            <View style={styles.screen} >
                <Header />
                <View style={styles.container}>
                    <Text style={styles.subTitle} >
                        פרטים נוספים
                   </Text>
                    <Input
                        value={this.state.user.CityName}
                        label='תחום עבודה'
                        placeholder='הוספ/י'
                        onChangeText={(jobType) => this.setState({ jobType })}
                        containerStyle={{ width: '90%', padding: 10 }}
                        rightIcon={{}}
                    />
                    <Input
                        value={this.state.jobArea}
                        label='מקום עבודה'
                        placeholder='הוספ/י'
                        onChangeText={(jobArea) => this.setState({ jobArea })}
                        containerStyle={{ width: '90%', padding: 10 }}
                    />
                    <Input
                        value={this.state.aboutMe}
                        label='קצת על עצמי'
                        placeholder='כתוב/י תיאור..'
                        onChangeText={(aboutMe) => this.setState({ aboutMe })}
                        containerStyle={{ width: '90%', padding: 10 }}
                        multiline={true}
                    />
                    <Input
                        value={this.state.numOfKids}
                        label='מספר ילדים'
                        placeholder='0'
                        onChangeText={(numOfKids) => this.setState({ numOfKids })}
                        containerStyle={{ width: '90%', padding: 10 }}
                    />
                    {/* <MultiSelect
                        styleDropdownMenu
                        items={years}
                        uniqueKey="id"
                        //ref={(component) => { this.multiSelect = component }}
                        onSelectedItemsChange={this.onSelectedItemsChange}
                        selectedItems={this.state.selectedYears}
                        selectText="בחר שנים"
                        searchInputPlaceholderText="חפש שנת לידה"
                        onChangeInput={(text) => console.log(text)}
                        //altFontFamily="ProximaNova-Light"
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        displayKey="name"
                        searchInputStyle={{ color: '#CCC' }}
                        submitButtonColor="#CCC"
                        submitButtonText="Submit"
                    /> */}
                    <Text>
                        תחומי עניין
</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: "center", alignItems: "center" }}>
                        {this.state.IntrestsArray !== null && this.state.IntrestsArray.map((Interest, i) =>
                            <OurButton style={styles.intrestButtons}
                                title={Interest.IName} key={Interest.Id} onPress={() => this.fetchSearchNeiByInterest(Interest.Id)}>{Interest.MainInterest}<FontAwesome5 name={Interest.Icon} size={20} color={colors.rainbow[i]} /></OurButton>)}
                    </View>

                    <View style={styles.button}>
                        <Button
                            title={'המשך'} onPress={() => {
                                this.fetchPostNewUser()
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    intrestButtons: {
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 3,
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ecf0f1'
    },
    input: {
        width: '80%',
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: 10,
        textAlign: 'right',
        backgroundColor: 'white'
    },
    subTitle: {
        marginVertical: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.subTitle,
        paddingTop: 25
    },
    note: {
        marginVertical: 1,
        marginBottom: 10,
        fontSize: 14,
        color: 'black'
    },
    forgotPassword: {
        color: 'blue',
        textAlign: 'left'
    },
    button: {
        width: '50%',
        paddingTop: 20
    },
    createUser: {
        padding: 30,
        flexDirection: 'row'
    },
    screen: {
        flex: 1
    },
    checkbox: {
        flexDirection: 'row'
    },
    genderView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'space-between',
        marginTop: 15
    },
    genderNote: {
        marginVertical: 1,
        marginBottom: 10,
        fontSize: 14,
        color: 'black',
        marginRight: 35,
        marginLeft: 35
    },
    genderNoteSelected: {
        marginVertical: 1,
        marginBottom: 10,
        fontSize: 20,
        color: colors.subTitle,
        marginRight: 35,
        marginLeft: 35,
        fontWeight: 'bold'
    }
});
