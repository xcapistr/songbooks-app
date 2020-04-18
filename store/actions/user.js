import { GetBooks, GetSongsByIds } from '../../services/Db'

export const SET_USER_BOOKS = 'SET_BOOKS'
export const SET_USER_BOOK_SONGS = 'SET_BOOK_SONGS'

export const fetchBooks = () => {
  return async (dispatch, getState) => {
    try {
      const prevBooks = getState().user.books
      const books = await GetBooks()
      const booksData = {}
      Object.keys(books).forEach(bookId => {
        booksData[bookId] = {
          ...books[bookId],
          songs: prevBooks[bookId] ? prevBooks[bookId].songs : {}
        }
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
  return async (dispatch, getState) => {
    const songIds = getState().user.books[bookId].songIds
    const songsData = await GetSongsByIds(songIds)
    dispatch({
      type: SET_USER_BOOK_SONGS,
      bookId,
      songs: songsData
    })
  }
}
