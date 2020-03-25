import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text, ImageBackground } from 'react-native';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      titleText: 'Commy',
      user: {}
    };

    const apiUrl = 'http://proj.ruppin.ac.il/bgroup1/test1/tar1/api/User';
  }

  fetchOnLogin=()=> {
    const loginDetails={
      Email :this.state.username,
      Password : this.state.password
    } 

    fetch(this.apiUrl+'/login', {
      method: 'POST',
      body: JSON.stringify(loginDetails),
      headers: new Headers({
          'Content-type': 'application/json; charset=UTF-8'
      })
  })
        .then(res => {
          console.log('res=', res);
          console.log('res.status', res.status);
          console.log('res.ok', res.ok);
          return res.json()
        })
        .then(
          (result) => {
            console.log("fetch = ", result);
            this.setState({user:result})
          },
          (error) => {
            console.log("err post=", error);
            Alert.alert("הפרטים אינם נכונים, אנא נסה שנית");
          });
    
  
  }


  fetchPostNewUser = () => {
    const newUser = {
        Email: "test@gmail.com",
        Password:"123456",
        FirstName: this.state.userPrivateName,
        LastName: this.state.userLastName,
        Gender: this.state.gender,
        YearOfBirth: this.state.yearOfBirth,
        IsPrivateName: this.state.IsPrivateName, 
    }

    fetch(this.apiUrl, {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: new Headers({
            'Content-type': 'application/json; charset=UTF-8'
        })
    })
        .then(res => {
            console.log('res=', res);
            return res.json()
        })
        .then(
            (result) => {
                console.log("fetch POST= ", result);
                console.log(result.Avg);
            },
            (error) => {
                console.log("err post=", error);
            }
        );


}
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
          <Text onPress={() => this.props.navigation.navigate('ForgotPassword')} style={styles.forgotPassword} >
           שכחתי סיסמה {'\n'}{'\n'}
          </Text>
        
        <View style={styles.button}>
        <Button
          title={'כניסה'}
          onPress={this.fetchOnLogin.bind(this)}
        />
        
        </View>
        <View style={styles.createUser}>
        <Text onPress={() => this.props.navigation.navigate('RegistrationIntroduction')} style={styles.forgotPassword} style={{color:'blue', fontSize:16}}>
            להרשמה לחץ כאן
          </Text>
        <Text style={{color:'black', fontSize:16}} >
          אין לך משתמש עדיין?   {'\n'}
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
    backgroundColor: '#ecf0f1'    
  },
  input: {
    width: '60%',
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
    fontSize: 60
  }, 
  forgotPassword:{
    color: 'blue',
    textAlign: 'left'
  },
  button:{
   width: '60%',
   
  },
  createUser:{
    padding: 30,
    flexDirection: 'row',
    marginBottom: 80,
    fontFamily: 'varela'
  }
});
