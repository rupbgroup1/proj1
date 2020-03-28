import React, { Component, createElement } from 'react';
import { Button, View, StyleSheet, Text,  Image , TextInput } from 'react-native';
import Header from '../components/Header';
import colors from '../assets/constant/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';


export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userEmail: ''
        };


        validateEmail = email => {
            var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
            };
    }
    render(){
        return (
            <View>
                <Header/>
                <View style= {styles.container}>
                <Text style={styles.subTitle} >
                       הקליד/י את כתובת המייל ולינק ליצרת סיסמה יישלח אליך מיד
                </Text>

                <TextInput
                        value={this.state.userEmail}
                        onChangeText={(userEmail) =>{
                           this.setState({ userEmail },()=>
                           {if(!this.validateEmail(this.state.userEmail))
                        {
                            (userLastName) => this.setState({ userLastName })
                        }})
                        }}
                        placeholder={'אימייל'}
                        style={styles.input}
                    />

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
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: '#F0F8FF',
        textAlign: 'right',
        backgroundColor: 'white',
        marginRight:'10%',
        marginLeft:'10%',
        marginTop:'15%'
        
    },
    subTitle: {
        marginVertical: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.subTitle,
        paddingTop: 25,
        textAlign:"center",
        marginRight: '15%',
        marginLeft: '15%',
        marginTop: '30%',
        
    },
    container: {
        backgroundColor: colors.regBackground,
        height: '100%',
        width: '100%'

    },

    button : {
        marginTop:5,
        width: '60%'
    }

})
