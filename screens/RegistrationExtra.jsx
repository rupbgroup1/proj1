import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text, AsyncStorage, Picker, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import colors from '../assets/constant/colors';
import { Input } from 'react-native-elements';
import Interests from '../components/Interests';
import { Dropdown } from 'react-native-material-dropdown';
import Autocomplete from 'react-native-autocomplete-input';
import { ScrollView } from 'react-native-gesture-handler';


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
            hideResults:false,
            CityArray:[],
            hideCityResults:false,
            choosenInterests:[]
        };

    }

    componentDidMount = () => {
        this.fetchGetAllIntrests();
        this.getUser();
        this.fetchGetCity();
        this.fetchGetAllJobTitle();
    }

    async getUser() {
        let userJSON = await AsyncStorage.getItem('user');
        const userObj = await JSON.parse(userJSON);
        this.setState({ user: userObj});
    }

    onSelectedItemsChange = selectedYears => {
        this.setState({ selectedYears });
    }
    //this function starts when the user press on interest
    saveFunc(id) {
        //console.log(id);
        this.state.choosenInterests
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
        //console.log(this.state.mainI);
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
                    //console.log("fetch result= ", result[0]);
                    this.setState({ subInArray: result });

                },
                (error) => {
                    console.log("err post=", error);
                });

    }

    //fetch -get all JOB TITLE to search by - problem
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
        return fetch('http://proj.ruppin.ac.il/bgroup1/test1/tar1/api/City', {

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
        this.state.kidsYearOfBirth.length = 0;
        this.setState({ NumOfChildren: num });
        if (parseInt(num) > 0) {
            for (let index = 0; index < parseInt(num); index++) {
                this.state.kidsYearOfBirth.push({ Id: this.state.user.UserId, YearOfBirth: '' });
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
    
        const { CityArray} = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return CityArray.filter(city => city.CityName.search(regex) >= 0);
      }

      fetchUpdateUser(){
          const user={
            UserId:this.state.user.UserId,
            JobTitleId: this.state.jobType,
            WorkPlace: this.state.jobArea,
            FamilyStatus:this.state.familyStatus,
            NumOfChildren:this.state.numOfKids,
            AboutMe:this.state.aboutMe,
            Kids:this.state.kidsYearOfBirth,
            Intrests:this.state.choosenInterests
          }
          
        fetch('http://proj.ruppin.ac.il/bgroup1/test1/tar1/api/User/Extra', {
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
                    if (result === 1){
                    AsyncStorage.mergeItem('user', JSON.stringify(user));
                        this.props.navigation.navigate('MainPage');
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
        const status = [{
            id: 1,
            value: 'רווק/ה'
        }, {
            id: 2,
            value: 'נשוי/אה',
        }, {
            id: 3,
            value: 'אלמן/ה',
        } , {
            id: 4,
            value: 'גרוש/ה',
        }];

        const { navigation } = this.props;
        //return the filtered film array according the query from the input
        const jobs = this.findJob(this.state.query);
        const cities = this.findCity(this.state.queryCity);
        
        return (

            <View style={styles.screen} >
                <Header />
                <ScrollView style={styles.container} 
                keyboardShouldPersistTaps= {"always"}>
                    <Text style={styles.subTitle} >
                        פרטים נוספים
                   </Text>
                    
                    <View>
                    <Autocomplete
                        hideResults={this.state.hideResults}
                        autoCorrect={false}
                        defaultValue={this.state.query}
                        placeholder='בחר/י תחום עבודה'
                        data={jobs}
                        style={styles.autocompleteContainer}
                        onChangeText={text => this.setState({ query: text, hideResults:false })}
                        renderItem={({ item }) => (
                            //you can change the view you want to show in suggestion from here
                            <TouchableOpacity onPress={() => this.setState({ query: item.JobName, hideResults:true , jobType:item.JobCode})}>
                              <Text style={styles.itemText}>
                                {item.JobName} 
                              </Text>
                            </TouchableOpacity>
                          )}

                    />
                    </View>
                    <View>
                    <Autocomplete
                    
                        hideResults={this.state.hideCityResults}//close the results
                        autoCorrect={false}
                        defaultValue={this.state.queryCity}
                        placeholder='בחר/י מקום עבודה'
                        data={cities}
                        style={styles.autocompleteContainer}
                        onChangeText={text => this.setState({ queryCity: text, hideCityResults:false })}
                        renderItem={({ item }) => (
                            //the view
                            <TouchableOpacity onPress={() => this.setState({ queryCity: item.CityName, hideCityResults:true, jobArea:item.CityCode  })}>
                              <Text style={styles.itemText}>
                                {item.CityName} 
                              </Text>
                            </TouchableOpacity>
                          )}

                    />
                    </View>
                    
                    <View>
                        <Dropdown
                            label='סטטוס משפחתי'
                            //value={this.state.Name}
                            valueExtractor={({ id }) => id}
                            labelExtractor={({ value }) => value}
                            data={status}
                            selectedItemColor= {colors.subTitle}
                            onChangeText={(value) => {
                                this.setState({
                                    familyStatus: value
                                });
                                //console.log(this.state.familyStatus)
                            }}
                        />
                    </View>
                    
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
                        placeholder={this.state.user.NumOfChildren !== null ? (this.state.user.NumOfChildren) + "" : 'כתוב/י מספר..'}
                        onChangeText={(numOfKids) => this.handleNumOfKids(numOfKids)}
                        containerStyle={{ width: '90%', padding: 10 }}
                        placeholderTextColor={'black'}
                    />


                    {(this.state.kidsYearOfBirth.length > 0) && <Text>שנות לידה ילדים</Text>}
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
                                    kidsCopy[index].YearOfBirth = value;
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
                        callFetch={(iArray) => this.setState({choosenInterests:iArray})}
                        isMulti={true}
                    />

                    <View style={styles.button}>
                        <Button
                            title={'המשך'} onPress={() => {
                                this.fetchUpdateUser()
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
    itemText: {
        fontSize: 15,
        margin: 2,
        color:'black'
      },
    
    button: {
        width: '90%',
        paddingTop: 40,
       alignSelf:"center"
    },
    
    screen: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    }
   });
