import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text, CheckBox, Picker, ScrollView } from 'react-native';
import Header from '../components/Header';
import { SimpleLineIcons } from '@expo/vector-icons';
import GenderButton from '../components/GenderButton';
import colors from '../assets/constant/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';


export default class RegistrationP1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userPrivateName: '',
            userLastName: '',
            nameIsPrivate: false,
            yearOfBirth: '2020',
            gender:''
        };

    }


    render() {
        const years = ["2020", "2019", "2018", "2017", "2016", "2015"];
        return (
            <ScrollView>
            <View style={styles.screen}>
              <Header />
                <View style={styles.container}>
                    <Text style={styles.subTitle} >
                        מה שמך?
                   </Text>
                    <Text style={styles.note} >
                        השימוש בשמך האמיתי יקל על חברים לזהות אותך.
                    </Text>
                    <TextInput
                        value={this.state.userPrivateName}
                        onChangeText={(userPrivateName) => this.setState({ userPrivateName })}
                        placeholder={'שם פרטי'}
                        style={styles.input}
                    />
                    <TextInput
                        value={this.state.userLastName}
                        onChangeText={(userLastName) => this.setState({ userLastName })}
                        placeholder={'שם משפחה'}
                        style={styles.input}
                    />
                    <View style={styles.checkbox}>
                        <CheckBox onChange={(nameIsPrivate) => this.setState({ nameIsPrivate})} />
                        <Text style={{ paddingTop: 3 }}>אני מאשר לחשוף את שמי למשתמשים באפליקציה</Text>
                    </View>
                    <Text style={styles.subTitle} >
                        מהי שנת הלידה שלך?
                    </Text>
                    <Text style={styles.note} >
                        ניתן לבחור בהמשך מי יראה את זה מהפרופיל שלך.
                    </Text>
                    <Picker
                        mode="dialog"
                        style={{ width: 55, backgroundColor: 'white'}}
                        selectedValue={this.state.yearOfBirth}
                        onValueChange={(value) => this.setState({ yearOfBirth: value })}>
                        {years.map((item) => {
                            return (<Picker.Item label={item} value={item} key={item}/>);
                        })}
                    </Picker>
                    <Text style={styles.subTitle} >
                        מהו מינך?
                   </Text>
                   <View style={styles.genderView}>
                    <GenderButton onPress={() => this.setState({ gender: 'male' })}><SimpleLineIcons name="user" size={40} color="black"/></GenderButton>
                    <GenderButton onPress={() => this.setState({ gender: "female" })} ><SimpleLineIcons name="user-female" size={40} color="black"/></GenderButton>
                    <GenderButton onPress={() => this.setState({ gender: "other" })}><SimpleLineIcons name="user-follow" size={40} color="black"/></GenderButton>
                    </View>
                   <View style={styles.genderView}>
                   <Text style={
                       this.state.gender==='male'? styles.genderNoteSelected : styles.genderNote} >גבר </Text>
                   <Text style={ this.state.gender==='female'? styles.genderNoteSelected : styles.genderNote}  >אישה </Text>
                   <Text style={ this.state.gender==='other'? styles.genderNoteSelected : styles.genderNote}  >אחר </Text>
                   </View>
                    <View style={styles.button}>
                        <Button
                            title={'המשך'}
                        />
                    </View>
                </View>
            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#E0CEBA'
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
    genderView:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'space-between', 
        marginTop: 15
    },
    genderNote:{
       marginVertical: 1,
        marginBottom: 10,
        fontSize: 14,
        color: 'black',
        marginRight: 35,
        marginLeft:35   
    },
    genderNoteSelected:{
        marginVertical: 1,
        marginBottom: 10,
        fontSize: 20,
        color: colors.subTitle,
        marginRight: 35,
        marginLeft:35,
        fontWeight:'bold'   
    }
});
