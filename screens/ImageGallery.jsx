import React from 'react';
import { Alert, View, Button,  Image, KeyboardAvoidingView, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default class ImageGallery extends React.Component {
    static navigationOptions = {
        title: 'GALLERY',
    };

    constructor(props) {
        super(props);
        this.state = { 
            image: null,
        }
    }

    btnOpenGalery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
           
          });
      
      
          if (!result.cancelled) {
            this.setState({ image: result.uri });
          }


          Alert.alert(
            'האם תרצה לשמור את התמונה?',
            '',
            [
              {text: 'כן', onPress: () => this.props.navigation.navigate('Pic', {photoUri: result.uri})},
              {
                text: 'לא',
                style: 'cancel',
              }],
           
          );
    };

    render() {
        let { image } = this.state;

        return (
            <KeyboardAvoidingView behavior="padding"
                style={styles.container}>
               
                <View style={styles.Content}>
                    <View style={{ margin: 20 }}>
                        <Button
                            title="בחירת תמונה מהגלריה"
                            onPress={this.btnOpenGalery}
                        />
                    </View>
                    {image &&
                        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                </View>
            </KeyboardAvoidingView >
        );
    }
}
const styles = StyleSheet.create({
    
    Content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30,
      
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 40
},
  })