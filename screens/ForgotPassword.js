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


       
    }
    //serach for the email in DB
    fetchFP=()=> {
        const Email= this.state.userEmail;
        fetch('http://proj.ruppin.ac.il/bgroup1/test1/tar1/api/User/login', {
            method: 'POST',
            body: JSON.stringify(Email),
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
            console.log("fetch = ", result);
            if(result.UserId===0){
               Alert.alert("המייל לא שמור במערכת")}
            else{
              //להוסיף קישור לשחזור סיסמה
            }
            
            },
            (error) => {
              console.log("err post=", error);
              Alert.alert("איראה שגיאה, אנא נסה שנית");
            });
    
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
        fontFamily:'rubik-regular',
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
        fontFamily:'rubik-regular',
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
        fontFamily:'Rubik-BoldItalic',
        marginTop:5,
    }

})
