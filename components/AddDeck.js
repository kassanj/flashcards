import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { submitDeck } from '../utils/api'
import { timeToString } from '../utils/helpers'
import { addDeck } from '../actions'


class AddDeck extends Component {

  submit = () => {

    const { title } = this.state

    // Update Redux
    this.props.dispatch(addDeck({
      [title]: { title: title, questions:[] }
    }))

    // Save to "DB"
    saveNewDeck(title)

    // Route to Deck page
    this.props.navigation.navigate('Deck', {
      title: title
    });

    // Clear local notification
  }

  render() {

    return (
      <View>
        // Add title input and 'Create Deck' button
        <Text>Add Deck</Text>
      </View>
    )
  }
}

export default AddDeck
