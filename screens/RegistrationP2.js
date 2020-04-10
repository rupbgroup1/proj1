import React, { Component } from 'react';
import {Button, TextInput, View, StyleSheet, Text, Picker,AsyncStorage } from 'react-native';
import Header from '../components/Header';
import { SimpleLineIcons } from '@expo/vector-icons';
import GenderButton from '../components/GenderButton';
import colors from '../assets/constant/colors';
import { StackRouter } from 'react-navigation';
import CheckBox from 'react-native-check-box';


export default class RegistrationP2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userPrivateName: '',
            userLastName: '',
            nameIsPrivate: false,
            yearOfBirth: '2020',
            gender: 0,
            nameError: ''
        }; 
    }


    

    render() {
        const thisYear = (new Date()).getFullYear();
        const years = Array.from(new Array(100), (val, index) => (thisYear - index).toString());
        const { navigation } = this.props;
        return (

            <View style={styles.screen} >
                <Header />
                <View style={styles.container}>
                    <Text style={styles.subTitle} >
                        מה שמך?
                   </Text>
                    <Text style={styles.note} >
                        השימוש בשמך האמיתי יקל על חברים לזהות אותך.
                    </Text>
                    <TextInput
                        value={this.state.userPrivateName}
                        onChangeText={(userPrivateName) => this.setState({ userPrivateName })}
                        placeholder={'שם פרטי'}
                        style={styles.input}

                    />

                    <TextInput
                        value={this.state.userLastName}
                        onChangeText={(userLastName) => this.setState({ userLastName })}
                        placeholder={'שם משפחה'}
                        style={styles.input}
                    />
                    {!!this.state.nameError && (
                        <Text style={{ color: "red" }}>{this.state.nameError}</Text>
                    )}
                    
                    <Text style={styles.subTitle} >
                        מהי שנת הלידה שלך?
                    </Text>
                    <Text style={styles.note} >
                        ניתן לבחור בהמשך מי יראה את זה מהפרופיל שלך.
                    </Text>
                    <Picker
                        mode="dialog"
                        style={{ width: 55, backgroundColor: 'white', fontFamily: 'rubik-regular' }}
                        selectedValue={this.state.yearOfBirth}
                        onValueChange={(value) => this.setState({ yearOfBirth: value })}>
                        {years.map((item, index) => {
                            return (<Picker.Item label={item} value={item} key={index} />);
                        })}
                    </Picker>
                    <Text style={styles.subTitle} >
                        מהו מינך?
                   </Text>
                    <View style={styles.genderView}>
                        <GenderButton onPress={() => this.setState({ gender: 0 })}><SimpleLineIcons name="user" size={40} color="black" /></GenderButton>
                        <GenderButton onPress={() => this.setState({ gender: 1 })} ><SimpleLineIcons name="user-female" size={40} color="black" /></GenderButton>
                        <GenderButton onPress={() => this.setState({ gender: 2 })}><SimpleLineIcons name="user-follow" size={40} color="black" /></GenderButton>
                    </View>
                    <View style={styles.genderView}>
                        <Text style={
                            this.state.gender === 0 ? styles.genderNoteSelected : styles.genderNote} >גבר </Text>
                        <Text style={this.state.gender === 1 ? styles.genderNoteSelected : styles.genderNote}  >אישה </Text>
                        <Text style={this.state.gender === 2 ? styles.genderNoteSelected : styles.genderNote}  >אחר </Text>
                    </View>
                    <View style={styles.button}>
                        <Button
                            title={'המשך'} onPress={() => {
                                if (this.state.userPrivateName.trim() === "" || this.state.userLastName.trim() === "") {
                                    this.setState(() => ({ nameError: "אנא מלא/י שם פרטי ושם משפחה" }));
                                }
                                else {
                                    let userDetails={
                                        FirstName:this.state.userPrivateName,
                                        LastName:this.state.userLastName,
                                        Gender:this.state.gender,
                                        YearOfBirth:this.state.yearOfBirth

                                    }
                                AsyncStorage.mergeItem('user', JSON.stringify(userDetails));
                                this.props.navigation.navigate('Pic');
                                }
                                
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ecf0f1'
    },
    input: {
        fontFamily: 'rubik-regular',
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
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.subTitle,
        paddingTop: 25
    },
    note: {
        fontFamily: 'rubik-regular',
        marginVertical: 1,
        marginBottom: 10,
        fontSize: 14,
        color: 'black'
    },
    forgotPassword: {
        fontFamily: 'rubik-regular',
        color: 'blue',
        textAlign: 'left'
    },
    button: {
        fontFamily: 'rubik-regular',
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
        fontFamily: 'rubik-regular',
        fontWeight:'bold',
        marginVertical: 1,
        marginBottom: 10,
        fontSize: 20,
        color: colors.subTitle,
        marginRight: 35,
        marginLeft: 35,
        fontWeight: 'bold'
    }
});
