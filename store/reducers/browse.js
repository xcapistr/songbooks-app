import { SET_BROWSE_RESULTS, SET_BROWSE_BOOK_SONGS } from '../actions/browse'

const initialState = {
  books: {},
  artists: {},
  songs: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BROWSE_RESULTS:
      return {
        ...state,
        ...action.results
      }
    case SET_BROWSE_BOOK_SONGS:
      const updatedBooks = state.books
      updatedBooks[action.bookId].songs = action.songs
      return {
        ...state,
        books: updatedBooks
      }
  }
  return state
}
