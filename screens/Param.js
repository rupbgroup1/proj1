import React, { Component } from 'react';
import { Button, View, StyleSheet, Text, Picker, Alert } from 'react-native';
import colors from '../assets/constant/colors';
import { SimpleLineIcons, FontAwesome5 } from '@expo/vector-icons';
import OurButton from '../components/OurButton';
import { Dropdown } from 'react-native-material-dropdown';
import { ScrollView } from 'react-native-gesture-handler';

export default class Param extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paramArray: [],
            ParamNameHeb: '',
            paramId: ''
        }
    }

    componentDidMount = () => {
        this.fetchGetParams();

    }

    fetchGetParams() {
        return fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/Param', {

            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        })
            .then(res => {
                return res.json();
            })
            .then(
                (result) => {
                    console.log(result);
                    this.setState({ paramArray: result })

                },
                (error) => {
                    console.log("err post=", error);
                    Alert.alert("מצטערים, אנו נסו שנית!");
                }
            );
    }



    fetchPostNewParam = () => {
        let param = {
            CategoryId: this.state.paramId
        }
        fetch('http://proj.ruppin.ac.il/bgroup29/prod/api/Votes', {
            method: 'PUT',
            body: JSON.stringify(param),
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8'
            })
        })
            .then(res => {
                //console.log('res=', res);
                return res.json()
            })
            .then(
                (result) => {
                    console.log("fetch POST= ", result);
                    if (result === 1) {
                        this.props.navigation.navigate('FindNeighboor');
                        Alert.alert("תודה על תגובתך!");
                    }
                    else {
                        Alert.alert("מצערים, לא ניתן לשלוח כעת. אנא נסה מאוחר יותר")

                    }
                },
                (error) => {
                    console.log("err post=", error);
                    Alert.alert("אנא נסה שנית");
                }
            );

    }

    render() {
        const paramArray = this.state.paramArray;

        return (
            < View style={styles.container}>
                <ScrollView style={styles.container} >

                    <View style={{ paddingHorizontal: 15, paddingTop: 60 }}>
                        <OurButton onPress={() => this.props.navigation.navigate('FindNeighboor')}><FontAwesome5 name="times" size={30} color="grey" /></OurButton>

                    </View>


                    <View style={styles.titleView}>
                        <Text style={styles.title}> איזה מהפרמטרים הינו החשוב ביותר בהיכרותך עם שכניך? </Text>
                    </View>
                    <View>

                    </View>
                    <View style={{ fontFamily: 'rubik-regular', paddingTop: '20%', alignItems: 'center', justifyContent: 'center' }}>

                        <Dropdown
                            labelFontSize='20'
                            label='בחר/י פרמטר'
                            value={this.state.ParamNameHeb}
                            valueExtractor={({ ParamCode }) => ParamCode}
                            labelExtractor={({ ParamNameHeb }) => ParamNameHeb}
                            data={paramArray}
                            selectedItemColor={colors.subTitle}
                            onChangeText={(ParamNameHeb, ParamCode) => {
                                this.setState({
                                    paramId: ParamCode,
                                    ParamNameHeb: ParamNameHeb

                                });
                                //console.log(this.state.familyStatus)
                            }}
                            itemTextStyle={{ textAlign: "center", fontFamily: 'rubik-regular' }}
                            containerStyle={{ width: '90%', fontFamily: 'rubik-regular' }}
                            labelTextStyle={{ fontFamily: 'rubik-regular', alignItems: "center" }}



                        />
                    </View>
                    <View style={styles.button}>

                        <Button onPress={() => {
                            this.fetchPostNewParam()
                        }} title={"שלח"} />
                    </View>



                </ScrollView>



            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.regBackground,
    },
    title: {
        fontFamily: 'rubik-regular',
        marginVertical: 1,
        fontSize: 26,
        color: colors.subTitle,
        paddingTop: 25,
        paddingHorizontal: 20,
        textAlign: "center",

    },
    titleView:{
        paddingTop: 100
    },
    button: {
        width: '90%',
        paddingTop: 40,
        alignSelf: "center"
    },


});