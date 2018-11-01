import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux';
import navigationOptions from 'react-navigation';
import { getDecks } from '../utils/api';
import { receiveDecks } from '../actions';


class DeckList extends Component {

  componentDidMount() {
    getDecks().then(decks => this.props.dispatch(receiveDecks(decks)));
  }

  render() {

    return (
      <View>
        // Loop through Decks
        <Text>Deck List</Text>
          <FlatList
            data={Object.values(this.props.allDecks)}
            renderItem={({item}) =>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Deck', {
                  title: item.title
                });
              }}
            >
              <Text>{item.title}</Text>
           </TouchableOpacity>
           }
           keyExtractor={item => item.title}
          />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  allDecks: state.decks || []
});

export default connect(mapStateToProps)(DeckList);
