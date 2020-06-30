import React, { Component, createElement } from 'react';
import { Button, View, StyleSheet, Text, Image, Alert, AsyncStorage } from 'react-native';
import Header from '../components/Header';
import OurButton from '../components/OurButton';
import colors from '../assets/constant/colors';
import CheckBox from 'react-native-check-box'
import { SimpleLineIcons } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import { createStackNavigator, createAppContainer, withNavigation } from 'react-navigation';
import BackButton from '../components/BackButton';




export default class Pic extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isChecked: true,
      picUri: 'https://cdn1.iconfinder.com/data/icons/business-users/512/circle-512.png',
     // picName: 'user_' + new Date().getTime() + '.jpg'
    };
    this.handleChecked = this.handleChecked.bind(this); // set this, because you need get methods from CheckBox 
    this.uplodedPicPath = 'http://proj.ruppin.ac.il/bgroup29/test1/uploadFiles/';

  }

  componentWillUnmount() {
    this._unsubscribe();
  }


  componentDidMount() {
    //let cameraDetailsJSON =  AsyncStorage.getItem('cameraDetails');
    //const cameraDetailsObj =  JSON.parse(cameraDetailsJSON);

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



    });


  }



  btnUpload = () => {
    let img = this.state.picUri;
    let imgName = this.state.picName;
    this.imageUpload(img, imgName);
  }

   

  imageUpload = (imgUri, picName) => {
    let urlAPI = "http://proj.ruppin.ac.il/bgroup29/test1/uploadpicture";
    let dataI = new FormData();
    dataI.append('picture', {
      uri: imgUri,
      name: picName,
      type: 'image/jpg'
    });
    const config = {
      method: 'POST',
      body: dataI,
    };


    fetch(urlAPI, config)
      .then((res) => {
        console.log('res.status=', res.status);
        if (res.status == 201) {
          return res.json();
        }
        else {
          console.log('error uploding ...1');
          return "err";
        }
      })
      .then((responseData) => {
        console.log(responseData);
        if (responseData != "err") {
          let picNameWOExt = picName.substring(0, picName.indexOf("."));
          let imageNameWithGUID = responseData.substring(responseData.indexOf(picNameWOExt), responseData.indexOf(".jpg") + 4);
          this.setState({
            uplodedPicUri: { uri: this.uplodedPicPath + imageNameWithGUID },
          });
          
          let userDetails = {
            ImagePath: this.uplodedPicPath + imageNameWithGUID
          }
      
          
          AsyncStorage.mergeItem('user', JSON.stringify(userDetails), () =>
          AsyncStorage.removeItem('cameraDetails'));
          this.props.navigation.navigate('RegistrationP4');
        
          console.log(this.state.uplodedPicUri);
          
        }
        else {
          console.log('error uploding ...2');
          alert('error uploding ...2');
        }
      })
      .catch(err => {
        alert('err upload= ' + err);
      });
  }







  handleChecked() {
    this.setState({ isChecked: !this.state.isChecked });
  }

  render() {

    const { picUri } = this.state;

    return (
      <View style={styles.screen}>
        <Header />
        <BackButton goBack={() => navigation.navigate('RegistrationP2')} />
        <Text style={styles.subTitle}>
          הגדר את תמונת הפרופיל שלך
       </Text>
        <Image
          style={{ width: 200, height: 200, marginTop: '10%', }}
          source={{ uri: 'https://cdn1.iconfinder.com/data/icons/business-users/512/circle-512.png' }}
        />
        <View style={styles.icon}>
          <OurButton onPress={() => this.props.navigation.navigate('CameraPage')}><SimpleLineIcons name="camera" size={40} color="black" /></OurButton>
          <Text style={styles.textOr}> או </Text>
          <OurButton onPress={() => this.props.navigation.navigate('ImageGallery')}><SimpleLineIcons name="picture" size={40} color="black" /></OurButton>

        </View>

        {this.state.picUri === 'https://cdn1.iconfinder.com/data/icons/business-users/512/circle-512.png' ? null : <Image
          style={{ alignSelf: 'center', width: 300, height: 250 }}
          source={{ uri: this.state.picUri }} />}


        <View style={{ width: '80%', paddingBottom: 20 }}>
          <Button
            title={'המשך'} onPress={() => {
              this.btnUpload();
             
            }}
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
  screen: {
    backgroundColor: colors.reeBackgrouond,
    height: '100%',
    alignItems: 'center'
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
  icon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20
  },

  textOr: {
    fontFamily: 'rubik-regular',
    fontWeight: 'bold',
    fontSize: 30

  },
  checkBox: {
    flex: 1,
    flexDirection: "row",

  }
})