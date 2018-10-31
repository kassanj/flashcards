import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { submitDeck } from '../utils/api'
import { timeToString } from '../utils/helpers'
import { addDeck } from '../actions'


class AddDeck extends Component {

  submit = () => {
    const key = timeToString()
    const deck = this.state

    // Update Redux
    this.props.dispatch(addDeck({
      [key]: entry
    }))

    // Route to home
    this.toHome()

    // Save to "DB"
    submitDeck({ key, entry })

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
