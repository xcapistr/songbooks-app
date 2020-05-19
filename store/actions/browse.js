import { Search, GetArtistSongs, GetBookSongs } from '../../services/Db'

export const SET_BROWSE_RESULTS = 'SET_BROWSE_RESULTS'
export const SET_BROWSE_BOOK_SONGS = 'SET_BROWSE_BOOK_SONGS'
export const SET_BROWSE_ARTIST_SONGS = 'SET_BROWSE_ARTIST_SONGS'

export const fetchResults = query => {
  return async dispatch => {
    try {
      const resultsData = await Search(query)
      dispatch({
        type: SET_BROWSE_RESULTS,
        results: resultsData
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
        type: SET_BROWSE_BOOK_SONGS,
        bookId,
        songs: songsData
      })
    } catch (error) {
      throw error
    }
  }
}

export const fetchArtistSongs = artistId => {
  return async dispatch => {
    try {
      const songsData = await GetArtistSongs(artistId)
      dispatch({
        type: SET_BROWSE_ARTIST_SONGS,
        artistId,
        songs: songsData
      })
    } catch (error) {
      throw error
    }
  }
}
