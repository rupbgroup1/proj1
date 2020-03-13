import React from 'react';
import { Alert, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import styles from './pageStyle';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

export default class CameraPage extends Component {
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
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({ quality: 0.2 });
     
      this.setState({ photoUri: photo.uri });
      
      Alert.alert(
        'Would you like to save the picture?',
        '',
        [
          {text: 'yes', onPress: () => this.props.navigation.navigate('AddNote', {photoUri: photo.uri})},
          {
            text: 'No',
            style: 'cancel',
          }],
       
      );

      
     
    }
  };

  btnUpload = () => {
    let img = this.state.photoUri;
    let imgName = 'imgFromCamera.jpg';
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
                        style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                        {' '}Flip{' '}
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
                    source={require('../../assets/camera-shutter.png')} />
                </View>
              </TouchableOpacity>
              {/* <ActionButton icon="camera" onPress={this.btnLocation} /> */}
            </View>
           
          </View>
        
      );
    }
  }
}

