import React, { Component } from 'react'
import { connect } from 'react-redux';
import navigationOptions from 'react-navigation';
import { clearLocalNotification, setLocalNotification } from '../utils/notifications'
import { PageContainer, Title, TitleBox, Subtext, Button, ButtonTitle } from '../utils/styles';


class Deck extends Component {

  static navigationOptions = {
    title: 'Deck'
  };

  render() {
    const { item } = this.props;

    return (
        <PageContainer>
          <TitleBox>
            <Title>{ item.title }</Title>
            <Subtext>{ item.questions.length } Questions</Subtext>
          </TitleBox>
          <Button
              onPress={() => {
                this.props.navigation.navigate('AddCard', {
                   item: item
                 });
               }}
            >
            <ButtonTitle>Add Card</ButtonTitle>
          </Button>
          <Button
            onPress={() => {
              clearLocalNotification().then(setLocalNotification);
              this.props.navigation.navigate('Quiz', {
                 item: item
               });
             }}
          >
          <ButtonTitle>Start a Quiz</ButtonTitle>
         </Button>
      </PageContainer>
    )
  }
}

const mapStateToProps = (state, { navigation }) => {
  const title = navigation.state.params.title;

  return { item: state.decks[title] || {} };
};

export default connect(mapStateToProps)(Deck);
