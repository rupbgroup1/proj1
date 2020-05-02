import React, { Component, createElement } from 'react';
import { Button, View, StyleSheet, Text,  Image , Alert, AsyncStorage , TouchableOpacity, Picker, SafeAreaView} from 'react-native';
import Header from '../components/Header';
import colors from '../assets/constant/colors';
import BackButton from '../components/BackButton';
import { Input } from 'react-native-elements';
import OurButton from '../components/OurButton';
import Autocomplete from 'react-native-autocomplete-input';
import { Dropdown } from 'react-native-material-dropdown';
import {
    SimpleLineIcons,
    FontAwesome5
} from '@expo/vector-icons';

import { ScrollView } from 'react-native-gesture-handler';


export default class Profile extends Component {
    
    constructor(props) {
        super (props);
        this.state = {
            //משתנים להצגת הפרופיל
            editing: true,
            query: '',
            hideResults: false,
            fName:'',
            aboutMe:null,
            cityName:'',
            familyStatus:'',
            image:'',
            intrests:[],
            nameJob:'',
            kidsYearOfBirth:[],
            lName:'',
            jobArea:'',
            yearOfBirth:'',
            gender:'',
            //משתנים לעריכת פרופיל
            valFamilyStatus:'',
            valGender:'',
            neighborhoodName:'',
            vAboutMe:null,
            numOfKids:0,
            


            //משתנים לתחום ומקום עבודה
            JobArray: [],
            query: '',
            queryCity: '',
            hideResults: false,
            CityArray: [],
            hideCityResults: false,
            choosenInterests: []
        }




    }

    componentDidMount = () => {
        this.getUser();
    }

    getUser(){
       AsyncStorage.getItem('user', (ERR,userJSON)=>
        //console.log("fromuser", userObj.Intrests);
        {
            let userObj= JSON.parse(userJSON);
            console.log("fromuser", userObj, "JSON", userJSON);
            this.setState({ user: userObj,
            fName:userObj.FirstName,
            aboutMe: userObj.AboutMe,
            cityName: userObj.CityName,
            neighborhoodName:userObj.NeighborhoodName,
            familyStatus: userObj.FamilyStatus,
            image: userObj.Image,
            intrests: userObj.Intrests,
            nameJob:userObj.JobTitle.JobName,
            kidsYearOfBirth:userObj.Kids, 
            lName: userObj.LastName,
            jobArea: userObj.WorkPlace,
            yearOfBirth: userObj.YearOfBirth,
            gender: userObj.Gender,

            vFName:userObj.FirstName,
            vLName: userObj.LastName,
            vImage: userObj.Image,
            vYearOfBirth: userObj.YearOfBirth,
            vGender: userObj.Gender,    
        })
    }) 
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
    
//עדכון יוזר
    fetchUpdateUser() {
        this.setState({
            fName: this.state.vFName,
            lName: this.state.vLName,
            gender: this.state.vGender,
            yearOfBirth: this.state.vYearOfBirth
        })

        const user = {
            UserId: this.state.user.UserId,
            FirstName: this.state.fName,
            LastName: this.state.lName,
            Gender: this.state.gender,
            YearOfBirth: this.state.yearOfBirth,
            JobTitleId: this.state.jobType,
            WorkPlace: this.state.jobArea,
            FamilyStatus: this.state.familyStatus,
            NumOfChildren: this.state.numOfKids,
            AboutMe: this.state.aboutMe,
            Kids: this.state.kidsYearOfBirth,
            Intrests: this.state.choosenInterests

        }
        console.log("userFetch",user);


        fetch('http://proj.ruppin.ac.il/bgroup1/prod/api/User/PUT', {
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


    render(){
        //עריכה/לא עריכה
        const editing = this.state.editing;
        //להציג תחומי עניין
        const intrests = this.state.intrests.map((buttonIntersts) =>(
            <Text style={styles.note}>{buttonIntersts.Subintrest} </Text>
        ));
        // להציג שנות לידה
        const kids = this.state.kidsYearOfBirth.map((buttonKids) =>(
            <Text style={styles.note}>{buttonKids.YearOfBirth} </Text>
        ));
        // להציג שנים 
        const thisYear = (new Date()).getFullYear();
        const years = Array.from(new Array(60), (val, index) => (thisYear - index).toString());
        
        const status = [{ label: 'רווק/ה' }, { label: 'נשוי/אה' }, { label: 'אלמן/ה' }, { label: 'גרוש/ה' }];

        //תחום עבודה ומקום עבודה
        const jobs = this.findJob(this.state.query);
        const cities = this.findCity(this.state.queryCity);
       
        return(
            
        <View style={styles.screen} >
            <Header />
            <BackButton goBack={() => this.props.navigation.navigate('MainPage')} />

            

            <View style={styles.container}>

                <TouchableOpacity
                onPress = {()=> this.setState({editing:!editing})}>
                <Image
          style={styles.image}
          source={{uri: 'https://icons-for-free.com/iconfiles/png/512/edit+document+edit+file+edited+editing+icon-1320191040211803620.png'}}
         
                /> 
                </TouchableOpacity>

            {!this.state.editing && (
                    <View style={styles.screen}>
                        <Text style={styles.subTitle}>הפרופיל שלי</Text>
                        <Image style={styles.avatar}
                                source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>

                        <View style={styles.center}>
                            <Text style={styles.note,{fontSize:30,}}>{this.state.fName} {this.state.lName}</Text>
                            <Text style={styles.note}>{this.state.familyStatus}, {this.state.yearOfBirth}</Text>
                            <Text style={styles.note}>{this.state.nameJob}, {this.state.jobArea}</Text>
                            <Text style={styles.title}>על עצמי</Text>
                            <Text style={styles.note}>{this.state.aboutMe}</Text>
                            <Text style={styles.title}>תחומי עניין</Text>
                            <Text>{intrests}</Text>
                            
                            <Text style={styles.title}>ילדים</Text>
                            <Text>{kids}</Text>

                        </View>
                    </View>
            )}


            {this.state.editing && (
                 <View style={styles.screen}>
                     <ScrollView >
                   <Text style={styles.subTitle}>עריכת פרופיל</Text>
                   
                   <View style={{alignItems:"center"}}>
                   <Text style={styles.text}>מקצוע</Text>

                   <View style={styles.workPart}>
                        
                        <Autocomplete
                            //מקצוע

                            listContainerStyle={{ alignItems: "flex-start", alignItems:'stretch' }}
                            listStyle={{position:"relative", borderColor:'white', borderRadius:8,  alignItems:'stretch' }}
                            inputContainerStyle={{borderColor:colors.reeBackgrouond}}
                            hideResults={this.state.hideResults}
                            autoCorrect={false}
                            defaultValue={this.state.query}
                            placeholder='הזנ/י מקצוע'
                            //placeholder={this.state.JobName !== null ? (this.state.nameJob) + "" : 'בחר/י תחום עבודה'}
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

                   <Input
                    //שם פרטי 
                        value={this.state.vFName}
                        label='שם פרטי'
                        placeholder={this.state.vFName === null ? 'כתוב/י מספר..'  : (this.state.vFName)}
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
                        placeholder={this.state.vFName === null ? 'כתוב/י מספר..'  : (this.state.aboutMe)}
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
                        selectedValue={this.state.vYearOfBirth}
                        onValueChange={(value) => this.setState({ vYearOfBirth: value })}>
                        {years.map((item, index) => {
                            return (<Picker.Item label={item} value={item} key={index} />);
                        })}
                    </Picker>

                    

                    <Input
                    //קצת על עצמי 
                        value={this.state.vAboutMe}
                        label='קצת על עצמי'
                        placeholder={this.state.vAboutMe === null ? 'כתוב/י מספר..'  : (this.state.aboutMe)}
                        onChangeText={(vAboutMe) => this.setState({ vAboutMe })}
                        multiline={true}
                        placeholderTextColor={'black'}
                        containerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputInputStyle}
                        labelStyle={styles.inputLabelStyle}

                    
                    />
                     
                    
                     <View style={styles.familyStatus}>
                        <Dropdown
                        //סטטוס משפחתי
                            labelFontSize={20}
                            label='סטטוס משפחתי'
                            value={this.state.vFamilyStatus}
                            valueExtractor={({ label }) => label}
                            //labelExtractor={({ label }) => label}
                            data={status}
                            selectedItemColor={colors.subTitle}
                            onChangeText={(label) => {
                                this.setState({
                                vFamilyStatus: label
                            });
                            console.log("family=", this.state.vFamilyStatus);
                            }}
                            itemTextStyle={styles.DropdownitemTextStyle}
                            containerStyle={styles.DropdowncontainerStyle}
                            labelTextStyle={styles.DropdownlabelTextStyle}
                        />
                    </View>

                    <Input
                        ///מספר ילדים
                        value={this.state.numOfKids}
                        label='מספר ילדים'
                        placeholder='הזנ/י את מספר ילדיך'
                        //placeholder={(this.state.user.NumOfChildren !== null) ? (this.state.user.NumOfChildren) + "" : 'כתוב/י מספר..'}
                        onChangeText={(numOfKids) => this.handleNumOfKids(numOfKids)}
                        multiline={true}
                        placeholderTextColor={'black'}
                        containerStyle={styles.inputContainerStyle}
                        labelStyle={styles.inputLabelStyle}
                        inputStyle={styles.inputInputStyle}

                    />

{(this.state.kidsYearOfBirth.length > 0) && <Text style={styles.text}>שנות לידה ילדים</Text>}
                    <View style={styles.kidsYear}>
                        
                        {this.state.kidsYearOfBirth.length > 0 && this.state.kidsYearOfBirth.map((age, index) => {
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

                    <View style={styles.row}>
                        <Button
                            style={styles.item}
                            title={'סיום'} 
                        />
                        <Button
                          style={styles.item}
                            title={'ביטול'} onPress={() => {
                                this.setState({
                                    vFName: this.state.fName,
                                    vLName: this.state.lName,
                                    vImage: this.state.image,
                                    vYearOfBirth: this.state.yearOfBirth,
                                    vGender: this.state.gender,    
                                })
                            }}
                        />
                    </View>


                 



                    
                    

                    
                    
                </View>


                       

                     



                        
                    
                </ScrollView>
                     </View>
                
            )}


                


            </View>




        </View>




        );
    }
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#DCDCDC",
      },
      headerContent:{
        padding:30,
        alignItems: 'center',
      },
      avatar: {
        width: '50%',
        height: '30%',
        borderWidth: 4,
        borderColor: "white",
        alignSelf:"center",
        borderRadius: 160

        
      }, 
      screen: {
        flex: 1,
        backgroundColor: colors.reeBackgrouond
    },

    note: {
        fontFamily: 'rubik-regular',
        marginVertical: 1,
        fontSize: 20,
        color: 'black', 
        //justifyContent:"center",
        textAlign:"center"
    },

    subTitle: {
        fontFamily: 'rubik-regular',
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.subTitle,
        textAlign:"center",

    },

    title:{
        fontFamily: 'rubik-regular', fontSize:25, color:"#009999", marginTop:'5%',
    },

    image:{
        width: 30, height:30, marginTop:15, marginLeft:15,
    },

    container: {
        flex: 1,
       backgroundColor: colors.reeBackgrouond
   },

   center:{
       alignItems:"center"
   },


    inputContainerStyle :{
        alignItems:"center", paddingLeft:'5%', paddingRight:'5%',  width: '90%', padding: 10
    },

    inputInputStyle:{
        fontFamily: 'rubik-regular', textAlign:"right"
    },

    inputLabelStyle:{
        fontFamily: 'rubik-regular', fontSize:20, color:'#708090'

    },

    text:{
        fontFamily: 'rubik-regular', fontSize:20, color: '#708090', marginTop:10, marginBottom:5

    },

    genderView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'space-between',
        marginTop: 15,

    },

    genderButton:
    {
        backgroundColor:'white',
        paddingHorizontal: 15,
        paddingVertical:15,
        borderRadius: 30,
        marginRight:15,
        marginLeft:15
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
        borderColor: 'gray'
    },
    button: {
        width: '90%',
        paddingTop: 40,
        alignSelf: "center",
        
    },
    row: {
        flexDirection: 'row',
        justifyContent:'space-between',
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

     picker: {
        width: 90, 
        fontFamily: 'rubik-regular', 
        paddingHorizontal: 15,
        paddingVertical: 15, 
        backgroundColor: 'white', 
        borderColor: 'gray'
    },

    familyStatus:{
        fontFamily: 'rubik-regular',
        flexDirection: 'row', 
        textAlign:"center",
    },
    item:{
        flexDirection : 'row',
      },

      DropdownitemTextStyle :{
        textAlign: "center", fontFamily: 'rubik-regular' 

    },

    DropdowncontainerStyle:{
        width: '80%',

    },

    DropdownlabelTextStyle:{
        fontFamily: 'rubik-regular', textAlign:"center", color: '#708090', alignSelf:"center"
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
        borderRadius:10, 
    },

    workPart: { 
        padding: 10, fontFamily: 'rubik-regular' 
    },
  });