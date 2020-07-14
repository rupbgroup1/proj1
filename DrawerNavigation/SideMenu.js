import React from "react";
import { View, StyleSheet, Text, Image, AsyncStorage, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import MenuButton from '../components/MenuButton';
import { SimpleLineIcons, FontAwesome } from "@expo/vector-icons";
import colors from "../assets/constant/colors";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Colors } from "react-native-paper";
import { CardStyleInterpolators } from "react-navigation-stack";



export default class SideMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        fName: '',
        lName: '',
        image: '',
        user: {}

    };

}

componentDidMount = () => {
  this.getUser(), () => {
      const { navigation } = this.props;
      this._unsubscribe = navigation.addListener('didFocus', () => {
          AsyncStorage.getItem('cameraDetails', (err, cameraDetailsJSON) => {

              if (cameraDetailsJSON !== null) {
                  const cameraDetailsObj = JSON.parse(cameraDetailsJSON);
                  this.setState({ picUri: cameraDetailsObj.picUri, picName: 'user_' + new Date().getTime() + '.jpg' });
                  console.log("cameraDetailsObj:" + cameraDetailsObj.picUri)
              }

              //   else{
              //     this.setState({ picUri: 'https://cdn1.iconfinder.com/data/icons/business-users/512/circle-512.png', picName: 'user_' + new Date().getTime() + '.jpg' });
              //   }
          });

          console.log("uri = " + this.state.picUri);
          console.log(this.state.picName)




      });
  };


}

getUser() {
  //let userJSON = await AsyncStorage.getItem('user');
  //const userObj = await JSON.parse(userJSON);

  AsyncStorage.getItem('user', (ERR, userJSON) => {
      let userObj = JSON.parse(userJSON);
      console.log("fromuser", userObj, "JSON", userJSON);
      let jobName = userObj.JobTitle != null ? userObj.JobTitle.JobName : '';
      this.setState({
          user: userObj,
          picUri: userObj.ImagePath,
          image: userObj.Image,
          yearOfBirth: userObj.YearOfBirth,
          FName: userObj.FirstName,
          LName: userObj.LastName,
          gender: userObj.Gender
      }, 
      // () => {
      //     this.fetchGetAllIntrests();
      //     this.fetchGetCity();
      //     this.fetchGetAllJobTitle();
      // }
      );
  });


}
  render() {
    const { navigation } = this.props;
    let age = new Date().getFullYear() - this.state.yearOfBirth;
    return (
      <View style={styles.content}>
        <View style={styles.topPage}>
          <View style={styles.PicAndName}>
          <Text style={styles.Name}>
          {'היי ' + this.state.user.FirstName}
          </Text>
          {/* <Image style={styles.profilePic}
          source={require('../assets/profilePic.png')} /> */}
          {this.state.user.ImagePath &&
            <Image style={styles.profilePic}
                   source={{ uri: this.state.user.ImagePath }}/>
          }
          </View>
          <TouchableOpacity
          onPress={() => navigation.navigate('RegistrationExtra')}
          style={styles.improveButton}
          >
            <Text style={styles.improveText}>לחץ לשיפור הפרופיל</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.Buttons}>
            <MenuButton
              title="הפרופיל שלי"
              onPress={() => {
                navigation.navigate('ProfileEdit');
                navigation.closeDrawer();
              }}
            />
            <SimpleLineIcons name="user" size={24} style={{ color: colors.turkiz }} />
          </View>
          <View style={styles.Buttons}>
            <MenuButton
              title="הצאט שלי"
              onPress={() => {
                navigation.navigate('MyChats');
                navigation.closeDrawer();
              }}
            />
            <SimpleLineIcons name="bubble" size={24} style={{ color: colors.turkiz }} />
          </View>
          <View style={styles.Buttons}>
            <MenuButton
              title="האירועים שלי"
              onPress={() => {
                navigation.navigate('MyEvents');
                navigation.closeDrawer();
              }}
            />
            <SimpleLineIcons name="calendar" size={24} style={{ color: colors.turkiz }} />
          </View>
          <View style={styles.Buttons}>
            <MenuButton
              title="המציאות שלי"
              onPress={() => {
                navigation.navigate('MyLosts');
                navigation.closeDrawer();
              }}
            />
            <SimpleLineIcons name="magnifier" size={24} style={{ color: colors.turkiz }} />
          </View>
          <View style={styles.Buttons}>
            <MenuButton
              title="העסקים שלי"
              onPress={() => {
                navigation.navigate('MyServices');
                navigation.closeDrawer();
              }}
            />
            <SimpleLineIcons name="briefcase" size={24} style={{ color: colors.turkiz }} />
          </View>
        </View>
        <TouchableOpacity
        onPress={() => navigation.navigate('LoginScreen')}
        style={styles.logoutButton}
        >
          <Text style={styles.logoutText}>התנתקות</Text>
          <FontAwesome name='sign-out' size='18' color='grey'/>
        </TouchableOpacity>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 4,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop:30
  },
  topPage: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width:'90%'
  },
  Buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.2,
    paddingVertical: 15
  },
  profilePic:{
    height:90,
    width:90,
    paddingRight:20,
    borderRadius: 160
  },
  Name:{
    paddingTop:30,
    paddingLeft:20,
    fontSize: 30,
    marginLeft: 5,
    marginTop: 2,
    fontFamily: 'Helvetica-Light'
  },
  PicAndName:{
    flexDirection:'row-reverse'
  },
  improveButton:{
    top:50,
    alignSelf:'center'
  },
  improveText:{
    color:colors.turkiz,
    fontSize:20,
    fontFamily:'Helvetica-Light'
  },
  logoutButton:{
    paddingBottom:35,
    paddingHorizontal:20,
    alignSelf:'flex-end',
    flexDirection:'row-reverse'
  },
  logoutText:{
    fontSize:18,
    fontFamily:'Helvetica-Light',
    color:'grey',
    paddingLeft:5
  }
});

