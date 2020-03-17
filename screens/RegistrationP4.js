import MapView from 'react-native-maps';
import React, { Component } from 'react';
import { FlatList, Button, View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import Header from '../components/Header';
import { SearchBar } from 'react-native-elements';
import colors from '../assets/constant/colors';
import MapComponent from '../components/MapComponent';
import { ListItem } from 'react-native-elements'
import { Thumbnail, Right } from 'native-base';

export default class RegistrationP4 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            street: '',
            city: '',
            search: '',
            searchStreet: '',
            round: true,
            allCities: [
                {
                    CityName: "תל מונד",
                    CityCode: 7,
                    Size: 1000
                },
                {
                    CityName: "תל אביב",
                    CityCode: 8,
                    Size: 2000
                },
                {
                    CityName: "חיפה",
                    CityCode: 9,
                    Size: 200000
                }

            ],
            choosenCity: {},
            cittiesFilteredArray: [],
            isLoading: false
        };
    }


    updateSearch = search => {
        this.setState({ search }, () => {
            this.updateCitiesArray();
        });
    }



    updateCitiesArray = () => {
        let city = this.state.allCities;
        let filteredCities = [];
        for (let index = 0; index < this.state.allCities.length; index++) {
            if (city[index].CityName.startsWith(this.state.search)) {
                filteredCities.push(city[index]);
            }
        }
        this.setState({ cittiesFilteredArray: filteredCities })
    };



    updateChoosenCity = (city) => {
        this.setState({ choosenCity: city, search: '' })
    };


    // componentDidMount() {
    //     return fetch('http://localhost:50456/api/City', {
    //         method: 'GET',
    //         headers: new Headers({
    //             'Content-Type': 'application/json; charset=UTF-8',
    //         })
    //     })
    //         .then(res => {
    //             console.log('res=', res);
    //             console.log('res.status', res.status);
    //             console.log('res.ok', res.ok);
    //             return res.json();
    //         })
    //         .then(
    //             (result) => {
    //                 console.log("fetch btnFetchGetCities= ", result);
    //                 this.setState({ allCities: result, isLoading: false })

    //             },
    //             (error) => {
    //                 console.log("err post=", error);
    //             });
    // }


    render() {
        const { search } = this.state;
        const { searchStreet } = this.state;

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 100 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (

            <View style={styles.screen}>
                <Header />
                <View style={styles.container}>
                    <Text style={styles.subTitle} >
                        בחר מקום מגורים
                   </Text>
                    <SearchBar
                        placeholder="חפש עיר/ישוב"
                        onChangeText={this.updateSearch}
                        value={search}
                        lightTheme={true}
                        round={true}
                        containerStyle={styles.SearchBar}
                        inputContainerStyle={styles.ContainerSearchBar}

                    />
                    <Text>מקום מגורים נבחר - {this.state.choosenCity.CityName} </Text>


                    {/* <Text style={styles.note} >
                        {this.state.allCities[0].CityName}
                    </Text> */}
                    {this.state.search === '' ?
                        <View style={styles.streetContainer}>
                            <Text style={styles.subTitle} >
                                בחר רחוב
                    </Text>
                            <SearchBar
                                placeholder="חפש שם רחוב"
                                value={searchStreet}
                                lightTheme={true}
                                round={true}
                                containerStyle={styles.SearchBar}
                                inputContainerStyle={styles.ContainerSearchBar}

                            /></View>
                        :
                        this.state.cittiesFilteredArray.map((l, i) => (
                            <ListItem
                                key={l.CityCode}
                                title={l.CityName}
                                bottomDivider
                                style={styles.cititiesList}
                                onPress={() => this.updateChoosenCity(l)}

                            />
                        ))
                    }
                    <MapComponent/>
                    <Button title={'סיום'} />

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ecf0f1'
    },
    streetContainer: {
        flex: 1,
        width: "85%"
    },
    SearchBar: {
        backgroundColor: '#ecf0f1',
        width: "85%",

    },
    ContainerSearchBar: {
        backgroundColor: "#DCDCDC",
        
    },
    subTitle: {
        marginVertical: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.subTitle,
        paddingTop: 25,
    },

    screen: {
        flex: 1
    },
    cititiesList: {
        width: "90%"
    }
});
