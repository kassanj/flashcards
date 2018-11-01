import React, { Component } from 'react'
import { View, Text, Button, FlatList } from 'react-native'
import { connect } from 'react-redux';
import navigationOptions from 'react-navigation';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'


class Deck extends Component {

  static navigationOptions = {
    title: 'Deck'
  };

  render() {
    const { item } = this.props;

    return (
      <View>
        <Text>{ item.title }</Text>
        <View>
          <Text>{ item.questions.length } Questions</Text>
          <FlatList
             data={item.questions}
             renderItem={({item}) =>
               <View>
                 <Text>{item.question}</Text>
               </View>
               }
             keyExtractor={item => item.question}
           />
         </View>
          <Button
            onPress={() => {
              this.props.navigation.navigate('AddCard', {
                 item: item
               });
             }}
            title="Add Question"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />

          <Button
            onPress={() => {
              clearLocalNotification().then(setLocalNotification);
              this.props.navigation.navigate('Quiz', {
                 item: item
               });
             }}
            title="Start Quiz"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />

      </View>
    )
  }
}

const mapStateToProps = (state, { navigation }) => {
  const title = navigation.state.params.title;

  return { item: state.decks[title] || {} };
};

export default connect(mapStateToProps)(Deck);
