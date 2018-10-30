import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { submitEntry, removeEntry } from '../utils/api'
import { timeToString } from '../utils/helpers'



class AddDeck extends Component {

  submit = () => {
    const key = timeToString()
    const entry = this.state
    // Update Redux
    // Navigate to home
    submitEntry({ key, entry })
    // Clear local notification
  }

  remove = () => {
    // Update Redux
    // Route to Home
    removeEntry(key)
  }

  render() {

    return (
      <View>
        <Text>Add Deck</Text>
      </View>
    )
  }
}

export default AddDeck
