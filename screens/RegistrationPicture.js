import React, { Component, createElement } from 'react';
import { Button, View, StyleSheet, Text,  Image  } from 'react-native';
import CheckBox from 'react-native-check-box'
import Header from '../components/Header';
import colors from '../assets/constant/colors';
import { SimpleLineIcons } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import GenderButton from '../components/GenderButton';
import 'react-native-gesture-handler';



const AddPicture = ({navigation}) =>{


    return(
        <View style={{backgroundColor:'#F0F8FF', height:'100%'}}>  
        <Header/>
       <Text style={styles.subTitle}>
           הגדר את תמונת הפרופיל שלך
       </Text>
       <Image
          style={{width: 200, height:200, marginTop: '10%', marginLeft:'25%'}}
          source={{uri: 'https://cdn1.iconfinder.com/data/icons/business-users/512/circle-512.png'}}
        />
            <View style={styles.icon}>
            <GenderButton onPress={() => navigation.navigate('CameraPage')}><SimpleLineIcons name="camera" size={40} color="black"/></GenderButton>
            <Text style={styles.textOr}> או </Text>
            <GenderButton onPress={() => navigation.navigate('ImageGallery')}><SimpleLineIcons name="picture" size={40} color="black"/></GenderButton>
        
            </View>
           
                    <View style={styles.checkbox}>
                        <CheckBox 
                        onClick={(PicIsPrivate) => this.setState({ PicIsPrivate})}
                         />
                        <Text style={{ paddingTop: 3, textAlign: 'center'}}>אני מאשר לחשוף את התמונה למשתמשים באפליקציה</Text>
                    </View>
        
                    <View style={styles.button,{marginTop:50}}>
                        <Button
                            title={'המשך'}
                        />
                   </View> 

                   



          
        </View>
    );
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
        flexDirection: "row"
    }
})

export default AddPicture;

