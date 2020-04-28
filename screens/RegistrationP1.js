import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text, AsyncStorage } from 'react-native';
import Header from '../components/Header';
import colors from '../assets/constant/colors';
import BackButton from '../components/BackButton';

export default class RegistrationP1 extends Component {
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
    //בדיקה של פורמט האימייל
    checkEmailIsValid() {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        const Valid = expression.test(String(this.state.Email).toLowerCase())
       //console.log("valid result: ");
        //console.log(Valid);
        this.setState({ ValidEmail: Valid });
    }

    //בדיקה האם המייל קיים כבר בשרת
    checkUserEmailIsValid = () => {
        fetch('http://proj.ruppin.ac.il/bgroup1/prod/api/User/?username=' + this.state.Email, {
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
                    const email = this.state.Email;
                    const emailLower = email.toLowerCase();
                    let userDetails = {
                        Email: emailLower,
                        Password: this.state.Password
                    };

                    if (result === 0) {
                        AsyncStorage.setItem("user", JSON.stringify(userDetails))
                        this.props.navigation.navigate('RegistrationP2');
                    }
                    else Alert.alert("כבר קיים יוזר עם שם משתמש זה");
                },
                (error) => {
                    console.log("err post=", error);
                    Alert.alert("מצטערים, אנו נסו שנית!");
                }
            );
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


    render() {

        const { navigation } = this.props;

        return (

            <View style={styles.screen}>
                <Header />
                <BackButton goBack={() => navigation.navigate('RegistrationIntroduction')} />
                <View style={styles.container}>
                    <Text style={styles.subTitle} >
                        מה כתובת המייל שלך?
                   </Text>
                    <Text style={styles.note} >
                        השימוש בכתובת המייל הינו לצורכי המערכת בלבד ואינו נחשף לכלל המשתמשים
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

                    <Text style={styles.subTitle}  >
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
                            onPress={() => {
                                if (this.state.Email.trim() === "" || this.state.Password.trim() === "" || this.state.ConfirmedPassword.trim() === "") {
                                    this.setState(() => ({ feildsError: "אנא מלא/י את כל השדות לפני המעבר לעמוד הבא" }));
                                }
                                else if (this.state.ValidEmail && this.state.ValidPass && this.state.passError == "") {

                                    this.checkUserEmailIsValid();
                                }
                            }}
                            title={'המשך'}
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
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.subTitle,
        paddingTop: 25
    },
    note: {
        textAlign: "center",
        fontFamily: 'rubik-regular',
        marginVertical: 1,
        marginBottom: 10,
        fontSize: 14,
        color: 'black',
        paddingLeft:10,
        paddingRight:10
    },
    forgotPassword: {
        color: 'blue',
        textAlign: 'left'
    },
    button: {
        width: '80%',
        paddingTop: 20,
        
    },
    createUser: {
        padding: 30,
        flexDirection: 'row'
    },
    screen: {
        flex: 1,
        backgroundColor: colors.reeBackgrouond       
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
