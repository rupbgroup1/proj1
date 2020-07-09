import React from "react";
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import MenuButton from '../components/MenuButton';
import { AntDesign } from "@expo/vector-icons";
import colors from "../assets/constant/colors";


export default class SideMenu extends React.Component {
    render() {
        const { navigation } = this.props;
      return (
        <View style={styles.content}>
          <View style={styles.container}>
            <MenuButton
              title="פרופיל"
              onPress={() => {
                navigation.navigate('Profile');
                navigation.closeDrawer();
              }}
            />
            <AntDesign name="UserOutlined" style={{ color: colors.turkiz }} />
            <MenuButton
              title="הצאט שלי"
              onPress={() => {
                navigation.navigate('Chat');
                navigation.closeDrawer();
              }}
            />
            <MenuButton
              title="האירועים שלי"
              onPress={() => {
                navigation.navigate('MyEvents');
                navigation.closeDrawer();
              }}
            />
            <MenuButton
              title="האבידות שלי"
              onPress={() => {
                navigation.navigate('MyLosts');
                navigation.closeDrawer();
              }}
            />
            <MenuButton
              title="העסקים שלי"
              onPress={() => {
                navigation.navigate('MyServices');
                navigation.closeDrawer();
              }}
            />
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    container: {
      flex: 1,
      alignItems: 'flex-start',
      paddingHorizontal: 20
    }
  });

