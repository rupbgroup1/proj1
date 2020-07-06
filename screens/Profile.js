import React, { Component, createElement } from 'react';
import { Button, View, StyleSheet, Text,  Image , Alert, AsyncStorage , TouchableOpacity, Picker, SafeAreaView, ScrollView} from 'react-native';
import Header from '../components/Header';
import colors from '../assets/constant/colors';
import BackButton from '../components/BackButton';
import { Input } from 'react-native-elements';
import OurButton from '../components/OurButton';
import Autocomplete from 'react-native-autocomplete-input';
import { Dropdown } from 'react-native-material-dropdown';
import {
    SimpleLineIcons,
    FontAwesome5
} from '@expo/vector-icons';

//import { ScrollView } from 'react-native-gesture-handler';


export default class Profile extends Component {
    
    constructor(props) {
        super (props);
        this.state = {
            LastName:'',
            user:{}
        }
       const user = {};
        
    }

    componentDidMount = () => {
        //this.user = this.props.navigation.getParam('user');
        this.setState  ({user: this.props.navigation.getParam('user')});
        //console.log("profile" + this.user);
        console.log("state" + this.state.user.FirstName);
    }


    render(){
        return(
            
        <View style={styles.screen} >
            <Header />
            <BackButton goBack={() => this.props.navigation.navigate('MainPage')} />

            

            <View style={styles.container}>

                 
                  
        <Text>{this.state.user.FirstName}</Text> 
                </View> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
      screen: {
        flex: 1,
        backgroundColor: colors.reeBackgrouond
    },

    
  });