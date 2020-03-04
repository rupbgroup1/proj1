import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text, ImageBackground } from 'react-native';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      titleText: 'Commy',
    };
  }

  onLogin() {
    const username =this.state.username;
    const password  = this.state.password;

    Alert.alert('Credentials', `${username} + ${password}`);
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
          <Text style={styles.forgotPassword} >
           שכחתי סיסמה {'\n'}{'\n'}
          </Text>
        
        <View style={styles.button}>
        <Button
          title={'כניסה'}
          onPress={this.onLogin.bind(this)}
        />
        
        </View>
        <View style={styles.createUser}>
        <Text style={{color:'black', fontSize:16}} >
          אין לך משתמש עדיין?   {'\n'}
          </Text>
          <Text style={{color:'blue', fontSize:16}}>
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
