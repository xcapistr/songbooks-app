import { SET_USER_BOOKS, SET_USER_BOOK_SONGS, CREATE_BOOK, CREATE_SONG } from '../actions/user'

const initialState = {
  books: {}
}

export default (state = initialState, action) => {
  const prevBooks = { ...state.books }

  switch (action.type) {
    case SET_USER_BOOKS:
      return {
        ...state,
        books: action.books
      }
    case SET_USER_BOOK_SONGS:
      prevBooks[action.bookId].songs = action.songs
      return {
        ...state,
        books: prevBooks
      }
    case CREATE_BOOK:
      prevBooks[action.book.id] = action.book
      return {
        ...state,
        books: prevBooks
      }
    case CREATE_SONG:
      console.log('new book:', action.song);
      
      prevBooks[action.song.bookId].songs[action.song.id] = action.song
      return {
        ...state,
        books: prevBooks
      }
  }
  return state
}
