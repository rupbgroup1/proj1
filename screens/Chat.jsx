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
    Nei: ''
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


  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
        <Header />
        <BackButton goBack={() => this.props.navigation.navigate('MainPage')} />
        
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
            onSend={firebaseSvc.send}
            user={this.user}
            placeholder='הקלד הודעה'
          />
        </View>
      </View>
    );
  }

}
