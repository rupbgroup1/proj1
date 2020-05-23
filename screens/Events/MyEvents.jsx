import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, Image, ScrollView, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import colors from '../../assets/constant/colors';
import { SearchBar, Card, Button, Overlay } from 'react-native-elements';
import OurButton from '../../components/OurButton';
import { MaterialIcons } from '@expo/vector-icons';
import ProfileButton from '../../components/ProfileButton';

export default class MyEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      allEvents: {},
      isLoading: true,
      text: '',
      filteredArray: [],
      visible: false,
      selectedCat: 0

    };
    this.arrayholder = [];
    this.catArray = [];


  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    AsyncStorage.getItem('user', (err, userJSON) => {
      const userObj = JSON.parse(userJSON);
      //console.log("obj==", userObj);
      this.setState({ user: userObj }, () =>
        this.fetchGetMyEvents(userObj.UserId));
    }
    );

  }
  //I'm the owner
  fetchGetMyEvents(userId) {
    console.log("in fetch");
    return fetch('http://proj.ruppin.ac.il/bgroup1/prod/api/Events/My?userId=' + userId, {

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
          if (result.length > 0) {
            console.log("Events = ", result);
            this.arrayholder = result;
            this.setState({ filteredArray: result })
          }
          else
            Alert.alert(" מצטערים, אנו נסו שנית!");
        },
        (error) => {
          console.log("err post=", error);
          Alert.alert("מצטערים, אנו נסו שנית!");
        }
      );
  }

  //filter the events by text
  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.Name;
      return itemData.indexOf(text) > -1;
    });
    console.log("filter==", newData);
    newData.length < 1 && Alert.alert("לא נמצאו תוצאות");
    text != '' ?
      this.setState({
        //setting the filtered newData on datasource
        filteredArray: newData,
        text: text,
      })
      : this.setState({ filteredArray: this.arrayholder, text: text });
  }

  //press on plus
  createNewEvent() {
    console.log("hi");
  }

  toggleOverlay() {
    this.setState({ visible: false });
  }



  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
        <Header />
        <BackButton goBack={() => navigation.navigate('MainPage')} />
        <View style={styles.row}>
          <SearchBar
            placeholder="חפש/י.."
            onChangeText={text => this.SearchFilterFunction(text)}
            onClear={text => this.SearchFilterFunction('')}
            value={this.state.text}
            lightTheme={true}
            inputContainerStyle={{ backgroundColor: 'white' }}
            containerStyle={{ width: '90%', backgroundColor: colors.reeBackgrouond }}
          />
          <OurButton
            title='add'
            key='add'
            onPress={() => this.createNewEvent()}>
            <MaterialIcons name="add-circle" size={30} color={colors.turkiz} style={styles.addIcon} />
          </OurButton>
        </View>

        <ScrollView>
          {
            this.state.filteredArray.length > 0 &&
            this.state.filteredArray.map((e) => {

              return (

                <Card
                  key={e.Id}
                  title={e.Name}
                  image={{ uri: e.Image }}
                  style={{ marginLeft: 0, marginRight: 0 }}
                  containerStyle={{ width: Dimensions.get('window').width - 20 }}
                >

                  <Text style={{ marginBottom: 10 }}>{e.Desc}</Text>
                  <View style={{ alignItems: "flex-end", direction: 'rtl', flexDirection: 'row' }}>
                    <MaterialIcons name="date-range" size={20} color={'black'}></MaterialIcons>
                    <Text style={{ color: 'black', marginRight: 20 }}>{new Date(e.StartDate).toLocaleDateString()}</Text>
                  </View>
                  <Button
                    title='ראה פרטים'
                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                    onPress={() => this.setState({ visible: true })}
                  ></Button>
                  <Overlay isVisible={this.state.visible} onBackdropPress={() => this.toggleOverlay()}>
                    <Card
                      key={e.Id}
                      image={{ uri: e.Image }}
                      title={e.Name}
                      style={{ marginLeft: 0, marginRight: 0 }}
                    >

                      <Text style={{ marginBottom: 10 }}>{e.Desc}</Text>
                      <View style={{ alignItems: "flex-end", direction: 'rtl', flexDirection: 'row' }}>
                        <MaterialIcons name="date-range" size={20} color={'black'}></MaterialIcons>
                        <Text style={{ color: 'black', marginRight: 20 }}>{new Date(e.StartDate).toLocaleDateString()} - </Text>
                        <Text style={{ color: 'black', marginRight: 20 }}>{new Date(e.EndDate).toLocaleDateString()}</Text>
                      </View>
                      <Text>מספר משתתפים: {e.NumOfParticipants}</Text>
                      <Text>מחיר: {e.Price}</Text>
                      <Text>טווח גילאים: {e.ToAge + ' - ' + e.FromAge}</Text>
                      <TouchableOpacity

                        onPress={() => this.setState({ visible: false })}>
                        {/* nav to map */}
                        <Text>לחץ לצפייה במיקום האירוע</Text>
                      </TouchableOpacity>
                      <Button
                        type="outline"
                        raised={true}
                        title='עריכה'
                        onPress={() =>
                          this.setState({visible:false},()=>
                          navigation.navigate('CreateEvent', {edit: true, eventDetails: e}))
                        }
                      > </Button>
                    </Card>

                  </Overlay>

                </Card>

              )
            }
            )}
        </ScrollView>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  imageCard: {
    resizeMode: 'cover'
  },
  title: {
    alignItems: 'center',
    fontSize: 24,
    color: colors.turkiz,
    fontFamily: 'rubik-regular'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'stretch',

    marginLeft: 0,
    marginRight: 0
  },
  addIcon: {
    marginTop: 15,
  }
});

