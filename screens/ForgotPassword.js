import React, { Component, createElement } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text } from 'react-native';

import Header from '../components/Header';
import colors from '../assets/constant/colors';
import {
    SimpleLineIcons,
    FontAwesome5
} from '@expo/vector-icons';

import BackButton from '../components/BackButton';


export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Email: '',
            Password: '',
            ConfirmedPassword: '',
            ValidEmail: true,
            ValidPass: true,
            passError: '',

        };

    }
    //serach for the email in DB
    //בדיקה האם המייל קיים כבר בשרת
    checkUserEmailIsValid = () => {
        fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/User/?username=' + this.state.Email, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        })
            .then(res => {
                //console.log('res=', res);
                return res.json();
            })
            .then(
                (result) => {
                    //console.log("fetch= ", result);
                    
                    if (result === 0) {
                        Alert.alert("לא קיים במערכת יוזר עם מייל זה");
                    }
                },
                (error) => {
                    console.log("err post=", error);
                    Alert.alert("מצטערים, איראה שגיאה אנא נסה שנית");
                }
            );
    
    }

    //בדיקה של פורמט האימייל
    checkEmailIsValid() {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        const Valid = expression.test(String(this.state.Email).toLowerCase())
        this.setState({ ValidEmail: Valid });
    }
    

     //check password is valid - more than 6 digits
    checkPassIsValid() {
        if (this.state.Password.length < 6)
            this.setState({ ValidPass: false });
        else this.setState({ ValidPass: true });
    }
    //checks if the passwords are the same
    checkPass() {
        if (this.state.Password.trim() != this.state.ConfirmedPassword.trim()) {
            this.setState(() => ({ passError: "הסיסמאות אינן תואמות" }));
        }
        else this.setState(() => ({ passError: "" }));
        if (this.state.Password.trim() === this.state.ConfirmedPassword.trim()) {
            this.setState(() => ({ validatePassErr: "הסיסמאות תואמות" }));
        }
        else this.setState(() => ({ validatePassErr: "" }));
    }


    //PUT password in DB
   
    fetchPutUser = () => {

        const user = {
            Email: this.state.Email,
            Password: this.state.Password
        }
        fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/User/Pass', {
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

                        Alert.alert(
                            'שחזור סיסמה התבצע בהצלחה',
                            '',
                            [
                              {text: 'Ok', onPress: () => this.props.navigation.navigate('LoginScreen')},
                              ],
                           
                          );
                    }
                    
                        
                    else {
                       console.log("אנא נסה שנית");
                    }
                },
                (error) => {
                    console.log("err post=", error);
                    Alert.alert("אנא נסה שנית");
                }
            );

    }

   
    render() {

        const { navigation } = this.props;
        return (
            <View style={styles.screen}>
                <Header />
                <BackButton goBack={() => navigation.navigate('LoinScreen')} />
                <SimpleLineIcons style={{paddingTop:50, textAlign:"center"}} name="lock" size={40} color="black" />
                <Text style={styles.subTitle}>שחזור סיסמה</Text>
                <View style={styles.container}>
                    <Text style={styles.title} >
                        מה כתובת המייל שלך?
                   </Text>
                    <Text style={styles.note} >
                       יש להזין את כתובת המייל כדי לחפש את החשבון במאגר
                    </Text>
                    <TextInput
                        value={this.state.Email}
                        onChangeText={(Email) => this.setState({ Email })}
                        placeholder={'אימייל'}
                        style={styles.input}
                        keyboardType='email-address'
                        onEndEditing={() => this.checkEmailIsValid()}

                    />
                    {!this.state.ValidEmail && (
                        <Text style={{ color: "red" }}>כתובת המייל לא תקינה</Text>
                    )}

                    <Text style={styles.title} >
                        סיסמה
                   </Text>
                    <TextInput
                        value={this.state.Password}
                        onChangeText={(Password) => this.setState({ Password })}
                        placeholder={'סיסמה'}
                        style={styles.input}
                        secureTextEntry
                        keyboardType='visible-password'
                        onEndEditing={() => this.checkPassIsValid()}
                    />
                    {!this.state.ValidPass && (
                        <Text style={{ color: "red" }}>סיסמה לא תקינה!!</Text>
                    )}
                    <Text style={styles.note} >
                        הסיסמה תכיל לפחות 6 תווים
                    </Text>
                    <TextInput
                        value={this.state.ConfirmedPassword}
                        onChangeText={(ConfirmedPassword) => this.setState({ ConfirmedPassword })}
                        placeholder={'הזן שוב את הסיסמה לאישור'}
                        style={styles.input}
                        secureTextEntry
                        keyboardType='visible-password'
                        onEndEditing={() => this.checkPass()}
                    />

                    {!!this.state.passError && (
                        <Text style={{ color: "red" }}>{this.state.passError}</Text>
                    )}
                    {!!this.state.validatePassErr && (
                        <Text style={{ color: "green" }}>{this.state.validatePassErr}</Text>
                    )}
                    {!!this.state.feildsError && (
                        <Text style={{ color: "red" }}>{this.state.feildsError}</Text>
                    )}

                    <View style={styles.button}>
                        <Button
                            title={'שחזור'}
                            onPress={() => {
                                if (this.state.Email.trim() === "" || this.state.Password.trim() === "" || this.state.ConfirmedPassword.trim() === "") {
                                    this.setState(() => ({ feildsError: "אנא מלא/י את כל השדות לפני המעבר לעמוד הבא" }));
                                }
                                else if (this.state.ValidEmail && this.state.ValidPass && this.state.passError == "") {

                                    this.checkUserEmailIsValid();
                                    this.fetchPutUser();
                                }
                            }}

                                

                        />
                    </View>
                    </View>
                        
                

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.reeBackgrouond
        //backgroundColor: '#ecf0f1'
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
        backgroundColor: 'white',
        borderRadius:10
    },
    subTitle: {
        fontFamily: 'rubik-regular',
        marginVertical: 1,
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black',
        textAlign:"center"
    },
    title: {
        fontFamily: 'rubik-regular',
        marginVertical: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.subTitle,
        paddingTop: 25,
        textAlign:"center"
    },
    note: {
        textAlign: "center",
        fontFamily: 'rubik-regular',
        marginVertical: 1,
        marginBottom: 10,
        fontSize: 14,
        color: 'black'
    },
    button: {
        width: '80%',
        paddingTop: 20,
        
    },
    screen: {
        flex: 1,
        backgroundColor: colors.reeBackgrouond       
    },
    
    genderNote: {
        marginVertical: 1,
        marginBottom: 10,
        fontSize: 14,
        color: 'black',
        marginRight: 35,
        marginLeft: 35
    },

})
