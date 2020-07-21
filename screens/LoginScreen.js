import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import RememberMe from '../components/RememberMe';
import { AsyncStorage } from 'react-native';
import Background from '../components/Background';
import registerForPushNotificationsAsync from '../components/registerForPushNotificationsAsync';
import { Notifications } from 'expo';


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
    componentDidMount() {
      registerForPushNotificationsAsync()
        .then((token) => {
          //console.log('token from app.js=', token);
          this.setState({ token });
        });
        AsyncStorage.removeItem('cameraDetails');
      
  
      // Handle notifications that are received or selected while the app
      // is open. If the app was closed and then opened by tapping the
      // notification (rather than just tapping the app icon to open it),
      // this function will fire on the next tick after the app starts
      // with the notification data.
      this._notificationSubscription = Notifications.addListener(this._handleNotification);
      
    }
  
    _handleNotification = (notification) => {
     // console.log("nav To= ",notification.data.ScreenName);
      this.setState({ notification: notification });
      if(notification.data.ScreenName!=null){
        this.props.navigation.navigate(notification.data.ScreenName, {userCode: notification.data.SendFrom});
      }
    };

  //Search for the userDetails in DB
  fetchOnLogin = () => {
    const email = this.state.username;
    const emailLower = email.toLowerCase();
    
    const loginDetails = {
      Email: emailLower,
      Password: this.state.password, 
      Token: this.state.token
    }

    console.log("login=", loginDetails);

    //Check that the user name entered is valid
    if (this.state.username == '' || this.state.password == '') {
      return Alert.alert("אנא מלא שם משתמש וסיסמה");
    }

    fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/User/login', {
      method: 'POST',
      body: JSON.stringify(loginDetails),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        //console.log('res=', res);
        return res.json()
      })
      .then(
        (result) => {
          //console.log("fetch = ", result);
          if (result.UserId > 0) {
            AsyncStorage.setItem("user", JSON.stringify(result), () => {
              this.props.navigation.navigate('MainPage');
              //console.log(result);
            }); 
          }
          else {
            Alert.alert("הפרטים אינם נכונים, אנא נסה שנית")
          }
        },
        (error) => {
          console.log("err post=", error);
          Alert.alert("איראה שגיאה, אנא נסה שנית");
        });
  }

  render() {
    return (
      <TouchableWithoutFeedback>
      <Background >

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
          <RememberMe user={{ Email: this.state.username, Password: this.state.Password }} />
        </View>


        <View style={styles.button}>
          <Button
            fontFamily='rubik-regular'
            color='#0d7d96'
            title={'כניסה'}
            titleText={{fontSize:26, color:'#f0a500'}}
            titleStyle={{}}
            onPress={() => {
              this.state.usernameValid ? this.fetchOnLogin() : Alert.alert("שם משתמש לא תקין")
            }
            }
            onPressIn={() => {
              Keyboard.dismiss;
            }}
          />

        </View>
        <Text onPress={() => this.props.navigation.navigate('ForgotPassword')} style={styles.forgotPassword} >
          שכחתי סיסמה {'\n'}{'\n'}
        </Text>
        <View style={styles.createUser}>
          <Text style={styles.noUser} >
            אין לך משתמש עדיין?   {'\n'}
          </Text>
          <Text style={styles.pressToReg} onPress={() => this.props.navigation.navigate('RegistrationIntroduction')}>
            להרשמה לחץ כאן
          </Text>
        </View>

      </Background>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#ecf0f1', 
  },
  input: {

    fontFamily: 'rubik-regular',
    width: '90%',
    height: 44,
    padding: 5,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
    backgroundColor: 'white',
    textAlign: 'right',
    borderRadius: 8
  },
  titleText: {
    fontFamily: 'kalam-regular',
    marginVertical: 1,
    fontSize: 70
  },
  forgotPassword: {

    fontFamily: 'rubik-regular',
    color: 'white',
    textAlign: 'left',
    paddingTop: 20
  },
  button: {
    width: '90%'

  },
  createUser: {
    fontFamily: 'rubik-regular',
    flexDirection: 'row',
    fontFamily: 'varela'
  },
  RememberMe: {
    flexDirection: 'row',
    marginRight: 190,
    paddingBottom: 20
  },
  noUser:{
    color: 'white',
    fontSize: 18,
    fontFamily: 'rubik-regular', 
    paddingLeft:10,
    paddingRight:10
  },
  pressToReg:{
    fontFamily: 'rubik-regular',
    color: '#0d7d96',
    fontSize: 18
  }
});
