import React, { Component, createElement } from 'react';
import { Button, View, StyleSheet, Text,  Image , Alert, AsyncStorage } from 'react-native';
import Header from '../components/Header';
import OurButton from '../components/OurButton';
import colors from '../assets/constant/colors';
import CheckBox from 'react-native-check-box'
import { SimpleLineIcons } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import {createStackNavigator,createAppContainer,withNavigation} from 'react-navigation';
import BackButton from '../components/BackButton';


export default class Pic extends Component {
    
    constructor(props) {
        super(props);
        this.state = {isChecked: true, 
            picUri:'https://cdn1.iconfinder.com/data/icons/business-users/512/circle-512.png'};
        this.handleChecked = this.handleChecked.bind(this); // set this, because you need get methods from CheckBox 
  }

 
  componentDidMount ()  {
      const {navigation} = this.props;
    this._unsubscribe = navigation.addListener('didFocus', () => {
        this.setState({ picUri: this.props.navigation.getParam('photoUri')})
    });
  }

  componentWillUnmount  ()  {
    this._unsubscribe();
  }

  

  handleChecked () {
    this.setState({isChecked: !this.state.isChecked});
  }

   render (){

    const {picUri} = this.state;

        return(
        <View style={styles.screen}>  
        <Header/>
        <BackButton goBack={() => navigation.navigate('RegistrationP2')} />
       <Text style={styles.subTitle}>
           הגדר את תמונת הפרופיל שלך
       </Text>
       <Image
          style={{width: 200, height:200, marginTop: '10%', }}
          source={{uri: 'https://cdn1.iconfinder.com/data/icons/business-users/512/circle-512.png'}}
        />
            <View style={styles.icon}>
            <OurButton onPress={() => this.props.navigation.navigate('CameraPage')}><SimpleLineIcons name="camera" size={40} color="black"/></OurButton>
            <Text style={styles.textOr}> או </Text>
            <OurButton onPress={() => this.props.navigation.navigate('ImageGallery')}><SimpleLineIcons name="picture" size={40} color="black"/></OurButton>
        
            </View>
           
                    
                    <Image
                        style={{ alignSelf: 'center', width: 300, height: 250 }}
                        source={{uri: this.state.picUri}} />
        
                    <View style={{width:'80%',marginTop:0}}>
                        <Button
                            title={'המשך'}  onPress={() => {
                                let userDetails={
                                ImagePath: this.state.picUri
                                }
                                AsyncStorage.mergeItem('user', JSON.stringify(userDetails));
                                this.props.navigation.navigate('RegistrationP4')
                            } }
                        />
                   </View>
                   <Text>
                       {this.props.picUri}
                   </Text>
        </View>
        
       )
   }
       
}

const styles = StyleSheet.create({
    screen:{
        backgroundColor:colors.reeBackgrouond, 
        height:'100%',
        alignItems:'center'
    },
    subTitle: {
        fontFamily: 'rubik-regular',
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
        fontFamily: 'rubik-regular',
        marginTop:19,
        fontWeight:'bold',
        fontSize:30
    
    },
    checkBox: {
        flex: 1,
        flexDirection: "row",
        
    }
})