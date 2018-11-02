import React, { Component } from 'react'
import { View, Text } from 'react-native'
import navigationOptions from 'react-navigation'
import {
  PageContainer,
  Title,
  QuestionTitle,
  AnswerTitle,
  TitleBox,
  SubText,
  Button,
  ButtonTitle,
  QuizPage,
  QuizTitle,
  QuizEnumeration,
  ScoreResult,
} from '../utils/styles';

class Quiz extends Component {

    state = {
      page: 0,
      showAnswer: false,
      score: 0
    };

    static navigationOptions = {
      Quiz: 'Quiz'
    };

    render() {

      const { score, page, displayAnswer } = this.state;
      const { params } = this.props.navigation.state;
      const item = params ? params.item : null;
      const pages = item.questions === undefined ? 0 : item.questions.length;

      return (
        <View>
          {page < pages ? (
            <PageContainer>
              <QuizEnumeration>
                {page + 1}/{pages}
              </QuizEnumeration>
              <QuestionTitle>Q: {item.questions[page].question}</QuestionTitle>
              {displayAnswer === true ? (
                <PageContainer>
                  <AnswerTitle>A: {item.questions[page].answer}</AnswerTitle>
                  <Button
                    onPress={() => {
                      this.setState({
                        score: score + 1,
                        page: page + 1,
                        displayAnswer: false
                      });
                    }}
                  >
                    <ButtonTitle>Correct</ButtonTitle>
                  </Button>
                  <Button
                    onPress={() => {
                      this.setState({
                        page: page + 1,
                        displayAnswer: false,
                      });
                    }}
                  >
                    <ButtonTitle>Incorrect</ButtonTitle>
                  </Button>
                </PageContainer>
              ) : (
                <PageContainer>
                  <QuizTitle />
                  <Button
                    onPress={() => {
                      this.setState({ displayAnswer: true });
                    }}
                  >
                    <ButtonTitle>Show Answer</ButtonTitle>
                  </Button>
                </PageContainer>
              )}
              <QuizEnumeration>{pages - page - 1} remaining</QuizEnumeration>
            </PageContainer>
          ) : (
            <PageContainer>
              <ScoreResult>You scored {Math.round(score / pages * 100)}%</ScoreResult>
              <QuizEnumeration>
                ({score} correct from {pages}{' '}
                {pages === 1 ? <SubText>question</SubText> : <SubText>questions</SubText>})
              </QuizEnumeration>
              <Button
                onPress={() => {
                  this.setState({
                    score: 0,
                    page: 0,
                    displayAnswer: false
                  });
                }}
              >
                <ButtonTitle>Restart Quiz</ButtonTitle>
              </Button>
              <Button
                onPress={() => {
                  this.props.navigation.navigate('Deck', {
                    title: item.title
                  });
                }}
              >
                <ButtonTitle>Back to Deck</ButtonTitle>
              </Button>
              <Button
                onPress={() => {
                  this.props.navigation.navigate('DeckList');
                }}
              >
                <ButtonTitle>View all Decks</ButtonTitle>
              </Button>
            </PageContainer>
          )}
        </View>
      );
    }
}

export default Quiz
