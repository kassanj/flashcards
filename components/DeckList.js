import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { connect } from 'react-redux';
import navigationOptions from 'react-navigation';
import { getDecks } from '../utils/api';
import { receiveDecks } from '../actions';
import { PageContainer, DeckButton, ButtonTitle } from '../utils/styles';


class DeckList extends Component {

  componentDidMount() {
    getDecks().then(decks => this.props.dispatch(receiveDecks(decks)));
  }

  render() {
    return (
      <PageContainer>
          <FlatList
            data={Object.values(this.props.allDecks)}
            renderItem={({item}) =>
              <DeckButton
                onPress={() => {
                  this.props.navigation.navigate('Deck', {
                    title: item.title
                  });
                }}
              >
                <ButtonTitle>{item.title}</ButtonTitle>
              </DeckButton>
           }
           keyExtractor={item => item.title}
          />
      </PageContainer>
    )
  }
}

const mapStateToProps = state => ({
  allDecks: state.decks || []
});

export default connect(mapStateToProps)(DeckList);
