import React from 'react';
import {AsyncStorage} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebaseSvc from '../FirebaseSvc';

// type Props = {
//     name?: string,
//     email?: string,
//     avatar?: string,
//   };
  
  export default class Feed extends React.Component{
  
    constructor(props) {
      super(props);
      
    }
    static navigationOptions = ({ navigation }) => ({
      title: (navigation.state.params || {}).name || 'Scv Chat!',
    });
  
    state = {
      messages: [],
      user:{},
      userCode:0,
      Nei:''
    };
  
    get user() {
      return {
        name: this.state.user.FirstName +' '+this.state.user.LastName,
        email: this.state.user.Email,
        //nei: this.state.user.NeighborhoodName,
        //UserCode:this.state.user.UserCode,
        //avatar: this.state.user.ImageId,
        id: this.state.user.UserId,
        _id: this.state.user.UserId, 
      };
    }

    async getUser() {
        let userJSON = await AsyncStorage.getItem('user');
        const userObj = await JSON.parse(userJSON);
        const nei = userObj.NeighborhoodName
        firebaseSvc.getNei(nei);
        this.setState({ user: userObj, userCode:userObj.UserId, Nei:userObj.NeighborhoodName },() => {
           firebaseSvc.refOn(message =>
                this.setState(previousState => ({
                  messages: GiftedChat.append(previousState.messages, message),
                }))
              );
        });
    }
  
    componentDidMount() {
        this.getUser();
        
      }
    componentWillUnmount() {
      firebaseSvc.refOff();
    }



    render() {
      return (
        <GiftedChat
          messages={this.state.messages}
          onSend={firebaseSvc.send}
          user={this.user}
          placeholder='הקלד הודעה'
        />
      );
    }
  
  }