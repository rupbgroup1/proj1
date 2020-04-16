import React, { Component, createElement } from 'react';
import { Button, View, StyleSheet, Text, Image, TextInput } from 'react-native';
import Header from '../components/Header';
import colors from '../assets/constant/colors';
//import firebase from 'firebase';


export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userEmail: '',
            ValidEmail: true
        };
    }
    //serach for the email in DB
    //בדיקה האם המייל קיים כבר בשרת
    checkUserEmailIsValid = () => {
        fetch('http://proj.ruppin.ac.il/bgroup1/test1/tar1/api/User/?username=' + this.state.Email, {
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
                    else 
                    Alert.alert("מייל לשחזור סיסמה נשלח בהצלחה");
//send email function
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

    // handlePasswordReset = () => {
    //     const Email = this.state.userEmail;
    //     firebase.auth().sendPasswordResetEmail(Email)
    //     .then(function (user) {
    //       alert('Please check your email...')
    //     }).catch(function (e) {
    //       console.log(e)
    //     })
    // }
    render() {
        return (
            <View>
                <Header />
                <View style={styles.container}>
                    <Text style={styles.subTitle} >
                        הקליד/י את כתובת המייל ולינק ליצרת סיסמה יישלח אליך מיד
                </Text>

                    <TextInput
                        value={this.state.userEmail}
                        onChangeText={(userEmail) => {
                            this.setState({ userEmail })
                        }}
                        keyboardType='email-address'
                        onEndEditing={() => this.checkEmailIsValid()}
                        placeholder={'אימייל'}
                        style={styles.input}
                    />
                    {!this.state.ValidEmail && (
                        <Text style={{ color: "red" }}>כתובת המייל לא תקינה</Text>
                    )}


                    <View style={styles.button}>
                        <Button
                            title={'המשך'}
                        />
                    </View>
                </View>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    input: {
        fontFamily: 'rubik-regular',
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: '#F0F8FF',
        textAlign: 'right',
        backgroundColor: 'white',
        marginRight: '10%',
        marginLeft: '10%',
        marginTop: '15%'

    },
    subTitle: {
        fontFamily: 'rubik-regular',
        marginVertical: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.subTitle,
        paddingTop: 25,
        textAlign: "center",
        marginRight: '15%',
        marginLeft: '15%',
        marginTop: '30%',

    },
    container: {
        backgroundColor: colors.regBackground,
        height: '100%',
        width: '100%'

    },

    button: {
        fontFamily: 'Rubik-BoldItalic',
        marginTop: 5,
    }

})
