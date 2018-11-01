import React, { Component } from 'react'
import { connect } from 'react-redux';
import navigationOptions from 'react-navigation';

import { addCard } from '../actions'

import { saveNewCardToDeck } from '../utils/api'
import { timeToString } from '../utils/helpers'
import { PageContainer, Input, Button, ButtonTitle } from '../utils/styles';


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
  }

  render() {

    const { question, answer } = this.state;

    return (
      <PageContainer>
        <Input
         style={{height: 40}}
         placeholder="Question"
         onChangeText={question => this.setState({ question })}
         value={question}
       />
        <Input
          style={{height: 40}}
          placeholder="Answer"
          onChangeText={answer => this.setState({ answer })}
          value={answer}
        />
        <Button onPress={this.submit}>
          <ButtonTitle>Add Card</ButtonTitle>
        </Button>
      </PageContainer>
    )
  }
}

export default connect()(AddCard)
