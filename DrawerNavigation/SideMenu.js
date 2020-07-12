import React from "react";
import { View, StyleSheet, Text, Image,Button } from 'react-native';
import PropTypes from 'prop-types';
import MenuButton from '../components/MenuButton';
import { SimpleLineIcons } from "@expo/vector-icons";
import colors from "../assets/constant/colors";


export default class SideMenu extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.topPage}>
          <View style={styles.PicAndName}>
          <Text style={styles.Name}>
            היי יוחאי
          </Text>
          <Image style={styles.profilePic}
          source={require('../assets/profilePic.png')} />
          </View>
          <Button
          title={"לחץ לשיפור הפרופיל"}
          onPress={() => navigation.navigate('RegistrationExtra')}
          style={{color:colors.turkiz}}
          ></Button>
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
    paddingHorizontal: 20
  },
  topPage: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
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
    height:80,
    width:80,
    paddingRight:20
  },
  Name:{
    paddingLeft:30,
    fontSize: 24,
    marginLeft: 5,
    marginTop: 2,
    fontFamily: 'Helvetica-Light'
  },
  PicAndName:{
    flexDirection:'row-reverse'
  }
});

