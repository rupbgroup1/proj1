import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text} from 'react-native';
import RememberMe from '../components/RememberMe';
import {AsyncStorage} from 'react-native';


export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      titleText: 'Commy',
      user: [],
      usernameValid: true
    };
    
  }

  
//Search for the userDetails in DB
  fetchOnLogin=()=> {
    const loginDetails={
      Email :this.state.username,
      Password : this.state.password
    } 


    fetch('http://proj.ruppin.ac.il/bgroup1/test1/tar1/api/User/login', {
      method: 'POST',
      body: JSON.stringify(loginDetails),
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
          console.log("fetch = ", result) ;
          if(result.UserId===0){
             Alert.alert("הפרטים אינם נכונים, אנא נסה שנית")}
          else{
            //this.setState({user:result});
            AsyncStorage.setItem( "user", JSON.stringify(result),()=>{
              this.props.navigation.navigate('RegistrationExtra');
            });
           }
          },
          (error) => {
            console.log("err post=", error);
            Alert.alert("איראה שגיאה, אנא נסה שנית");
          });
    
  
  }
//Check that the user name entered is valid

  
  render() {
    return (
      
      <View style={styles.container}>
        <Text style={styles.titleText} >
          {this.state.titleText}{'\n'}
        </Text>
        
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'שם משתמש'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'סיסמה'}
          secureTextEntry={true}
          style={styles.input}
        />
        <View style={styles.RememberMe}>
        <RememberMe  user={{Email: this.state.username, Password:this.state.Password}}/>
        </View>
        
        
        <View style={styles.button}>
        <Button
          fontFamily='rubik-regular'
          color='blue'
          title={'כניסה'}
          onPress={()=>{
          this.state.usernameValid ? this.fetchOnLogin() : Alert.alert("שם משתמש לא תקין")
          }
          }
        />
        <Text>{this.state.username}{this.state.password}</Text>
        </View>
        <Text onPress={() => this.props.navigation.navigate('ForgotPassword')} style={styles.forgotPassword} >
           שכחתי סיסמה {'\n'}{'\n'}
          </Text>
        <View style={styles.createUser}>
        <Text style={{color:'black', fontSize:16, fontFamily: 'rubik-regular'}} >
          אין לך משתמש עדיין?   {'\n'}
        </Text>
        <Text style={{fontFamily: 'rubik-regular'}} onPress={() => this.props.navigation.navigate('RegistrationIntroduction')} style={styles.forgotPassword} style={{color:'blue', fontSize:16}}>
            להרשמה לחץ כאן
          </Text>
        </View> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1', 
  },
  input: {
    
    fontFamily: 'rubik-regular',
    width: '70%',
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
    backgroundColor: 'white',
    textAlign: 'right',
  },
  titleText: {
    fontFamily:'kalam-regular',
    marginVertical: 1,
    fontSize: 70
  }, 
  forgotPassword:{
    
    fontFamily: 'rubik-regular',
    color: 'blue',
    textAlign: 'left',
    paddingTop:20
  },
  button:{
   width: '70%',
   
  },
  createUser:{
    fontFamily: 'rubik-regular',
    padding: 10,
    flexDirection: 'row',
    direction: "rtl",
    marginBottom: 40,
    fontFamily: 'varela'
  },
  RememberMe:{
   flexDirection:'row',
   marginRight:145,
   paddingBottom:20
  }
});
