import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text, AsyncStorage, Picker } from 'react-native';
import Header from '../components/Header';
import colors from '../assets/constant/colors';
import { Input } from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';
import OurButton from '../components/OurButton';
import { EvilIcons, FontAwesome5 } from '@expo/vector-icons';
import Interests from '../components/Interests';
import { Dropdown } from 'react-native-material-dropdown';
//import Autocomplete from'react-native-autocomplete-input';
import { ScrollView } from 'react-native-gesture-handler';
//import InputAutoSuggest from 'react-native-autocomplete-search';



export default class RegistrationExtra extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jobType: '',
            jobArea: '',
            aboutMe: '',
            familyStatus: '',
            numOfKids: 0,
            intresrs: '',
            acceptInvitations: true,
            selectedYears: [],
            user: {},
            IntrestsArray: [],
            subInArray: [],
            mainI: '',
            kidsYearOfBirth: [],
            JobArray: [],
            query: ''
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
    //this function starts when the user press on interest
    saveFunc(id) {

        console.log(id);
        //need to write it..
    }
    //when main I is selected - this func fetch all the sub interests
    handleMainChange(mainI) {
        this.setState({ mainI: mainI }, () => {
            this.fetchSubInterest();
        });

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

    fetchSubInterest = () => {
        console.log(this.state.mainI);
        // console.log(this.state.searchName+this.state.user.CityName);
        return fetch('http://proj.ruppin.ac.il/bgroup1/test1/tar1/api/Intrests/Sub?mainI=' + this.state.mainI, {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8'
            })
        })
            .then(res => {
                return res.json();
            })

            .then(
                (result) => {
                    console.log("fetch result= ", result[0]);
                    this.setState({ subInArray: result });
                    console.log("2");
                },
                (error) => {
                    console.log("err post=", error);
                });

    }
    //fetch -get all JOB TITLE to search by
    fetchGetAllJobTitle() {
        return fetch('http://proj.ruppin.ac.il/bgroup1/test1/tar1/api/JobTitle', {

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
                    this.setState({ JobArray: result })
                },
                (error) => {
                    console.log("err post=", error);
                    Alert.alert("מצטערים, אנו נסו שנית!");
                }
            );
    }

    //create array when num of kids 
    handleNumOfKids(num) {
        this.state.kidsYearOfBirth.length=0;
        this.setState({NumOfChildren:num});
        if (parseInt(num) > 0) {
            for (let index = 0; index < parseInt(num); index++) {
                this.state.kidsYearOfBirth.push({ id: (index + 1), year: '' });
            }
        }
    }

    


    render() {
        const thisYear = (new Date()).getFullYear();
        const years = Array.from(new Array(60), (val, index) => (thisYear - index).toString());
        const status = [{
            id: 1,
            value: 'רווק/ה'
        }, {
            id: 2,
            value: '/אהנשוי',
        }, {
            id: 3,
            value: 'אלמן/ה',
        }
            , {
            id: 4,
            value: 'גרוש/ה',
        }];
        const { navigation } = this.props;
        return (

            <View style={styles.screen} >
                <Header />
                <ScrollView style={styles.container}>
                    <Text style={styles.subTitle} >
                        פרטים נוספים
                   </Text>
                    {/* <View style={{ fontFamily: 'rubik-regular' }}>
                        {/* <Dropdown
                        labelFontSize='20'
                        fontSize='20'
                        itemTextStyle={{ textAlign: "right" }}
                        containerStyle={{ width: '90%', marginLeft: '5%', marginRight: '5%', fontFamily: 'rubik-regular' }}
                        labelTextStyle={{ marginLeft: '70%', fontFamily: 'rubik-regular' }}
                        label='מצב משפחתי'
                        data={status}
                        onChangeText={() => this.setState({ familyStatus: this.props.familyStatus })}


                    /> */}

                    {/* </View> */}

                    {/* <ScrollView> */}
                    {/* <Autocomplete
                autoCorrect={false}
                defaultValue={this.state.query}
                placeholder='הוספ/י'
                data={this.state.JobArray}
                onChangeText={text => this.setState({ query: text })}
                renderItem={({ job }) => (
                    <TouchableOpacity onPress={() => this.setState({ query: job })}>
                      <Text style={styles.itemText}>
                         {job}
                      </Text>
                    </TouchableOpacity>
                  )}
    
    /> */}
                    {/* </ScrollView> */}



                    <Input
                        value={this.state.user.JobTitleId}
                        label='תחום עבודה'
                        placeholder={this.state.user.JobTitleId + ""}
                        onChangeText={(jobType) => this.setState({ jobType })}
                        containerStyle={{ width: '90%', padding: 10 }}
                        placeholderTextColor={'black'}
                    />
                    <Input
                        value={this.state.jobArea}
                        label='מקום עבודה'
                        placeholder={this.state.user.WorkPlace !== null ? this.state.user.WorkPlace : 'הוספ/י'}
                        onChangeText={(jobArea) => this.setState({ jobArea })}
                        containerStyle={{ width: '90%', padding: 10 }}
                        placeholderTextColor={'black'}
                    />
                    <Input
                        value={this.state.aboutMe}
                        label='קצת על עצמי'
                        placeholder={this.state.user.AboutMe !== null ? this.state.user.AboutMe : 'כתוב/י תיאור..'}
                        onChangeText={(aboutMe) => this.setState({ aboutMe })}
                        containerStyle={{ width: '90%', padding: 10 }}
                        multiline={true}
                        placeholderTextColor={'black'}
                    />
                    <Input
                        value={this.state.numOfKids}
                        label='מספר ילדים'
                        placeholder={this.state.user.NumOfChildren !== null ? (this.state.user.NumOfChildren)+"" : 'כתוב/י מספר..'}
                        onChangeText={(numOfKids) => this.handleNumOfKids(numOfKids)}
                        containerStyle={{ width: '90%', padding: 10 }}
                        placeholderTextColor={'black'}
                    />

 
                    {(this.state.kidsYearOfBirth.length > 0)&& <Text>שנות לידה ילדים</Text>}
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {this.state.kidsYearOfBirth.length > 0 && this.state.kidsYearOfBirth.map((age, index) => {
                            return (<Picker
                                mode="dialog"
                                style={styles.picker}
                                //placeholder={this.state.kidsYearOfBirth[index]!==null?this.state.kidsYearOfBirth[index]:"בחר שנת לידה"}
                                placeholder="בחר שנת לידה"
                                selectedValue={this.state.kidsYearOfBirth[index]}
                                onValueChange={(value) => {
                                    let kidsCopy = JSON.parse(JSON.stringify(this.state.kidsYearOfBirth));
                                    kidsCopy[index]=value;
                                    this.setState({ kidsYearOfBirth: kidsCopy });
                                    }}>
                                {years.map((item, index) => {
                                    return (<Picker.Item label={item} value={item} key={index} />);
                                })}
                            </Picker>)
                        }


                        )}</View>

                    <Text>
                        בחר/י תחומי עניין
                    </Text>
                    <Interests
                        IntrestsArray={this.state.IntrestsArray}
                        handleMainChange={(mainI) => this.handleMainChange(mainI)}
                        subInArray={this.state.subInArray}
                        callFetch={(id) => this.saveFunc(id)}
                    />

                    <View style={styles.button}>
                        <Button
                            title={'המשך'} onPress={() => {
                                this.fetchPostNewUser()
                            }}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    picker: {
        width: 55, fontFamily: 'rubik-regular', paddingHorizontal: 15,
        paddingVertical: 15, backgroundColor: 'white'
    },
    autocompleteContainer: {
        backgroundColor: '#ffffff',
        borderWidth: 0,
    },
    intrestButtons: {
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 3,
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    container: {
       // flex: 1,
        //justifyContent: 'space-between',
    //alignItems: 'center',
        backgroundColor: colors.reeBackgrouond
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
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
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
