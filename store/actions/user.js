import { GetUserBooks, GetBookSongs } from '../../services/Db'

export const SET_USER_BOOKS = 'SET_BOOKS'
export const SET_USER_BOOK_SONGS = 'SET_BOOK_SONGS'

export const fetchBooks = () => {
  return async (dispatch, getState) => {
    try {
      const prevBooks = getState().user.books
      const booksData = await GetUserBooks(1)
      Object.keys(booksData).forEach(bookId => {
        booksData[bookId].songs = prevBooks[bookId] ? prevBooks[bookId].songs : {}
      })

      dispatch({
        type: SET_USER_BOOKS,
        books: booksData
      })
    } catch (error) {
      throw error
    }
  }
}

export const fetchBookSongs = bookId => {
  return async dispatch => {
    try {
      const songsData = await GetBookSongs(bookId)
      dispatch({
        type: SET_USER_BOOK_SONGS,
        bookId,
        songs: songsData
      })
    } catch (error) {
      throw error
    }
  }
}
