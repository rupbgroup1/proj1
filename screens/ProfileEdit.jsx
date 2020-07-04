import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text, AsyncStorage, Picker, TouchableOpacity, TouchableHighlightBase, Image } from 'react-native';
import Header from '../components/Header';
import colors from '../assets/constant/colors';
import { Input } from 'react-native-elements';
import Interests from '../components/Interests';
import { Dropdown } from 'react-native-material-dropdown';
import Autocomplete from 'react-native-autocomplete-input';
import { ScrollView } from 'react-native-gesture-handler';
import BackButton from '../components/BackButton';
import OurButton from '../components/OurButton';
import {
    SimpleLineIcons,
    FontAwesome5
} from '@expo/vector-icons';


export default class ProfileEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
            editing: false,

            fName: '',
            lName: '',
            aboutMe: null,
            familyStatus: '',
            image: '',
            intrests: [],
            nameJob: '',
            kidsYearOfBirth: [],
            
            yearOfBirth: '',
            gender: '',

            jobType: '',
            jobArea: '',
            numOfKids: 0,
            selectedYears: [],
            user: {},
            IntrestsArray: [],
            subInArray: [],
            mainI: '',
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
    }

    getUser() {
        //let userJSON = await AsyncStorage.getItem('user');
        //const userObj = await JSON.parse(userJSON);

        AsyncStorage.getItem('user', (ERR, userJSON) => {
            let userObj = JSON.parse(userJSON);
            //console.log("fromuser", userObj, "JSON", userJSON);
            let jobName = userObj.JobTitle!= null ? userObj.JobTitle.JobName : '';
            this.setState({
                user: userObj,
                jobName: jobName,
                jobArea: userObj.WorkPlace,
                aboutMe: userObj.AboutMe,
                familyStatus: userObj.FamilyStatus,
                numOfKids: userObj.NumOfChildren,
                kidsYearOfBirth: userObj.Kids,
                nameJob: jobName,
                initialInterest: userObj.Intrests,
                finished: true,

                
               
                image: userObj.Image,
                intrests: userObj.Intrests,
                yearOfBirth: userObj.YearOfBirth,

                vFName: userObj.FirstName,
                vLName: userObj.LastName,
                gender: userObj.Gender,
                JobName: jobName,
                jobType: userObj.JobTitle.JobCode

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
        //console.log(this.state.mainI);
        // console.log(this.state.searchName+this.state.user.CityName);
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
        this.setState({ NumOfKids: num });
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
            Intrests: this.state.choosenInterests,
            //להוסיף בשרת
            Gender:this.state.gender,
            YearOfBirth:this.state.yearOfBirth,
            FirstName: this.state.vFName,
            LastName: this.state.lName,

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
                        AsyncStorage.mergeItem('user', JSON.stringify(user),()=>
                        {
                            Alert.alert("הפרטים נשמרו בהצלחה");
                            this.props.navigation.navigate('MainPage');
                        }
                        );
                        
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
        // const intrests = this.state.intrests.map((buttonIntersts) => (
        //     <Text style={styles.note}>{buttonIntersts.Subintrest}   |   </Text>
        // ));
        //const intrests = intrests1.slice(0,-1);
        //const intrests = intrestsTemp;
        const intrests = this.state.intrests.map((buttonIntersts) => (
            buttonIntersts.Subintrest.slice(0, -1)));
        

        // להציג שנות לידה
        const kids = this.state.kidsYearOfBirth.map((buttonKids) => (
            <Text style={styles.note}> {new Date().getFullYear() - buttonKids.YearOfBirth}  </Text>
        ));

        const editing = this.state.editing;
        let age = new Date().getFullYear() - this.state.yearOfBirth;
        const thisYear = (new Date()).getFullYear();
        const years = Array.from(new Array(60), (val, index) => (thisYear - index).toString());
        const status = [{ label: 'רווק/ה' }, { label: 'נשוי/אה' }, { label: 'אלמן/ה' }, { label: 'גרוש/ה' }];

        //return the filtered array according the query from the input
        const jobs = this.findJob(this.state.query);
        const cities = this.findCity(this.state.queryCity);
        console.log(jobs);
        return (

            <View style={styles.screen} >
                <Header />
                <BackButton goBack={() => this.props.navigation.navigate('MainPage')} />



                <View style={styles.container}>

                    <TouchableOpacity
                        onPress={() => this.setState({ editing: !editing })}>
                        <Image
                            style={styles.image}
                            source={{ uri: 'https://icons-for-free.com/iconfiles/png/512/edit+document+edit+file+edited+editing+icon-1320191040211803620.png' }}

                        />
                    </TouchableOpacity>

                    {!this.state.editing && (
                        <View style={styles.screen}>
                            <Text style={styles.subTitle}>הפרופיל שלי</Text>
                            <Image style={styles.avatar}
                                source={{ uri: this.state.user.Imaged }} />

                            <View style={styles.center}>
                                <Text style={styles.note, { fontSize: 30, }}>{this.state.user.FirstName} {this.state.user.LastName}</Text>
                                <Text style={styles.note}>{this.state.user.FamilyStatus}, {age}</Text>
                                <Text style={styles.note}>{this.state.jobName}</Text>
                                <Text style={styles.note}> עובד/ת ב{this.state.user.WorkPlace}</Text>
                                <Text style={styles.title}>על עצמי</Text>
                                <Text style={styles.note}>{this.state.user.AboutMe}</Text>
                                <Text style={styles.title}>תחומי עניין</Text>
                                <Text style={styles.note}>{intrests}</Text>

                                <Text style={styles.title}>גילאי ילדים</Text>
                                <Text>{kids}</Text>

                            </View>
                        </View>
                    )}

                    {this.state.editing && (

                        <ScrollView style={styles.container}
                            keyboardShouldPersistTaps={"handled"}>


                            <Text style={styles.subTitle} >
                                עריכת פרופיל
                  </Text>

                            <Input
                                //שם פרטי 
                                value={this.state.vFName}
                                label='שם פרטי'
                                placeholder={this.state.vFName === null ? 'כתוב/י מספר..' : (this.state.vFName)}
                                onChangeText={(vFName) => this.setState({ vFName })}
                                multiline={true}
                                placeholderTextColor={'black'}
                                containerStyle={styles.inputContainerStyle}
                                inputStyle={styles.inputInputStyle}
                                labelStyle={styles.inputLabelStyle}

                            />

                            <Input
                                //שם משפחה 
                                value={this.state.vLName}
                                label='שם משפחה'
                                placeholder={this.state.vFName === null ? 'כתוב/י מספר..' : (this.state.aboutMe)}
                                onChangeText={(vLName) => this.setState({ vLName })}
                                multiline={true}
                                placeholderTextColor={'black'}
                                containerStyle={styles.inputContainerStyle}
                                inputStyle={styles.inputInputStyle}
                                labelStyle={styles.inputLabelStyle}

                            />

                            <Text style={styles.text} >מגדר</Text>
                            <View style={styles.genderView}>
                                <OurButton style={styles.genderButton} onPress={() => this.setState({ gender: 0 })}><SimpleLineIcons name="user" size={40} color="black" /></OurButton>
                                <OurButton style={styles.genderButton} onPress={() => this.setState({ gender: 1 })} ><SimpleLineIcons name="user-female" size={40} color="black" /></OurButton>
                                <OurButton style={styles.genderButton} onPress={() => this.setState({ gender: 2 })}><SimpleLineIcons name="user-follow" size={40} color="black" /></OurButton>
                            </View>
                            <View style={styles.genderView}>
                                <Text style={this.state.gender === 0 ? styles.genderNoteSelected : styles.genderNote} >גבר </Text>
                                <Text style={this.state.gender === 1 ? styles.genderNoteSelected : styles.genderNote}  >אישה </Text>
                                <Text style={this.state.gender === 2 ? styles.genderNoteSelected : styles.genderNote}  >אחר </Text>
                            </View>

                            <Text style={styles.text} >שנת לידה</Text>
                            <Picker
                                mode="dialog"
                                style={styles.picker}
                                selectedValue={this.state.YearOfBirth}
                                onValueChange={(value) => this.setState({ YearOfBirth: value })}>
                                {years.map((item, index) => {
                                    return (<Picker.Item label={item} value={item} key={index} />);
                                })}
                            </Picker>


                            <View style={styles.workPart}>
                                <Text style={styles.text}>מקצוע</Text>
                                <Autocomplete
                                    //מקצוע

                                    listContainerStyle={{ alignItems: "flex-start", alignItems: 'stretch' }}
                                    listStyle={{ position: "relative", borderColor: 'white', borderRadius: 8 }}
                                    inputContainerStyle={{ borderColor: colors.reeBackgrouond }}
                                    hideResults={this.state.hideResults}
                                    autoCorrect={false}
                                    defaultValue={this.state.query}
                                    //placeholder='הזנ/י מקצוע'
                                    placeholder={this.state.JobName !== null ? (this.state.nameJob) + "" : 'בחר/י תחום עבודה'}
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
                                <Text style={styles.text}>מקום עבודה</Text>
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
                                    placeholder={this.state.jobArea !== null ? (this.state.jobArea) + "" : 'בחר/י מקום עבודה'}
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
                                    itemTextStyle={{ textAlign: "right", fontFamily: 'rubik-regular' }}
                                    containerStyle={{ width: '90%' }}
                                    labelTextStyle={{ fontFamily: 'rubik-regular', textAlign: "center" }}
                                />
                            </View>

                            <Input
                                //קצת על עצמי 
                                value={this.state.aboutMe}
                                label='קצת על עצמי'
                                placeholder='הזנ/י עד 255 תווים אודות עצמך'
                                //placeholder={this.state.user.AboutMe !== null ? (this.state.user.AboutMe) + "" : 'כתוב/י מספר..'}
                                onChangeText={(aboutMe) => this.setState({ aboutMe })}
                                multiline={true}
                                placeholderTextColor={'#D1D3D4'}
                                containerStyle={{ padding: 10, alignItems: "center", fontFamily: 'rubik-regular', paddingLeft: '5%', paddingRight: '5%' }}
                                labelStyle={{ fontSize: 20, fontFamily: 'rubik-regular' }}
                                inputStyle={{ fontFamily: 'rubik-regular', textAlign: "right" }}

                            />
                            <Input
                                ///מספר ילדים
                                value={this.state.numOfKids}
                                label='מספר ילדים'
                                //placeholder='הזנ/י את מספר ילדיך'
                                placeholder={(this.state.user.numOfKids !== null) ? this.state.user.NumOfChildren + "" : 'כתוב/י מספר..'}
                                onChangeText={(numOfKids) => this.handleNumOfKids(numOfKids)}
                                multiline={true}
                                placeholderTextColor={'black'}
                                containerStyle={{ padding: 10, alignItems: "center", fontFamily: 'rubik-regular', paddingLeft: '5%', paddingRight: '5%' }}
                                labelStyle={{ fontSize: 20, fontFamily: 'rubik-regular', }}
                                inputStyle={{ fontFamily: 'rubik-regular', textAlign: "right" }}

                            />


                            {this.state.kidsYearOfBirth && <Text style={styles.text}>שנות לידה ילדים</Text>}
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

                            <Text style={styles.text}>
                                בחר/י תחומי עניין
                   </Text>
                            {this.state.finished &&
                                <Interests
                                    IntrestsArray={this.state.IntrestsArray}
                                    handleMainChange={(mainI) => this.handleMainChange(mainI)}
                                    subInArray={this.state.subInArray}
                                    callFetch={(iArray) => this.setState({ choosenInterests: iArray })}
                                    isMulti={true}
                                    initialInterest={this.state.initialInterest ? this.state.initialInterest : []}
                                />}

                            <View style={styles.row}>
                                <Button
                                    style={styles.item}
                                    title={'סיום'}
                                    onPress={() => this.fetchUpdateUser()}


                                />
                                <Button
                                    style={styles.item}
                                    title={'ביטול'} onPress={() => {
                                        this.setState({
                                            editing:false,
                                            vFName: this.state.fName,
                                            vLName: this.state.lName,
                                            vImage: this.state.image,
                                            vYearOfBirth: this.state.yearOfBirth,
                                            vGender: this.state.gender,
                                        })
                                    }}
                                />
                            </View>
                        </ScrollView>

                    )}








                </View>




            </View>




        );
    }
}

const styles = StyleSheet.create({


    avatar: {
        width: '50%',
        height: '30%',
        borderWidth: 4,
        borderColor: "white",
        alignSelf: "center",
        borderRadius: 160


    },
    screen: {
        flex: 1,
        backgroundColor: colors.reeBackgrouond
    },

    note: {
        fontFamily: 'rubik-regular',
        //marginVertical: 1,
        fontSize: 20,
        color: 'black',
        //justifyContent:"center",
        textAlign: "center",
        marginRight:5,
        marginLeft:5
    },

    subTitle: {
        fontFamily: 'rubik-regular',
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.subTitle,
        textAlign: "center",

    },

    title: {
        fontFamily: 'rubik-regular', fontSize: 25, color: "#009999", marginTop: '5%',
    },

    image: {
        width: 30, height: 30, marginTop: 15, marginLeft: 15,
    },

    container: {
        flex: 1,
        backgroundColor: colors.reeBackgrouond,
    },

    center: {
        alignItems: "center",
    },

    text: {
        fontFamily: 'rubik-regular', fontSize: 20, color: '#708090', marginTop: 10, marginBottom: 5, textAlign: "center"

    },

    genderView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'space-between',
        marginTop: 15,

    },

    genderButton:
    {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 30,
        marginRight: 15,
        marginLeft: 15
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
        fontFamily: 'rubik-regular',
        fontWeight: 'bold',
        marginVertical: 1,
        marginBottom: 10,
        fontSize: 20,
        color: colors.subTitle,
        marginRight: 35,
        marginLeft: 35,
        fontWeight: 'bold'
    },

    genderNoteSelected: {
        fontFamily: 'rubik-regular',
        fontWeight: 'bold',
        marginVertical: 1,
        marginBottom: 10,
        fontSize: 20,
        color: colors.subTitle,
        marginRight: 35,
        marginLeft: 35,
        fontWeight: 'bold'
    },

    picker: {
        width: 90,
        fontFamily: 'rubik-regular',
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: 'white',
        borderColor: 'gray',
        alignSelf: "center"
    },
    button: {
        width: '90%',
        paddingTop: 40,
        alignSelf: "center",

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: 10,
        height: 90,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginHorizontal: 5,

    },
    kidsYear: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: "center"
    },

    /* picker: {
        width: 90, 
        fontFamily: 'rubik-regular', 
        paddingHorizontal: 15,
        paddingVertical: 15, 
        backgroundColor: 'white', 
        borderColor: 'gray'
    },*/

    familyStatus: {
        fontFamily: 'rubik-regular',
        flexDirection: 'row',
        textAlign: "center",
        alignSelf: "center"
    },
    item: {
        flexDirection: 'row',
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
        borderRadius: 10,
    },

    workPart: {
        padding: 10, fontFamily: 'rubik-regular'
    },

    itemText: {
        fontSize: 15,
        margin: 2,
        color: 'black'
    },
    inputContainerStyle: {
        alignItems: "center", paddingLeft: '5%', paddingRight: '5%', padding: 10
    },

    inputInputStyle: {
        fontFamily: 'rubik-regular', textAlign: "right"
    },

    inputLabelStyle: {
        fontFamily: 'rubik-regular', fontSize: 20, color: '#708090'

    },
});
