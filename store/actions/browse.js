import { Search, GetSongsByIds, GetArtistSongs } from '../../services/Db'

export const SET_BROWSE_RESULTS = 'SET_BROWSE_RESULTS'
export const SET_BROWSE_BOOK_SONGS = 'SET_BROWSE_BOOK_SONGS'
export const SET_BROWSE_ARTIST_SONGS = 'SET_BROWSE_ARTIST_SONGS'

export const fetchResults = query => {
  return async dispatch => {
    const resultsData = await Search(query)
    dispatch({
      type: SET_BROWSE_RESULTS,
      results: resultsData
    })
  }
}

export const fetchBookSongs = bookId => {
  return async (dispatch, getState) => {
    const songIds = getState().browse.books[bookId].songIds
    const songsData = await GetSongsByIds(songIds)
    dispatch({
      type: SET_BROWSE_BOOK_SONGS,
      bookId,
      songs: songsData
    })
  }
}

export const fetchArtistSongs = artistId => {
  return async dispatch => {
    const songsData = await GetArtistSongs(artistId)
    dispatch({
      type: SET_BROWSE_ARTIST_SONGS,
      artistId,
      songs: songsData
    })
  }
}
