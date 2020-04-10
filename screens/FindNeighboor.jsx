import React, { Component } from 'react';
import { Button, View, StyleSheet, Text, ActivityIndicator,TextInput, AsyncStorage } from 'react-native';
import Header from '../components/Header';
import colors from '../assets/constant/colors';
import MapComponent from '../components/MapComponent';
import GenderButton from '../components/GenderButton';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Marker } from 'react-native-maps';


export default class FindNeighboor extends Component {
    constructor(props) {
        super(props);
        this.state = {
        searchName:'',
        usersAround:[],
        region: {
            latitudeDelta: 0.004,
            longitudeDelta: 0.004,
            //for now: **delete**
            latitude: 32.253330,
            longitude: 34.918060
            
        },
    };
 }

 componentDidMount(){
    this.getUser();
 }

 async getUser(){
    let userJSON =  await AsyncStorage.getItem('user');
    const userObj = await JSON.parse(userJSON);
    //console.log(userJSON);
    //console.log(userObj);
    this.setState({user:userObj});
    this.setState({region:{
        ...this.state.region,
        latitude: userObj.Lat,
        longitude: userObj.Lan
    }});
 }
    

    fetchSearchNeiByName=()=> {
        searchKeys={
        FirstName: this.state.searchName,
        CityName: this.state.user.CityName
        }
       // console.log(this.state.searchName+this.state.user.CityName);
        return fetch('http://proj.ruppin.ac.il/bgroup1/test1/tar1/api/Neighboors/userName', {
            method: 'POST',
            body: JSON.stringify(searchKeys),
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8'
            })
        })
            .then(res => {
                console.log('res=', res);
                return res.json();
            })
            .then(
                (result) => {
                    console.log("fetch result= ", result);
                    this.setState({ usersAround: result });
                    
                },
                (error) => {
                    console.log("err post=", error);
                });
                
    }

    onMapRegionChange(region) {
        this.setState({ region });

    }

    render() {
        
        return (
            <View style={styles.screen}>
                <Header />
                    <Text style={styles.subTitle} >
                       הכר את שכניך
                   </Text>
                   <TextInput
                        value={this.state.searchName}
                        onChangeText={(searchName) => this.setState({ searchName })}
                        placeholder={'חפש שם של שכן..'}
                        style={styles.input}
                    />
                    <Button  title={'חפש'}
                    onPress={()=>this.fetchSearchNeiByName()}
                    style={styles.buttonSearch}/>
                    <View style={{flex:1}}>
            <MapComponent
            region={this.state.region}
            onRegionChange={(reg) => this.onMapRegionChange(reg)}
            />
            </View>
            <Button  title={'המשך'}

            /> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    subTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.subTitle,
        paddingTop: 25, 
        paddingBottom:10,
        justifyContent:"center",
        alignItems:"center"
    },
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    input: {
        height:35,
        paddingTop:5,
        backgroundColor: 'white',
        borderRadius: 10,
        width:'80%',
        paddingRight:5
        
    },
    buttonSearch:{
        width:'100%'
    }

});