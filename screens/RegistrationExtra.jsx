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
            hideResults:false,
            CityArray:[],
            hideCityResults:false,
            choosenInterests:[]
        };

    }

    componentDidMount = () => {
        this.getUser();
        this.fetchGetAllIntrests();
        this.fetchGetCity();
        this.fetchGetAllJobTitle();
        //console.log(this.state.kidsYearOfBirth);
        
    }

    async getUser() {
        let userJSON = await AsyncStorage.getItem('user');
        const userObj = await JSON.parse(userJSON);
        console.log("fromuser", userObj.Intrests);
        this.setState({ user: userObj,
            jobArea: userObj.WorkPlace,
            aboutMe:userObj.AboutMe,
            familyStatus:userObj.FamilyStatus,
            numOfKids:userObj.NumOfChildren,
            kidsYearOfBirth:userObj.Kids,
            nameJob:userObj.JobTitle.JobName, 
            initialInterest:userObj.Intrests, },()=>console.log(this.state.user));
     

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
        return fetch('http://proj.ruppin.ac.il/bgroup1/prod/api/Intrests', {

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
        return fetch('http://proj.ruppin.ac.il/bgroup1/prod/api/Intrests/Sub?mainI=' + this.state.mainI, {
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
        return fetch('http://proj.ruppin.ac.il/bgroup1/prod/api/JobTitle', {

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
        return fetch('http://proj.ruppin.ac.il/bgroup1/prod/api/City', {

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
          

          
        fetch('http://proj.ruppin.ac.il/bgroup1/prod/api/User/Extra', {
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
                    Alert.alert("הפרטים נשמרו בהצלחה");
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
        const status = [{label: 'רווק/ה'},{label: 'נשוי/אה'},{label: 'אלמן/ה'},{label: 'גרוש/ה'}];

        const { navigation } = this.props;
        //return the filtered array according the query from the input
        const jobs = this.findJob(this.state.query);
        const cities = this.findCity(this.state.queryCity);
        console.log(jobs);
        return (

            <View style={styles.screen} >
                <Header />
                <BackButton goBack={() => navigation.navigate('MainPage')}/>
                <ScrollView style={styles.container} 
                keyboardShouldPersistTaps= {"always"}>
                    <Text style={styles.subTitle} >
                        פרטים נוספים
                   </Text>
                    
                    <View style={{padding:10, fontFamily: 'rubik-regular'}}>
                        <Text  style={{textAlign:"center",  fontFamily: 'rubik-regular', fontSize:20, color:'#778899'}}>מקצוע</Text>
                    <Autocomplete
                    //תחום
                
                        //inputContainerStyle={{ alignItems:"flex-end"}}
                        listContainerStyle={{alignItems:"flex-start"}}
                        //listStyle={{position:"relative"}}
                        hideResults={this.state.hideResults}
                        autoCorrect={false}
                        defaultValue={this.state.query}
                        placeholder={this.state.JobName !== null ? (this.state.nameJob) + "" : 'בחר/י תחום עבודה' }
                        data={jobs}
                        style={styles.autocompleteContainer}
                        containerStyle={{}}
                        onChangeText={text => this.setState({ query: text, hideResults:false })}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.setState({ query: item.JobName, hideResults:true , jobType:item.JobCode, nameJob:item.JobName})}>
                              <Text style={styles.itemText}>
                                {item.JobName} 
                              </Text>
                            </TouchableOpacity>
                          )}

                    />
                    </View>
                    <View style={{padding:10, flex:1,zIndex:999, fontFamily: 'rubik-regular'}}> 
                    <Text  style={{textAlign:"center",  fontFamily: 'rubik-regular', fontSize:20, color:'#778899'}}>מקום עבודה</Text>
                    <Autocomplete
                    //מקום עבודה
                        listContainerStyle={{alignItems:"flex-start"}}
                        listStyle={{position:"relative"}}
                        data={cities}
                        hideResults={this.state.hideCityResults}//close the results
                        autoCorrect={false}
                        defaultValue={this.state.queryCity}
                        placeholder={this.state.jobArea !== null ? (this.state.jobArea) + "" : 'בחר/י מקום עבודה' }
                        style={styles.autocompleteContainer}
                        onChangeText={text => this.setState({ queryCity: text, hideCityResults:false })}
                        renderItem={({ item }) => (
                            //the view
                            <TouchableOpacity onPress={() => this.setState({ queryCity: item.CityName, hideCityResults:true, jobArea:item.CityName , CityName:item.CityName })}>
                              <Text style={styles.itemText}>
                                {item.CityName} 
                              </Text>
                            </TouchableOpacity>
                          )}

                    />
                    </View>
                    
                    <View style={{ fontFamily: 'rubik-regular', alignItems: 'center', justifyContent: 'center' }}>

                    <Dropdown
                            labelFontSize={20}
                            label='סטטוס משפחתי'
                            value={this.state.familyStatus}
                            valueExtractor={({ label }) => label}
                            //labelExtractor={({ label }) => label}
                            data={status}
                            selectedItemColor= {colors.subTitle}
                            onChangeText={(label) => {
                                this.setState({
                                    familyStatus: label
                                });
                                console.log("family=",this.state.familyStatus);
                            }}
                            itemTextStyle={{textAlign:"right", fontFamily: 'rubik-regular'}}
                            containerStyle={{ width: '90%' }}
                            labelTextStyle={{ fontFamily: 'rubik-regular', alignItem:"center", textAlign:"center"}}
                            
                            
                        />
                    </View>
                    
                    <Input
                    //קצת על עצמי 
                        value={this.state.aboutMe}
                        label='קצת על עצמי'
                        placeholder={this.state.user.AboutMe !== null ? (this.state.user.AboutMe) + "" : 'כתוב/י מספר..'}
                        onChangeText={(aboutMe) => this.setState({ aboutMe })}
                        containerStyle={{ width: '90%', padding: 10 }}
                        multiline={true}
                        placeholderTextColor={'black'}
                        containerStyle={{  padding: 10, alignItems:"center", textAlign:"right",  fontFamily: 'rubik-regular', fontSize:20, paddingLeft:'5%', paddingRight:'5%'}}
                        placeholderTextColor={'black'}
                        labelStyle={{fontSize:20,  fontFamily: 'rubik-regular',}}
                        inputStyle={{ fontFamily: 'rubik-regular', textAlign:"right"}}

                    />
                    <Input
                    ///מספר ילדים
                        value={this.state.numOfKids}
                        label='מספר ילדים'
                        placeholder={(this.state.user.NumOfChildren !== null ) ? (this.state.user.NumOfChildren) + "" : 'כתוב/י מספר..'}
                        onChangeText={(numOfKids) => this.handleNumOfKids(numOfKids)}
                        containerStyle={{ width: '90%', padding: 10 }}
                        multiline={true}
                        placeholderTextColor={'black'}
                        containerStyle={{  padding: 10,  alignItems:"center", textAlign:"right",  fontFamily: 'rubik-regular', fontSize:20, paddingLeft:'5%', paddingRight:'5%'}}
                        placeholderTextColor={'black'}
                        labelStyle={{fontSize:20,  fontFamily: 'rubik-regular',}}
                        inputStyle={{ fontFamily: 'rubik-regular', textAlign:"right"}}

                    />

                    {(this.state.kidsYearOfBirth.length > 0) && <Text style={{textAlign:"center",  fontFamily: 'rubik-regular', fontSize:20, paddingRight:'5%', color:'#778899',  alignItems:"center",}}>שנות לידה ילדים</Text>}
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignSelf:"center" }}>
                        {this.state.kidsYearOfBirth.length > 0 && this.state.kidsYearOfBirth.map((age, index) => {
                            return (<Picker
                                mode="dialog"
                                style={styles.picker}
                                //placeholder={this.state.kidsYearOfBirth[index]!==null?this.state.kidsYearOfBirth[index].YearOfBirth:"בחר שנת לידה"}
                                //placeholder="בחר שנת לידה"
                                selectedValue={this.state.kidsYearOfBirth[index].YearOfBirth}
                                onValueChange={(value) => {
                                    let kidsCopy = JSON.parse(JSON.stringify(this.state.kidsYearOfBirth));
                                    kidsCopy[index].YearOfBirth = value;
                                    this.setState({kidsYearOfBirth: kidsCopy});
                                }}>
                                {years.map((item, index) => {
                                    return (<Picker.Item label={item} value={item} key={index} />);
                                })}
                                
                            </Picker>)
                        }


                        )}


                            
                        
                        </View>

                    <Text style={{ padding: 10, alignItems:"center", textAlign:"center",  fontFamily: 'rubik-regular', fontSize:20, paddingRight:'5%', color:'#778899'}}>
                        בחר/י תחומי עניין
                    </Text>
                    <Interests
                        IntrestsArray={this.state.IntrestsArray}
                        handleMainChange={(mainI) => this.handleMainChange(mainI)}
                        subInArray={this.state.subInArray}
                        callFetch={(iArray) => this.setState({choosenInterests:iArray})}
                        isMulti={true}
                       // initialInterest={this.state.initialInterest}
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
        width: 90, fontFamily: 'rubik-regular', paddingHorizontal: 15,
        paddingVertical: 15, backgroundColor: 'white', borderColor: 'gray', 

    },
    autocompleteContainer: {
        backgroundColor: '#ffffff',
        borderWidth: 0,
        height:36,
        borderColor:'#ffffff',
        fontSize:20,
        textAlign:"right",
        fontFamily: 'rubik-regular',
        flex:1

        
        


        
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
        fontFamily: 'rubik-regular',
        marginVertical: 1,
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.subTitle,
        paddingTop: 25,
        textAlign:"center",

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