import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, AsyncStorage, Alert, FlatList } from 'react-native';
import MapComponent from '../../components/Maps/MapComponent'
import GoogleAPIAutoComplete from '../../components/Maps/GoogleAPIAutoComplete';
import { getLocation } from '../../components/Maps/GeoCodes';
import colors from '../../assets/constant/colors';


export default class EventLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 32.358049736540236,
                 longitude: 34.92328689199281,
                 latitudeDelta: 0.009,
                 longitudeDelta: 0.009
            },
            CityName: '',
            NeiName: '',
            searchData: [],
            canSubmit: false,
            Location:""

        };
    }


    componentDidMount() {
        getLocation().then(
            (data) => {
                //console.log(data);
                this.setState({
                    region: {
                        latitude: data.latitude,
                        longitude: data.longitude,
                        latitudeDelta: 0.003,
                        longitudeDelta: 0.003

                    }
                });
            }
        );
    }


    getCoordsFromName(loc) {
        //console.log(loc);
        this.setState({
            mapVisible: true,
            region: {
                latitude: loc.lat,
                longitude: loc.lng,
                longitudeDelta: 0.003,
                latitudeDelta: 0.003
            }
        });
    }

    //when choosing the location on map
    onMapRegionChange(region) {
        this.setState({ ...this.state.region, region });
        this.props.navigation.setParams({region});
        console.log("reg=", this.props.navigation.getParam("region"));
        

    }

    handleCityName(name) {
        this.setState({ CityName: name });
        console.log(name);
    }

    handleFullName(name) {
        //this.setState({ Location: name });
        this.props.navigation.setParams({ Location: name });
        console.log("reg=", this.props.navigation.getParam("Location"));
    }

    render() {
        return (
            <View style={styles.screen}>
            <View style={styles.topPage}>
                <Text style={styles.subTitle}>חפש מיקום או סמן על גבי המפה</Text>
                <GoogleAPIAutoComplete style={styles.API} notifyChange={(loc) => this.getCoordsFromName(loc)} FullAddress={(name) => this.handleFullName(name)} CityName={(name)=>this.handleCityName(name)} />

            </View>

            <View style={styles.bottomPage}>

                <View style={styles.map}>
                    <MapComponent
                        region={this.state.region}
                        onRegionChange={(reg) => this.onMapRegionChange(reg)}
                        searchData={this.state.searchData}
                    />
                    <Button title={'שמור'}
                    onPress={() => {
                        this.props.navigation.getParam('type')==="e"?
                        this.props.navigation.navigate('CreateEvent',{region: this.props.navigation.getParam("region"), Location:this.props.navigation.getParam("Location")}) :
                        this.props.navigation.navigate('CreateService',{region: this.props.navigation.getParam("region"), Location:this.props.navigation.getParam("Location")})
                        
                    }}
                    style={styles.SaveButton}
                    />
                </View>

                

            </View>
            </View>
   );

    }
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent:'space-between',
        //alignContent: 'flex-start',
        alignItems: 'stretch',
        flexWrap: 'wrap',
        backgroundColor: colors.reeBackgrouond
        
    },
    topPage: {
        flex: 1,
        paddingTop:80,
        minHeight:200,
        
    },
    bottomPage: {
        flex: 4,
        paddingTop:10
    },
    subTitle: {
        fontFamily: 'rubik-regular',
        textAlign: 'center',
        marginBottom: 5,
        marginVertical: 1,
        fontSize: 20,
        //fontWeight: 'bold',
        color: colors.subTitle,
    },
    API: {
        paddingBottom: 20,
        paddingTop:80,

    },
    map: {
        flex:1,
        paddingBottom:100,
        justifyContent:'space-between'

    },
    SaveButton:{
        paddingTop:20
    }

});