import React from "react";
import { View, StyleSheet, Text, Image, AsyncStorage, TouchableOpacity} from 'react-native';
import { AppLoading } from 'expo';
import PropTypes from 'prop-types';
import MenuButton from '../components/MenuButton';
import { SimpleLineIcons, FontAwesome } from "@expo/vector-icons";
import colors from "../assets/constant/colors";



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

  componentDidMount(){
    //this.getUser();
  }



  getUser=()=> {
    AsyncStorage.getItem('user', (ERR, userJSON) => {
      const userObj = JSON.parse(userJSON);
      this.setState({ user: userObj });
     
    });
  }

  render() {
    const { navigation } = this.props;
    return (
      !this.state.dataLoaded ?
      <AppLoading
        startAsync={this.getUser}
        onFinish={() => this.setState({ dataLoaded: true })}
        onError={(err) => console.log(err)}
      />
      :
      <View style={styles.content}>
        <View style={styles.topPage}>
          <View style={styles.PicAndName}>
             <Text style={styles.Name}>
              היי {this.state.user.FirstName} 
            </Text>
            {this.state.user.ImagePath &&
              <Image style={styles.profilePic}
                source={{ uri: this.state.user.ImagePath }} />
            }
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegistrationExtra')}>
            <Text style={styles.improveText}>לחצ/י לשיפור הפרופיל</Text>
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
              title="השיחות שלי"
              onPress={() => {
                navigation.navigate('MyChats', { userId: this.state.user.UserId });
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
          <FontAwesome name='sign-out' size={18} color='grey' />
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
    justifyContent: 'center',
  },
  container: {
    flex: 4,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  topPage: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '90%',
  },
  Buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.2,
    paddingVertical: 15
  },
  profilePic: {
    height: 90,
    width: 90,
    paddingRight: 20,
    borderRadius: 160
  },
  Name: {
    paddingTop: 30,
    paddingLeft: 20,
    marginLeft: 5,
    marginTop: 2,
    fontSize: 30,
  },
  PicAndName: {
    flexDirection: 'row-reverse'
  },
  improveButton: {
    top: 50,
    alignSelf: 'center'
  },
  improveText: {
    color: colors.turkiz,
    fontSize: 20
  },
  logoutButton: {
    paddingBottom: 35,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse'
  },
  logoutText: {
    color: 'grey',
    paddingLeft: 5,
    fontSize: 18,
    fontFamily: 'rubik-regular'

  }
});

