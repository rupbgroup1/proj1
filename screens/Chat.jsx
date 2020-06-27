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
    //token: 'ExponentPushToken[cQYyeHDo4l_zVTPLg5aq-w]'
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
    this.getUser(sendTo);

  }
  componentWillUnmount() {
    firebaseSvc.refOff();
  }

  onSendFunction(messages){
    firebaseSvc.send(messages);
    this.notificationPush()
  }

  notificationPush = () => {
    console.log("in push!");
    let per = {
      to: this.props.navigation.getParam('userToken'),
      title:'Commy',
      body: 'הודעה חדשה מ'+ this.state.user.FirstName,
      badge: 3,
      data: {sender: this.state.user.UserId, navigateTo:"Chat", reciever:this.state.sendTo}
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
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
        <Header />
        <BackButton goBack={() => this.props.navigation.navigate('GeneralServices')} />
        <View style={{
          width: '95%', height: '80%', borderRadius: 10,
          shadowColor: 'black',
          shadowOpacity: 0.5,
          elevation: 3,
          backgroundColor: 'white',
          marginTop: 10
        }}>
          
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
