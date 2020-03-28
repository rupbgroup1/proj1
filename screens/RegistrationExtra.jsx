import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text, Picker } from 'react-native';
import Header from '../components/Header';
import colors from '../assets/constant/colors';
import { Input } from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';



export default class RegistrationExtra extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jobType: '',
            jobArea: '',
            aboutMe: '',
            familyStatus: '',
            numOfKids: '0',
            kidsYearOfBirth: '',
            intresrs: '',
            acceptInvitations: true,
            selectedYears: []
        };
       
    }
        // fetchPostNewUser = () => {
        //     const newUser = {
        //         Email: this.state.Email,
        //         Password: this.state.Password,
        //         FirstName: this.state.userPrivateName,
        //         LastName: this.state.userLastName,
        //         Gender: this.state.gender,
        //         YearOfBirth: this.state.yearOfBirth,
        //         IsPrivateName: this.state.IsPrivateName

        //     }
        //     fetch('http://proj.ruppin.ac.il/bgroup1/test1/tar1/api/User', {
        //         method: 'POST',
        //         body: JSON.stringify(newUser),
        //         headers: new Headers({
        //             'Content-type': 'application/json; charset=UTF-8'
        //         })
        //     })
        //         .then(res => {
        //             //console.log('res=', res);
        //             return res.json()
        //         })
        //         .then(
        //             (result) => {
        //                 console.log("fetch POST= ", result);
        //                 this.props.navigation.navigate('Pic');
        //             },
        //             (error) => {
        //                 console.log("err post=", error);
        //                 Alert.alert("אנא נסה שנית");
        //             }
        //         );


        // }

        
        onSelectedItemsChange = selectedYears => {
            this.setState({ selectedYears });
        }
        render() {
            const thisYear = (new Date()).getFullYear();
            const years = Array.from(new Array(60), (index, val) => (thisYear - index).toString());

            const { navigation } = this.props;
            return (

                <View style={styles.screen} >
                    <Header />
                    <View style={styles.container}>
                        <Text style={styles.subTitle} >
                            פרטים נוספים
                   </Text>
                        <Input
                            value={this.state.jobType}
                            label='תחום עבודה'
                            placeholder='הוספ/י'
                            onChangeText={(jobType) => this.setState({ jobType })}
                            containerStyle={{ width: '90%', padding: 10 }}
                            rightIcon={{}}
                        />
                        <Input
                            value={this.state.jobArea}
                            label='מקום עבודה'
                            placeholder='הוספ/י'
                            onChangeText={(jobArea) => this.setState({ jobArea })}
                            containerStyle={{ width: '90%', padding: 10 }}
                        />
                        <Input
                            value={this.state.aboutMe}
                            label='קצת על עצמי'
                            placeholder='כתוב/י תיאור..'
                            onChangeText={(aboutMe) => this.setState({ aboutMe })}
                            containerStyle={{ width: '90%', padding: 10 }}
                            multiline={true}
                        />
                        <Input
                            value={this.state.numOfKids}
                            label='מספר ילדים'
                            placeholder='0'
                            onChangeText={(numOfKids) => this.setState({ numOfKids })}
                            containerStyle={{ width: '90%', padding: 10 }}
                        />
                        <MultiSelect
                            styleDropdownMenu
                            items={years}
                            uniqueKey="id"
                            //ref={(component) => { this.multiSelect = component }}
                            onSelectedItemsChange={this.onSelectedItemsChange}
                            selectedItems={this.state.selectedYears}
                            selectText="בחר שנים"
                            searchInputPlaceholderText="חפש שנת לידה"
                            onChangeInput={(text) => console.log(text)}
                            //altFontFamily="ProximaNova-Light"
                            tagRemoveIconColor="#CCC"
                            tagBorderColor="#CCC"
                            tagTextColor="#CCC"
                            selectedItemTextColor="#CCC"
                            selectedItemIconColor="#CCC"
                            itemTextColor="#000"
                            displayKey="name"
                            searchInputStyle={{ color: '#CCC' }}
                            submitButtonColor="#CCC"
                            submitButtonText="Submit"
                        />
                        
                        {/* <Picker
                            prompt='בחר'
                            mode='dropdown'
                            style={{ width: 55, backgroundColor: 'white' }}
                            selectedValue={this.state.yearOfBirth}
                            onValueChange={(value) => this.setState({ yearOfBirth: value })}>
                            {years.map((item, index) => {
                                return (<Picker.Item label={item} value={item} key={index} />);
                            })}
                        </Picker> */}
                        
                        <View style={styles.button}>
                            <Button
                                title={'המשך'} onPress={() => {
                                    if (this.state.userPrivateName.trim() === "" || this.state.userLastName.trim() === "") {
                                        this.setState(() => ({ nameError: "אנא מלא/י שם פרטי ושם משפחה" }));
                                    }
                                    else this.fetchPostNewUser()
                                }}
                            />
                        </View>
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
        input: {
            width: '80%',
            height: 44,
            padding: 10,
            borderWidth: 1,
            borderColor: 'white',
            marginBottom: 10,
            textAlign: 'right',
            backgroundColor: 'white'
        },
        subTitle: {
            marginVertical: 1,
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.subTitle,
            paddingTop: 25
        },
        note: {
            marginVertical: 1,
            marginBottom: 10,
            fontSize: 14,
            color: 'black'
        },
        forgotPassword: {
            color: 'blue',
            textAlign: 'left'
        },
        button: {
            width: '50%',
            paddingTop: 20
        },
        createUser: {
            padding: 30,
            flexDirection: 'row'
        },
        screen: {
            flex: 1
        },
        checkbox: {
            flexDirection: 'row'
        },
        genderView: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'space-between',
            marginTop: 15
        },
        genderNote: {
            marginVertical: 1,
            marginBottom: 10,
            fontSize: 14,
            color: 'black',
            marginRight: 35,
            marginLeft: 35
        },
        genderNoteSelected: {
            marginVertical: 1,
            marginBottom: 10,
            fontSize: 20,
            color: colors.subTitle,
            marginRight: 35,
            marginLeft: 35,
            fontWeight: 'bold'
        }
    });
