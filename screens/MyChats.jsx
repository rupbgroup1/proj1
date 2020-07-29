import React, { Component } from 'react';
import { Button, View, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback,Text } from 'react-native';
import colors from '../assets/constant/colors';
import Header from '../components/Header';
import { Card, ListItem } from 'react-native-elements';


export default class MyChats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
    };

  }

  componentDidMount() {
    const userId = this.props.navigation.getParam('userId')
    this.getChats(userId);
  }

  getChats(userId) {
    console.log("userId=== ", userId);
    fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/User/Chats?userId=' + userId, {
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
          if (result !== null) {
            console.log(" get users result = ", result);
            this.setState({ usersList: result });
            console.log(" user list = ", this.state.usersList);
          }

        },
        (error) => {
          console.log("err post=", error);
          Alert.alert("מצטערים, אנו נסו שנית!");
        }
      );
  }



  render() {
    const { navigation } = this.props;
    return (
      <TouchableWithoutFeedback>
        <View style={{ flex: 1, backgroundColor: 'white', width: '100%' }}>
          <Header navigation={navigation} />

          {this.state.usersList!==null ?
            this.state.usersList.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={{
                  source: { uri: l.ImagePath }
                }}
                title={l.FirstName + " " + l.LastName}
                
                bottomDivider
                onPress={() => this.props.navigation.navigate("Chat", { userCode: l.UserId })}
              />
            )) :
            <Text>לא נמצאו שיחות</Text>
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}


