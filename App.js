import React, { Component, useState } from 'react';
import {View, StyleSheet,Dimensions,Image,TouchableOpacity,Platform,Text,} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import LoginScreen from './screens/LoginScreen';
import ForgotPassword from './screens/ForgotPassword';
import Pic from './screens/Pic';
import CameraPage from './screens/CameraPage';
import ImageGallery from './screens/ImageGallery';
import RegistrationIntroduction from './screens/RegistrationIntroduction';
import RegistrationP4 from './screens/RegistrationP4';
import RegistrationP2 from './screens/RegistrationP2';
import RegistrationP1 from './screens/RegistrationP1';
import FindNeighboor from './screens/FindNeighboor';
import RegistrationExtra from './screens/RegistrationExtra'
import RegistrationP5 from './screens/RegistrationP5';
import MainPage from './screens/MainPage';
import Feed from './components/Feed';
import Param from './screens/Param';
import Profile from './screens/Profile';
import MyBusinesses from './screens/SideBarMenu/MyBusinesses';
import MyChat from './screens/SideBarMenu/MyChat';
import MyEvents from './screens/SideBarMenu/MyEvents';
import MyFindings from './screens/SideBarMenu/MyFindings';
import CustomSidebarMenu from './screens/SideBarMenu/CustomSidebarMenu';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import ProfileEdit from './screens/ProfileEdit';

//cancel the timer error
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};
//add fonts to the app
const fetchFonts = () => {
  return Font.loadAsync({
    'kalam-bold': require('./assets/fonts/Kalam-Bold.ttf'),
    'kalam-light': require('./assets/fonts/Kalam-Light.ttf'),
    'kalam-regular': require('./assets/fonts/Kalam-Regular.ttf'),
    'varela': require('./assets/fonts/VarelaRound-Regular.ttf'),
    'rubik-regular': require('./assets/fonts/Rubik-Regular.ttf'),
    'rubik-medium': require('./assets/fonts/Rubik-Medium.ttf'),
    'rubik-bold': require('./assets/fonts/Rubik-Bold.ttf')
  });  
};

//add screens to nav
const navigator = createStackNavigator({
  LoginScreen:LoginScreen,
  ForgotPassword:ForgotPassword,
  Pic: Pic,
  CameraPage:CameraPage,
  ImageGallery:ImageGallery,
  RegistrationP1:RegistrationP1,
  RegistrationP2:RegistrationP2,
  RegistrationP4:RegistrationP4,
  RegistrationExtra:RegistrationExtra,
  FindNeighboor:FindNeighboor,
  RegistrationIntroduction:RegistrationIntroduction,
  RegistrationP5:RegistrationP5,
  MainPage:MainPage,
  Feed:Feed,
  Param:Param,
  Profile:Profile,
  CustomSidebarMenu:CustomSidebarMenu,
  MyFindings:MyFindings,
  MyEvents:MyEvents,
  MyBusinesses:MyBusinesses,
  MyChat:MyChat,
  ProfileEdit:ProfileEdit
  
  }, {
        initialRouteName: 'MainPage',
        defaultNavigationOptions: {
        headerShown: false
     }
  })
const Na = createAppContainer(navigator)


export default function App() {
  //check that the fonts are loaded before the screen
  const [dataLoaded, setDataLoaded] = useState(false);
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  return (
    <Na/>
  );
}

//SideBarMenu
global.currentScreenIndex = 0;
//Navigation Drawer Structure for all screen
class NavigationDrawerStructure extends Component {
  //Top Navigation Header with Donute Button
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require('./assets/drawer.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

//Stack Navigator for the First Option of Navigation Drawer
const FirstActivity_StackNavigator = createStackNavigator({
  //All the screen from the First Option will be indexed here
  First: {
    screen: MyChat,
    navigationOptions: ({ navigation }) => ({
      title: 'הצאט שלי',
      headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});

//Stack Navigator for the Second Option of Navigation Drawer
const Screen2_StackNavigator = createStackNavigator({
  //All the screen from the Second Option will be indexed here
  Second: {
    screen: MyEvents,
    navigationOptions: ({ navigation }) => ({
      title: 'האירועים שלי',
      headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});

//Stack Navigator for the Third Option of Navigation Drawer
const Screen3_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  Third: {
    screen: MyFindings,
    navigationOptions: ({ navigation }) => ({
      title: 'המציאות שלי',
      headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});

//Stack Navigator for the Fourth Option of Navigation Drawer
const Screen4_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  Fourth: {
    screen: MyBusinesses,
    navigationOptions: ({ navigation }) => ({
      title: 'העסקים שלי',
      headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});

// //Drawer Navigator Which will provide the structure of our App
// const DrawerNavigatorExample = createDrawerNavigator(
//   {
//     //Drawer Optons and indexing
//     NavScreen1: {
//       screen: FirstActivity_StackNavigator,
//       navigationOptions: {
//         drawerLabel: 'הצאט שלי',
//       },
//     },
//     NavScreen2: {
//       screen: Screen2_StackNavigator,
//       navigationOptions: {
//         drawerLabel: 'האירועים שלי',
//       },
//     },
//     NavScreen3: {
//       screen: Screen3_StackNavigator,
//       navigationOptions: {
//         drawerLabel: 'המציאות שלי',
//       },
//     },
//     NavScreen4: {
//       screen: Screen4_StackNavigator,
//       navigationOptions: {
//         drawerLabel: 'העסקים שלי',
//       },
//     },
//   },
//   {
//     //For the Custom sidebar menu we have to provide our CustomSidebarMenu
//     contentComponent: CustomSidebarMenu,
//     //Sidebar width
//     drawerWidth: Dimensions.get('window').width - 130,
//   }
// );
// export default createAppContainer(DrawerNavigatorExample);

