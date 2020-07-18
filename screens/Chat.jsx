import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firebaseSvc from '../FirebaseSvc';
import { Button, View, StyleSheet, Text, ActivityIndicator, TextInput, AsyncStorage, Alert, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import colors from '../assets/constant/colors';
import BackButton from '../components/BackButton';

export default class Chat extends React.Component {

  constructor(props) {
    super(props);

  }

  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Scv Chat!',
  });

  state = {
    messages: [],
    user: {},
    userCode: 0,
    Nei: '',
    sendToFullName:"",
  };

  get user() {
    return {
      name: this.state.user.FirstName + ' ' + this.state.user.LastName,
      email: this.state.user.Email,
      id: this.state.user.UserId,
      _id: this.state.user.UserId,
    };
  }

  async getUser(userCode) {
    let userJSON = await AsyncStorage.getItem('user');
    const userObj = await JSON.parse(userJSON);
    const messageCode = userObj.UserId<userCode?"Private_" + userObj.UserId+"_"+userCode:"Private_" + userCode+"_"+userObj.UserId;
    firebaseSvc.getNei(messageCode);
    this.setState({ user: userObj, userCode: userObj.UserId, Nei: messageCode, sendTo:userCode}, () => {
      firebaseSvc.refOn(message =>
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, message),
        }))
      );
    });
  }

  componentDidMount() {
    let sendTo = this.props.navigation.getParam('userCode');
    console.log(sendTo);
    this.setState({sendToFullName: sendTo.FirstName+" "+ sendTo.LastName});
    this.getUser(sendTo.UserId);

  }
  componentWillUnmount() {
    firebaseSvc.refOff();
  }

  onSendFunction(messages){
    firebaseSvc.send(messages);
    this.fetchGetToken();
    console.log("all messages: ", this.state.messages, ",  length: ",this.state.messages.length );
    this.state.messages.length===1&&this.updateDB();
    //this.notificationPush()
  }

  updateDB(){
    console.log("in db");
    console.log("user id: ", this.state.userCode, "  send to id: ", this.state.sendTo)
    let chat={
      FromUser: this.state.userCode,
      ToUser: this.state.sendTo
    }
     return fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/Chat/New', {
          method: 'POST',
          body: JSON.stringify(chat),
          headers: new Headers({
              'Content-Type': 'application/json; charset=UTF-8',
          })
      })
          .then(res => {
              return res.json();
          })
          .then(
              (result) => {
                  if (result === 1) {
                      console.log(result);
                  }
                  else
                  console.log(result);
              },
              (error) => {
                  console.log("err post=", error);
                  Alert.alert("מצטערים, אנו נסו שנית!");
              }
          );
  }


  fetchGetToken(){
    fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/User/Token?userId='+this.state.sendTo, {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(
        (result) => {
          if (result!==null) {
            console.log(" get token result = ", result);
            this.notificationPush(result);
          }
         
        },
        (error) => {
          console.log("err post=", error);
          Alert.alert("מצטערים, אנו נסו שנית!");
        }
      );
  }

  notificationPush = (token) => {
    console.log("in push!");
    let per = {
      to: token,
      title:'Commy',
      body: 'הודעה חדשה מ'+ this.state.user.FirstName,
      badge: 3,
      data: {SendFrom: this.state.user.UserId, ScreenName:"Chat", SendTo:this.state.sendTo}
    };

    // POST adds a random id to the object sent
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      body: JSON.stringify(per),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json != null) {
          console.log(`
              returned from server\n
              json.data= ${JSON.stringify(json.data)}`);

        } else {
          alert('err json');
        }
      });
  }


  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
        <Header navigation={navigation}/>
        <BackButton goBack={() => this.props.navigation.navigate('MainPage')} />
        <View style={{
          width: '95%', height: '80%', borderRadius: 10,
          shadowColor: 'black',
          shadowOpacity: 0.5,
          elevation: 3,
          backgroundColor: 'white',
          marginTop: 10,
          
        }}>
          <Text style={styles.text}>{this.state.sendToFullName}</Text>
          <GiftedChat
            messages={this.state.messages}
            onSend={messages=>this.onSendFunction(messages)}
            user={this.user}
            placeholder='הקלד הודעה'
          />
        </View>
      </View>
    );
  }

}
const styles = StyleSheet.create({
text: {
  fontFamily: 'rubik-regular',
  marginVertical: 1,
  marginBottom: 5,
  fontSize: 22,
  paddingTop: 10,
  color: 'black',
  marginLeft:10
}
});
