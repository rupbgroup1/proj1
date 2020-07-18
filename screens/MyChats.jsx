import React, { Component } from 'react';
import { Button, View, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback, } from 'react-native';
import colors from '../assets/constant/colors';
import Header from '../components/Header';
import { Card, Text } from 'react-native-elements';
import { ListItem } from 'react-native-elements'



export default class MyChats extends Component {
  constructor(props) {
    super(props);
  this.state={
    usersList:[],
  }
   // const usersList=[];
    
  }

  componentDidMount(){
    const userId = this.props.navigation.getParam('userId')
    this.getChats(userId);
  }

  getChats(userId){
    console.log("userId=== ", userId);
      fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/User/Chats?userId='+userId, {
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
              console.log(" get users result = ", result);
              this.setState({usersList: result});
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
        <View style={{ flex: 1,  backgroundColor: 'white' , width:'100%' }}>
          <Header navigation={navigation} />
          
            {this.state.usersList?
              this.state.usersList.map((l, i) => (
                <ListItem
                  key={i}
                  leftAvatar={{ 
                    source: { uri: l.ImagePath }
                  }}
                  title={l.FirstName + " " + l.LastName}
                  //subtitle={l.LastName}
                  bottomDivider
                  onPress={() => this.props.navigation.navigate("Chat", { userCode: l})}
                />
              )) :
            <Text>לא נמצאו שיחות</Text>
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  header: {
    //flex:1,
    textAlign: 'center',
    fontFamily: 'rubik-regular',
    marginVertical: 1,
    fontSize: 20,
    color: 'black',
    paddingTop: 15,
    paddingBottom: 15
  },
  feed: {
    flex: 3,
    width: '95%'
  },
  row: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  item1: {
    top: 20,
    left: -40
  },
  item2: {
    top: 85,
    left: -45,
  },
  item3: {
    top: 20,
    left: -60
  },
  item4: {
    top: -15,
    right: -110
  }

});
