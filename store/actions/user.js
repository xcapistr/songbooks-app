import { GetUserBooks, GetBookSongs, CreateBook, CreateSong } from '../../services/Db'

export const SET_USER_BOOKS = 'SET_BOOKS'
export const SET_USER_BOOK_SONGS = 'SET_BOOK_SONGS'
export const CREATE_BOOK = 'CREATE_BOOK'
export const CREATE_SONG = 'CREATE_SONG'

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
      const songsData = await GetBookSongs(bookId, 1)
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

export const createBook = (name, image) => {
  return async dispatch => {
    try {
      const newBook = await CreateBook(1, name, image, false)
      dispatch({
        type: CREATE_BOOK,
        book: newBook
      })
    } catch (error) {
      throw error
    }
  }
}

export const createSong = (name, text, artistName, bookId) => {
  return async dispatch => {
    try {
      const newSong = await CreateSong(name, text, artistName, 1, false, bookId)
      dispatch({
        type: CREATE_SONG,
        song: newSong
      })
    } catch (error) {
      throw error
    }
  }
}
