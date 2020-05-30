import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text, AsyncStorage, Picker, TouchableOpacity, TouchableHighlightBase } from 'react-native';
import Header from '../components/Header';
import colors from '../assets/constant/colors';
import { Input } from 'react-native-elements';
import Interests from '../components/Interests';
import { Dropdown } from 'react-native-material-dropdown';
import Autocomplete from 'react-native-autocomplete-input';
import { ScrollView } from 'react-native-gesture-handler';
import BackButton from '../components/BackButton';


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
            query: '',
            queryCity: '',
            hideResults: false,
            CityArray: [],
            hideCityResults: false,
            choosenInterests: [],
            finished: false,
        };

    }

    componentDidMount = () => {
        this.getUser();

        
        console.log(this.state.editing);

    }

    getUser() {
        AsyncStorage.getItem('user', (ERR, userJSON) => {
            let userObj = JSON.parse(userJSON);
            let jobName = userObj.JobTitle!= null ? userObj.JobTitle.JobName : '';
            console.log("fromuser", userObj, "JSON", userJSON);
            this.setState({
                user: userObj,
                jobArea: userObj.WorkPlace,
                aboutMe: userObj.AboutMe,
                familyStatus: userObj.FamilyStatus,
                numOfKids: userObj.NumOfChildren,
                kidsYearOfBirth: userObj.Kids,
                nameJob: jobName,
                initialInterest: userObj.Intrests,
                finished: true

            }, () => {
                this.fetchGetAllIntrests();
                this.fetchGetCity();
                this.fetchGetAllJobTitle();
            }
            );
        });
    }

    onSelectedItemsChange = selectedYears => {
        this.setState({ selectedYears });
    }

    //when main I is selected - this func fetch all the sub interests
    handleMainChange(mainI) {
        this.setState({ mainI: mainI }, () => {
            this.fetchSubInterest();
        });

    }

    //fetch -get all intrests to search by
    fetchGetAllIntrests() {
        return fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/Intrests', {

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
                    this.setState({ IntrestsArray: result })
                },
                (error) => {
                    console.log("err post=", error);
                    Alert.alert("מצטערים, אנו נסו שנית!");
                }
            );
    }

    fetchSubInterest = () => {
        return fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/Intrests/Sub?mainI=' + this.state.mainI, {
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
                    //console.log("fetch result= ", result[0]);
                    this.setState({ subInArray: result });

                },
                (error) => {
                    console.log("err post=", error);
                });

    }

    //fetch -get all JOB TITLE to search by - problem
    fetchGetAllJobTitle() {
        return fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/JobTitle', {

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
                    //console.log(result);

                },
                (error) => {
                    console.log("err post=", error);
                    Alert.alert("מצטערים, אנו נסו שנית!");
                }
            );
    }
    //fetch -getCity to search by - problem
    fetchGetCity() {
        return fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/City', {

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
                    //console.log(result);
                    this.setState({ CityArray: result })
                },
                (error) => {
                    console.log("err post=", error);
                    Alert.alert("מצטערים, אנו נסו שנית!");
                }
            );
    }

    //create array when num of kids 
    handleNumOfKids(num) {
        this.state.kidsYearOfBirth = [];
        this.setState({ numOfKids: num });
        if (parseInt(num) > 0) {
            for (let index = 0; index < parseInt(num); index++) {
                this.state.kidsYearOfBirth.push({ Id: this.state.user.UserId, YearOfBirth: 2020 });
            }
        }
    }

    //filter job array
    findJob(query) {
        if (query === '') {
            return [];
        }

        const { JobArray } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return JobArray.filter(job => job.JobName.search(regex) >= 0);
    }

    //filter city array
    findCity(query) {
        if (query === '') {
            return [];
        }

        const { CityArray } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return CityArray.filter(city => city.CityName.search(regex) >= 0);
    }

    fetchUpdateUser() {
        const user = {
            UserId: this.state.user.UserId,
            JobTitleId: this.state.jobType,
            WorkPlace: this.state.jobArea,
            FamilyStatus: this.state.familyStatus,
            NumOfChildren: this.state.numOfKids,
            AboutMe: this.state.aboutMe,
            Kids: this.state.kidsYearOfBirth,
            Intrests: this.state.choosenInterests

        }
        console.log("userFetch", user);


        fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/User/Extra', {
            method: 'PUT',
            body: JSON.stringify(user),
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
                    console.log("fetch POST= ", result);
                    if (result === 1) {
                        Alert.alert("הפרטים נשמרו בהצלחה");
                        AsyncStorage.mergeItem('user', JSON.stringify(user),()=>
                        this.props.navigation.navigate('MainPage'));
                    }
                    else {
                        Alert.alert("אנא נסו שנית");
                    }
                },
                (error) => {
                    console.log("err post=", error);
                    Alert.alert("אנא נסה שנית");
                }
            );
    }

    render() {
        
        const thisYear = (new Date()).getFullYear();
        const years = Array.from(new Array(60), (val, index) => (thisYear - index).toString());
        const status = [{ label: 'רווק/ה' }, { label: 'נשוי/אה' }, { label: 'אלמן/ה' }, { label: 'גרוש/ה' }];

        const { navigation } = this.props;
        //return the filtered array according the query from the input
        const jobs = this.findJob(this.state.query);
        const cities = this.findCity(this.state.queryCity);
        console.log(jobs);
        return (

            <View style={styles.screen} >
                <Header />
                <BackButton goBack={() => navigation.navigate('MainPage')} />
                <ScrollView style={styles.container}
                    keyboardShouldPersistTaps={"handled"}>
                        
                    
                    <Text style={styles.subTitle} >
                        פרטים נוספים
                   </Text>

                  
                    <Text style={{ textAlign: 'center' }}>
                        על מנת לשפר את חוזק הפרופיל, אנא מלא/י כמה שיותר פרטים
                   </Text>

                    <View style={styles.workPart}>
                        <Text style={styles.titles}>מקצוע</Text>
                        <Autocomplete
                            //מקצוע

                            listContainerStyle={{ alignItems: "flex-start", alignItems: 'stretch' }}
                            listStyle={{ position: "relative", borderColor: 'white', borderRadius: 8 }}
                            inputContainerStyle={{ borderColor: colors.reeBackgrouond }}
                            hideResults={this.state.hideResults}
                            autoCorrect={false}
                            defaultValue={this.state.query}
                            //placeholder='הזנ/י מקצוע'
                            placeholder={this.state.nameJob !== '' ? (this.state.nameJob) + "" : 'הזנ/י מקצוע'}
                            data={jobs}
                            style={styles.autoComplete}
                            onChangeText={text => this.setState({ query: text, hideResults: false })}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.list} onPress={() => this.setState({ query: item.JobName, hideResults: true, jobType: item.JobCode, nameJob: item.JobName })}>
                                    <Text style={styles.itemText}>
                                        {item.JobName}
                                    </Text>
                                </TouchableOpacity>
                            )}

                        />
                    </View>
                    <View style={styles.workPart}>
                        <Text style={styles.titles}>מקום עבודה</Text>
                        <Autocomplete
                            //מקום עבודה
                            listContainerStyle={{ alignItems: "flex-start", alignItems: 'stretch' }}
                            listStyle={{ position: "relative", borderColor: 'white', borderRadius: 8 }}
                            inputContainerStyle={{ borderColor: colors.reeBackgrouond }}
                            data={cities}
                            hideResults={this.state.hideCityResults}//close the results
                            autoCorrect={false}
                            defaultValue={this.state.queryCity}
                            //placeholder='הזנ/י את מיקום העבודה'
                            placeholder={this.state.jobArea !== undefined ? (this.state.jobArea) + "" : 'בחר/י את מיקום העבודה'}
                            style={styles.autoComplete}
                            onChangeText={text => this.setState({ queryCity: text, hideCityResults: false })}
                            renderItem={({ item }) => (
                                //the view
                                <TouchableOpacity onPress={() => this.setState({ queryCity: item.CityName, hideCityResults: true, jobArea: item.CityName, CityName: item.CityName })}>
                                    <Text style={styles.itemText}>
                                        {item.CityName}
                                    </Text>
                                </TouchableOpacity>
                            )}

                        />
                    </View>

                    <View style={styles.familyStatus}>

                        <Dropdown
                            labelFontSize={20}
                            label='סטטוס משפחתי'
                            value={this.state.familyStatus}
                            valueExtractor={({ label }) => label}
                            //labelExtractor={({ label }) => label}
                            data={status}
                            selectedItemColor={colors.subTitle}
                            onChangeText={(label) => {
                                this.setState({
                                    familyStatus: label
                                });
                                console.log("family=", this.state.familyStatus);
                            }}
                            itemTextStyle={{ textAlign: "center", fontFamily: 'rubik-regular' }}
                            containerStyle={{ width: '90%' }}
                            labelTextStyle={{ fontFamily: 'rubik-regular', textAlign: "center" }}
                        />
                    </View>

                    <Input
                        //קצת על עצמי 
                        value={this.state.aboutMe}
                        label='קצת על עצמי'
                        //placeholder='הזנ/י עד 255 תווים אודות עצמך'
                        placeholder={this.state.user.AboutMe !== undefined ? (this.state.user.AboutMe) + "" : 'הוסף/י תיאור..'}
                        onChangeText={(aboutMe) => this.setState({ aboutMe })}
                        multiline={true}
                        placeholderTextColor={'#D1D3D4'}
                        containerStyle={{ padding: 10, alignItems: "center", fontFamily: 'rubik-regular', paddingLeft: '5%', paddingRight: '5%' }}
                        labelStyle={{ fontSize: 20, fontFamily: 'rubik-regular' }}
                        inputStyle={{ fontFamily: 'rubik-regular', textAlign: "right", paddingTop:20 }}

                    />
                    <Input
                        ///מספר ילדים
                        value={this.state.numOfKids}
                        label='מספר ילדים'
                        //placeholder='הזנ/י את מספר ילדיך'
                        placeholder={(this.state.user.numOfKids !== undefined) ? (this.state.user.numOfKids) + "" : 'הזנ/י מספר..'}
                        onChangeText={(numOfKids) => this.handleNumOfKids(numOfKids)}
                        multiline={true}
                        placeholderTextColor={'black'}
                        containerStyle={{ padding: 10, alignItems: "center", fontFamily: 'rubik-regular', paddingLeft: '5%', paddingRight: '5%' }}
                        labelStyle={{ fontSize: 20, fontFamily: 'rubik-regular', }}
                        inputStyle={{ fontFamily: 'rubik-regular', textAlign: "right", paddingTop:20 }}

                    />


                    {this.state.kidsYearOfBirth && <Text style={styles.titles}>שנות לידה ילדים</Text>}
                    <View style={styles.kidsYear}>

                        {this.state.kidsYearOfBirth && this.state.kidsYearOfBirth.map((age, index) => {
                            return (<Picker //שנת לידה ילדים
                                mode="dialog"
                                style={styles.picker}
                                //placeholder={this.state.kidsYearOfBirth[index]!==null?this.state.kidsYearOfBirth[index].YearOfBirth:"בחר שנת לידה"}
                                //placeholder="בחר שנת לידה"
                                selectedValue={this.state.kidsYearOfBirth[index].YearOfBirth}
                                onValueChange={(value) => {
                                    let kidsCopy = JSON.parse(JSON.stringify(this.state.kidsYearOfBirth));
                                    kidsCopy[index].YearOfBirth = value;
                                    this.setState({ kidsYearOfBirth: kidsCopy });
                                }}>
                                {years.map((item, index) => {
                                    return (<Picker.Item label={item} value={item} key={index} />);
                                })}

                            </Picker>)
                        }
                        )}
                    </View>

                    <Text style={styles.titles}>
                        בחר/י תחומי עניין
                    </Text>
                    {this.state.finished &&
                        <Interests
                            IntrestsArray={this.state.IntrestsArray}
                            handleMainChange={(mainI) => this.handleMainChange(mainI)}
                            subInArray={this.state.subInArray}
                            callFetch={(iArray) => this.setState({ choosenInterests: iArray })}
                            isMulti={true}
                            clean
                            initialInterest={this.state.initialInterest ? this.state.initialInterest : []}
                        />}

                    <View style={styles.button}>
                        <Button
                            title={'המשך'} onPress={() => {
                                this.fetchUpdateUser()
                            }}
                        />
                    </View>
                </ScrollView>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: colors.reeBackgrouond
    },
    picker: {
        width: 90,
        fontFamily: 'rubik-regular',
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: 'white',
        borderColor: 'gray'
    },
    intrestButtons: {
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 3,
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    autoComplete: {
        fontFamily: 'rubik-regular',
        width: '100%',
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: 10,
        textAlign: 'right',
        backgroundColor: 'white',
        borderRadius: 10
    },
    subTitle: {
        fontFamily: 'rubik-regular',
        marginVertical: 1,
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.subTitle,
        paddingTop: 15,
        textAlign: "center",

    },
    itemText: {
        fontSize: 15,
        margin: 2,
        color: 'black'
    },

    button: {
        width: '90%',
        paddingBottom: 10,
        alignSelf: "center"
    },
    workPart: {
        padding: 10, fontFamily: 'rubik-regular'
    },
    titles: {
        textAlign: "center",
        fontFamily: 'rubik-regular',
        fontSize: 20,
        color: '#778899',
        paddingVertical: 10
    },
    familyStatus: {
        fontFamily: 'rubik-regular',
        alignItems: 'center',
        flexDirection: 'row-reverse',
        justifyContent: 'space-around'
    },
    kidsYear: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: "center"
    }

});