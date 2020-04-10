import { SET_BROWSE_RESULTS, SET_BROWSE_BOOK_SONGS, SET_BROWSE_ARTIST_SONGS } from '../actions/browse'

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
    case SET_BROWSE_ARTIST_SONGS:
      const updatedArtists = state.artists
      updatedArtists[action.artistId].songs = action.songs
      return {
        ...state,
        artists: updatedArtists
      }
  }
  return state
}
