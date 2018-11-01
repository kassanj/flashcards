import { AsyncStorage } from 'react-native'
import { starterData } from './data.js'

const DECK_STORAGE_KEY = 'MobileFlashcards:dataset'

// set starter data on componentDidMount() in DeckList component
export function getDecks() {
  // AsyncStorage.removeItem(DECK_STORAGE_KEY); // uncomment this line to reset AsyncStorage DECK_STORAGE_KEY
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
      if (results === null) {
          AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(starterData));
          return starterData;
      }
      else {
          return JSON.parse(results)
      }
  });
}

// getItem
export function getDeck(id) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(result => JSON.parse(result))
    .then(result => Object.values(result))
    .then(result => result.filter(item => item.title === id)[0]);
}

// mergeItem
export function saveNewDeck(title) {
  return AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify({
      [title]: { title: title, questions: [] }
    })
  );
}

// mergeItem
export function saveNewCardToDeck(title, card) {
  return getDeck(title).then(result =>
    AsyncStorage.mergeItem(
      DECK_STORAGE_KEY,
      JSON.stringify({
        [title]: { ...result, questions: [...result.questions, card] }
      })
    )
  );
}
