import React, { Component } from 'react';
import { connect } from 'react-redux';
import navigationOptions from 'react-navigation';
import { saveNewDeck } from '../utils/api';
import { addDeck } from '../actions';
import { PageContainer, Input, Button, ButtonTitle } from '../utils/styles';


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
  }

  render() {

    return (
      <PageContainer>
        <Input
           onChangeText={(title) => this.setState({ title })}
           value={this.state.title}
           placeholder='Title'
         />
       <Button onPress={this.submit}>
          <ButtonTitle>Create Deck</ButtonTitle>
        </Button>
      </PageContainer>
    )
  }
}

export default connect()(AddDeck);
