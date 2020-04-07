import React, { Component } from 'react';
import { Button, View, StyleSheet, Text, ActivityIndicator,TextInput } from 'react-native';
import Header from '../components/Header';
import colors from '../assets/constant/colors';
import MapComponent from '../components/MapComponent';
import GenderButton from '../components/GenderButton';
import { SimpleLineIcons } from '@expo/vector-icons';


export default class FindNeighboor extends Component {
    constructor(props) {
        super(props);
        this.state = {
        neiName:'',
        usersAround:[],
        region: {
            //latitude: this.props.user.lat,
            //longitude: this.props.user.lan,
            latitude: 32.253330,
            longitude: 34.918060,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003
        },
        //user: props.navigation.getParam('user')
    };
 }

    

    fetchSearchNeiByName=()=> {
        searchKeys={
        FirstName: this.state.neiName,
        CityName: this.state.user.CityName
        }
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
                    this.setState({ usersAround: result })
                },
                (error) => {
                    console.log("err post=", error);
                });
                
    }

    onMapRegionChange(region) {
        this.setState({ region });

    }
    render() {
        // if (this.state.isLoading) {
        //     return (
        //         <View style={{ flex: 1, padding: 100 }}>
        //             <ActivityIndicator />
        //         </View>
        //     );
        // }
        return (

            <View style={styles.screen}>
                <Header />
                    <Text style={styles.subTitle} >
                       הכר את שכניך
                   </Text>
                   <TextInput
                        value={this.state.neiName}
                        onChangeText={(neiName) => this.setState({ neiName })}
                        placeholder={'חפש שם של שכן..'}
                        style={styles.input}
                    />
                    <Button  title={'חפש'}
                    onPress={()=>this.fetchSearchNeiByName()}
                    style={styles.buttonSearch}/>
            <MapComponent
            region={this.state.region}
            onRegionChange={(reg) => this.onMapRegionChange(reg)} 
            />
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