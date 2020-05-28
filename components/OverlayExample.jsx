import React, { Component} from 'react';
import Overlay from 'react-native-elements';
import colors from '../assets/constant/colors';
import { Button, View, StyleSheet, Text, ActivityIndicator, TextInput, AsyncStorage, Alert, TouchableOpacity } from 'react-native';
 
export default class OverlayExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: true, 
            kidsYearOfBirth:[2007,2008],
            intrests:["כדורעף", "שחייה"],
            user: this.props.user
            
        }
    }
  
  onClose = () => this.setState({ modalVisible: false});
  
  render() {

    // להציג שנות לידה
    const kids = this.state.kidsYearOfBirth.map((buttonKids) => (
        <Text style={styles.note}> {new Date().getFullYear() - buttonKids}  </Text>
    ));

    const intrests = this.state.intrests.map((buttonIntersts) => (
        <Text style={styles.note}> {buttonIntersts},  </Text>
    ));
    const age = new Date().getFullYear() - this.state.user.YearOfBirth;
    const jobName = userObj.JobTitle!= null ? userObj.JobTitle.JobName : '';
    return (
        <Overlay visible={this.state.modalVisible} >
          <View>
              <Text style={styles.subTitle}>{this.state.user.FirstName} {this.state.user.LastName}</Text>
              <Text style={styles.note}>גיל: {age} </Text>
              <Text style={styles.note}>מגדר: (משתנה מגדר) </Text>
              <Text style={styles.note}> מצב משפחתי: {this.state.user.FamilyStatus} </Text>
              <Text style={styles.note}> מקצוע: {jobName}</Text>
              <Text style={styles.note}> מקום עבודה: {this.state.user.WorkPlace}</Text>
              <Text style={styles.note}> על עצמי: {this.state.user.AboutMe}</Text>
              <Text style={styles.note}>גילאי ילדים: {kids}</Text>
              <Text style={styles.note}>תחומי עניין: {intrests} </Text>
              <Text style={styles.note}>אירועים</Text>
              <Text style={styles.note}>עסק</Text>
              <Text style={styles.note}></Text>
              
              
          </View>
        </Overlay>
    );
  }
}

const styles = StyleSheet.create({
    subTitle: {
        fontFamily: 'rubik-regular',
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.subTitle,
        textAlign: "center",
        

    },

    note: {
        fontFamily: 'rubik-regular',
        //marginVertical: 1,
        fontSize: 20,
        color: 'black',
        //justifyContent:"center",
        textAlign: "center",
        padding:10
    },


})