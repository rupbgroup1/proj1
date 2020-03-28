import React, { Component, createElement } from 'react';
import { Button, View, StyleSheet, Text,  Image , TextInput } from 'react-native';
import Header from '../components/Header';
import GenderButton from '../components/GenderButton';
import colors from '../assets/constant/colors';
import CheckBox from 'react-native-check-box'
import { SimpleLineIcons } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import {createStackNavigator,createAppContainer} from 'react-navigation';


export default class Pic extends Component {
    
    constructor() {
        super();
        this.state = {isChecked: true};
        this.handleChecked = this.handleChecked.bind(this); // set this, because you need get methods from CheckBox 
  }

  handleChecked () {
    this.setState({isChecked: !this.state.isChecked});
  }

   render (){
        return(
        <View style={{backgroundColor:'#F0F8FF', height:'100%', alignItems:'center'}}>  
        <Header/>
       <Text style={styles.subTitle}>
           הגדר את תמונת הפרופיל שלך
       </Text>
       <Image
          style={{width: 200, height:200, marginTop: '10%', }}
          source={{uri: 'https://cdn1.iconfinder.com/data/icons/business-users/512/circle-512.png'}}
        />
            <View style={styles.icon}>
            <GenderButton onPress={() => this.props.navigation.navigate('CameraPage')}><SimpleLineIcons name="camera" size={40} color="black"/></GenderButton>
            <Text style={styles.textOr}> או </Text>
            <GenderButton onPress={() => this.props.navigation.navigate('ImageGallery')}><SimpleLineIcons name="picture" size={40} color="black"/></GenderButton>
        
            </View>
           
                    <View style={styles.checkbox}>
                        <CheckBox 
                             isChecked={this.state.isChecked}
                             onClick={()=>{
                              this.setState({isChecked:!this.state.isChecked })
                              }}
                  />
                        <Text style={{ paddingTop: 3, textAlign: 'center'}}>אני מאשר לחשוף את התמונה למשתמשים באפליקציה</Text>
                    </View>
        
                    <View style={styles.button,{marginTop:50}}>
                        <Button
                            title={'המשך'}  onPress={() => this.props.navigation.navigate('RegistrationP4')} 
                        />
                   </View>

        </View>
        
       )
   }
       
}

const styles = StyleSheet.create({
    
    subTitle: {
        marginVertical: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.subTitle,
        paddingTop: 25,
        textAlign: "center"
    },
    icon:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'space-between', 
        marginTop: 15
    },

    textOr:{
        marginTop:19,
        fontWeight:'bold',
        fontSize:30
    
    },
    checkBox: {
        flex: 1,
        flexDirection: "row",
        
    }
})