import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { submitCard } from '../utils/api'
import { timeToString } from '../utils/helpers'
import { addCard } from '../actions'


class AddCard extends Component {


  submit = () => {
    const key = timeToString()
    const card = this.state

    // Update Redux
    this.props.dispatch(addCard({
      [key]: entry
    }))

    // Route to home
    this.toHome()

    // Save to "DB"
    submitCard({ key, entry })

    // Clear local notification
  }

  render() {
    return (
      <View>
        // Add question and answer inputs and submit
        <Text>Add Card</Text>
      </View>
    )
  }
}

export default AddCard
