import React from 'react';
import { View, StyleSheet, Text, Platform, StatusBar, TouchableOpacity } from 'react-native';

import Deck from './components/Deck';
import Card from './components/Card';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import DeckList from './components/DeckList';
import Quiz from './components/Quiz';
import Home from './components/Home';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { createBottomTabNavigator, createStackNavigator, navigationOptions } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';

import { Plus } from './utils/styles';

function AppStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const MainNavigator = createStackNavigator({
  DeckList: {
    screen: DeckList
  },
  Deck: {
    screen: Deck
  },
  AddDeck: {
    screen: AddDeck
  },
  AddCard: {
    screen: AddCard
  },
  Quiz: {
    screen: Quiz
  },
  initialRouteName: 'DeckList'
});


// Navbar, with + to add new deck
DeckList.navigationOptions = ({ navigation }) => ({
  title: 'Decks',
  headerRight: (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('AddDeck');
      }}
    >
      <Plus>+</Plus>
    </TouchableOpacity>
  )
});


export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <AppStatusBar />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
