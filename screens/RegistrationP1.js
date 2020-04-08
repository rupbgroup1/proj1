import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text } from 'react-native';
import Header from '../components/Header';
import colors from '../assets/constant/colors';

export default class RegistrationP1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Email:'',
            Password:'',
            ConfirmedPassword:''

        };

    }

    //בדיקה האם המייל קיים כבר בשרת
    checkUserEmailIsValid=()=> {
        fetch('http://proj.ruppin.ac.il/bgroup1/test1/tar1/api/User/?username='+this.state.Email, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        })
        .then(res => {
            console.log('res=', res);
            return res.json();
        })
        .then(
            (result) => {
                console.log("fetch= ", result);
                result===0 ? this.props.navigation.navigate('RegistrationP2', {Email:this.state.Email, Password:this.state.Password}) : Alert.alert("כבר קיים יוזר עם שם משתמש זה");
                

            },
            (error) => {
                console.log("err post=", error);
            }
        );
    }


    render() {

        const {navigation} = this.props;
       
        return (
            
            <View style={styles.screen}>
              <Header />
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
                    />
                     <Text style={styles.subTitle} >
                      סיסמה
                   </Text>
                    <TextInput
                        value={this.state.Password}
                        onChangeText={(Password) => this.setState({ Password })}
                        placeholder={'סיסמה'}
                        style={styles.input}
                        secureTextEntry
                    />
                    <Text style={styles.note} >
                     הסיסמה תכיל לפחות 6 תווים
                    </Text>
                    <TextInput
                        value={this.state.ConfirmedPassword}
                        onChangeText={(ConfirmedPassword) => this.setState({ ConfirmedPassword })}
                        placeholder={'הזן שוב את הסיסמה לאישור'}
                        style={styles.input}
                        secureTextEntry
                    />
                    {!!this.state.feildsError && (
                        <Text style={{ color: "red" }}>{this.state.feildsError}</Text>
                    )}
                    {!!this.state.passError && (
                        <Text style={{ color: "red" }}>{this.state.passError}</Text>
                    )}
                    {!!this.state.validatePassErr && (
                        <Text style={{ color: "green" }}>{this.state.validatePassErr}</Text>
                    )}
                    {/* {this.state.Password == this.state.ConfirmedPassword || this.state.Password != null || this.state.ConfirmedPassword != null ?
                    <Text style={{ paddingTop: 3, color:'green' }}>הסיסמה מאושרת</Text> : null} */}

                    <View style={styles.button}>
                        <Button onPress={() => {
                            if (this.state.Email.trim() === "" || this.state.Password.trim() === "" || this.state.ConfirmedPassword.trim() === "") {
                                this.setState(() => ({ feildsError: "שדות אלו הינם שדות חובה" }));
                            }
                            else if (this.state.Password.trim() != this.state.ConfirmedPassword.trim()) {
                                this.setState(() => ({ passError: "הסיסמאות אינן תואמות" }));
                            }
                            else if (this.state.Password.trim() === this.state.ConfirmedPassword.trim()) {
                                this.setState(() => ({ validatePassErr: "הסיסמאות תואמות" }));
                               this.checkUserEmailIsValid();
                                //this.props.navigation.navigate('RegistrationP2', {Email:this.state.Email, Password:this.state.Password})
                            }} }
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
        textAlign:"center",
        fontFamily: 'rubik-regular',
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
        flex: 1
    },
    genderView:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'space-between', 
        marginTop: 15
    },
    genderNote:{
       marginVertical: 1,
        marginBottom: 10,
        fontSize: 14,
        color: 'black',
        marginRight: 35,
        marginLeft:35   
    },
    genderNoteSelected:{
        marginVertical: 1,
        marginBottom: 10,
        fontSize: 20,
        color: colors.subTitle,
        marginRight: 35,
        marginLeft:35,
        fontWeight:'bold'   
    }
});
