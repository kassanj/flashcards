import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'MobileFlashcards:dataset'

// getItem
export function getDecks() {
  //AsyncStorage.removeItem(DECK_STORAGE_KEY); // uncomment this line to reset AsyncStorage DECK_STORAGE_KEY
  return AsyncStorage.getItem(DECK_STORAGE_KEY);
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
