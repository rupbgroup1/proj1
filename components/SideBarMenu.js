import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//Drawer Navigator Which will provide the structure of our App
const MenuNavigator = createDrawerNavigator(
  {
    //Drawer Options and indexing
    NavScreen1: {
      screen: FirstActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: 'הצאט שלי',
      },
    },
    NavScreen2: {
      screen: Screen2_StackNavigator,
      navigationOptions: {
        drawerLabel: 'האירועים שלי',
      },
    },
    NavScreen3: {
      screen: Screen3_StackNavigator,
      navigationOptions: {
        drawerLabel: 'המציאות שלי',
      },
    },
    NavScreen4: {
      screen: Screen4_StackNavigator,
      navigationOptions: {
        drawerLabel: 'העסקים שלי',
      },
    },
  },
  {
    //For the Custom sidebar menu we have to provide our CustomSidebarMenu
    contentComponent: CustomSidebarMenu,
    //Sidebar width
    drawerWidth: Dimensions.get('window').width - 130,
  }
);
export default createAppContainer(MenuNavigator);
