import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { saveNewCardToDeck } from '../utils/api'
import { timeToString } from '../utils/helpers'
import { addCard } from '../actions'


class AddCard extends Component {


  submit = () => {

    const title = this.props.navigation.state.params.item.title;
    const card = { question: this.state.question, answer: this.state.answer };
    // const title = deck title

    // Update Redux
    this.props.dispatch(addCard(title, card))

    // Save to "DB"
    saveNewCardToDeck(title, card)

    // Route to Deck page
    this.props.navigation.navigate('Deck', {
      title: title
    });

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
