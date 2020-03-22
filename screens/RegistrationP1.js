import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text, CheckBox, Picker, ScrollView } from 'react-native';
import Header from '../components/Header';
import { SimpleLineIcons } from '@expo/vector-icons';
import GenderButton from '../components/GenderButton';
import colors from '../assets/constant/colors';

export default class RegistrationP1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Email:'',
            Password:''

        };

    }


    render() {

        const { navigation} = this.props;
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
                      סימסה
                   </Text>
                    <TextInput
                        value={this.state.Password}
                        onChangeText={(Password) => this.setState({ Password })}
                        placeholder={'סיסמה'}
                        style={styles.input}
                    />
                    <Text style={styles.note} >
                     הסיסמה תכיל לפחות 6 תווים
                    </Text>
                    <TextInput
                        value={this.state.Password}
                        
                        placeholder={'הזן שוב את הסיסמה לאישור'}
                        style={styles.input}
                    />
                    <View style={styles.checkbox}>
                        <CheckBox />
                        <Text style={{ paddingTop: 3 }}>הסיסמה מאושרת</Text>
                    </View>
                    
                    <View style={styles.button}>
                        <Button onPress={() => this.props.navigation.navigate('Pic')} 
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
    note: {
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
    checkbox: {
        flexDirection: 'row'
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
