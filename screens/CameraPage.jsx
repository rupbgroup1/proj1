import React from 'react';
import { StyleSheet,Alert, Text, View, Dimensions, Image, TouchableOpacity, AsyncStorage} from 'react-native';
import { Camera } from 'expo-camera';

export default class CameraPage extends React.Component {
  static navigationOptions = {
    title: 'CAMERA',
  };
  constructor(props) {
  
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      photoUri: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
      uplodedPicUri: { uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }
    }

    
  }

  async componentDidMount() {
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  btnSnap = async () => {
    const {goBack} = this.props.navigation;
    //const {params} = this.props.navigation;

    if (this.camera) {
      let photo = await this.camera.takePictureAsync({ quality: 0.2, base64:true,});
     
      
      this.setState({ 
        pic64base:photo.base64,
        photoName: 'image1_' + new Date().getTime() + '.jpg',
        photoUri:photo.uri,
        //photoUri: photo.uri 
      },()=>
      
      Alert.alert(
        'האם תרצה לשמור את התמונה?',
        '',
        [
          {text: 'כן', onPress: () => {
            let cameraDetails={
              pic64base:this.state.pic64base,
              photoName: this.state.photoName,
              photoUri: this.state.photoUri
            };
            //console.log(cameraDetails);
            
            AsyncStorage.mergeItem('cameraDetails', JSON.stringify(cameraDetails),()=>
          goBack()
          );
          }},
          {
            text: 'לא',
            style: 'cancel',
          }],
       
      ));

      
     
    }
  };

  btnUpload = () => {
    let img = this.state.photoUri;
    let imgName = this.state.picName64base;
    this.imageUpload(img, imgName);
  };

 

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        
         
          <View style={styles.Content}>
           
              <View style={{
                flex: 1, width: '100%', margin: 10,
                justifyContent: 'flex-end', borderColor: 'black', borderWidth: 1
              }}>
                <Camera
                  ref={ref => { this.camera = ref; }}
                  style={{ flex: 1 }}
                  type={this.state.type}>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: 'transparent',
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      style={{
                        flex: 0.2,
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        this.setState({
                          type: this.state.type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back,
                        });
                      }}>
                      <Text
                        style={{ fontSize: 18, marginBottom: 10, color: 'white', fontFamily: 'rubik-regular' }}>
                        {' '}החלף מצלמה{' '}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Camera>
              </View>
     
            
            <View
              style={{
                position: 'absolute',
                bottom: 180,
                width: Dimensions.get('window').width - 10,
                flexDirection: 'row',
                paddingLeft: 10
              }}>
              <TouchableOpacity onPress={this.btnSnap}>
                <View style={{
                  width: 55,
                  height: 55,
                  borderRadius: 40,
                  justifyContent: 'center',
                  backgroundColor: 'lightblue'
                }}>
                  <Image
                    style={{
                      alignSelf: 'center', width: 25, height: 25,
                      borderRadius: 50
                    }}
                    source={require('../assets/camera-shutter.png')} />
                </View>
              </TouchableOpacity>
              {/* <ActionButton icon="camera" onPress={this.btnLocation} /> */}
            </View>
           
          </View>
        
      );
    }
  }
}

const styles = StyleSheet.create({
    
  Content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    
},
})

