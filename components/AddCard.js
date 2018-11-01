import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { saveNewCardToDeck } from '../utils/api'
import { timeToString } from '../utils/helpers'
import { addCard } from '../actions'


class AddCard extends Component {

  state = { question: '', answer: '' };

  submit = () => {

    const title = this.props.navigation.state.params.item.title;
    const card = { question: this.state.question, answer: this.state.answer };

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

    const { question, answer } = this.state;

    return (
      <View>
        // Add question and answer inputs and submit
        <TextInput
         style={{height: 40}}
         placeholder="Question"
         onChangeText={question => this.setState({ question })}
         value={question}
       />

       <TextInput
        style={{height: 40}}
        placeholder="Answer"
        onChangeText={answer => this.setState({ answer })}
        value={answer}
      />
      <TouchableOpacity onPress={this.submit}>
        <Text>Submit</Text>
      </TouchableOpacity>

      </View>
    )
  }
}

export default connect()(AddCard)
