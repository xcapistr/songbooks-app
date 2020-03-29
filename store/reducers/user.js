import { SET_USER_BOOKS, SET_USER_BOOK_SONGS } from '../actions/user'

const initialState = {
  books: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_BOOKS:
      return {
        ...state,
        books: action.books
      }
    case SET_USER_BOOK_SONGS:
      const updatedBooks = state.books
      updatedBooks[action.bookId].songs = action.songs
      return {
        ...state,
        books: updatedBooks
      }
  }
  return state
}
