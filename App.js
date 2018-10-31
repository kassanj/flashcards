import React from 'react';
import { View, StyleSheet, Text, Platform, StatusBar } from 'react-native';
import Deck from './components/Deck';
import Card from './components/Card';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import DeckList from './components/DeckList';
import Home from './components/Home';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';

function AppStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-home' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? '#008080' : '#FFF',
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? '#FFF' : '#008080',
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = createStackNavigator({
  home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    },
  },
  Card: {
    screen: Card,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#FFF',
      headerStyle: {
        backgroundColor: '#008080',
      },
    }),
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#FFF',
      headerStyle: {
        backgroundColor: '#008080',
      },
    }),
  },
});


export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <AppStatusBar />
          <Tabs />
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
