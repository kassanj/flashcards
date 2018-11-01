import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import navigationOptions from 'react-navigation';

import { saveNewDeck } from '../utils/api';
import { timeToString } from '../utils/helpers';
import { addDeck } from '../actions';


class AddDeck extends Component {
  state = { title: '' };

  submit = () => {

    const { title } = this.state

    // Update Redux
    this.props.dispatch(addDeck({
      [title]: { title: title, questions:[] }
    }))

    // Save to "DB"
    saveNewDeck(title)

    // Route to Deck page
    this.props.navigation.navigate('DeckList', {
      title: title
    });

    // Clear local notification
  }

  render() {

    return (
      <View>
        // Add title input and 'Create Deck' button
      <TextInput
         onChangeText={(title) => this.setState({ title })}
         value={this.state.title}
       />
      <TouchableOpacity onPress={this.submit}>
          <Text style={{color:'blue'}}>Create Deck</Text>
      </TouchableOpacity>
      </View>
    )
  }
}

export default connect()(AddDeck);
