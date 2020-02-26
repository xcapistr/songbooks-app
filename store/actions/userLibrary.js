import { GetBooks, GetBook } from '../../services/Db'

export const SET_BOOKS = 'SET_BOOKS'

export const fetchBooks = () => {
  return async dispatch => {
    const booksData = await GetBooks()
    dispatch({
      type: SET_BOOKS,
      userBooks: booksData
    })
  }
}
