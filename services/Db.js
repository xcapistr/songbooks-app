import * as firebase from 'firebase'
import 'firebase/firestore'
import * as axios from 'axios'

import { config } from '../firebase.config'

try {
  firebase.initializeApp(config)
  console.log('DB init')
} catch (error) {
  console.log('DB exists')
}

const firestore = firebase.firestore()

// TODO: solve empty image input
const emptyImage =
  'data:image/png;base64,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'

export const GetUserBooks = async userId => {
  try {
    const result = {}
    const data = (await axios.get(`https://songbooks-app.herokuapp.com/users/${userId}/books`)).data
    data.forEach(book => {
      result[book.id] = {
        id: book.id,
        name: book.name,
        image: book.image || emptyImage,
        owner: book.owner,
        ownerName: book.owner === userId ? 'You' : book.ownerName,
        songsCount: book.songsCount,
        songs: {},
        stars: book.stars,
        votes: book.votes
      }
    })
    return result
  } catch (error) {
    console.log('ERROR:', error)
  }
}

export const GetBookSongs = async bookId => {
  try {
    const result = {}
    const data = (await axios.get(`https://songbooks-app.herokuapp.com/books/${bookId}/songs`)).data
    data.forEach(song => {
      result[song.id] = {
        id: song.id,
        name: song.name,
        text: song.text,
        artist: song.artist,
        artistName: song.artistName,
        owner: song.owner,
        ownerName: song.ownerName,
        private: song.private,
        stars: song.stars,
        votes: song.votes
      }
    })
    return result
  } catch (error) {
    console.log('ERROR:', error)
  }
}

export const GetArtistSongs = async artistId => {
  try {
    const result = {}
    const data = (await axios.get(`https://songbooks-app.herokuapp.com/artists/${artistId}/songs`))
      .data
    data.forEach(song => {
      result[song.id] = {
        id: song.id,
        name: song.name,
        text: song.text,
        artist: song.artist,
        artistName: song.artistName,
        owner: song.owner,
        ownerName: song.ownerName,
        private: song.private,
        stars: song.stars,
        votes: song.votes
      }
    })
    console.log('ARTIST_SONGS:', result)
    return result
  } catch (error) {
    console.log('ERROR:', error)
  }
}

export const Search = async q => {
  try {
    const result = {
      books: {},
      artists: {},
      songs: {}
    }
    if (!q) return result
    const data = (await axios.get(`https://songbooks-app.herokuapp.com/browse?query=${q}`)).data
    data.songs.forEach(s => {
      result.songs[s.id] = {
        id: s.id,
        type: 'song',
        name: s.name,
        text: s.text,
        artist: s.artist,
        artistName: s.artistName,
        owner: s.owner,
        ownerName: s.ownerName,
        private: s.private,
        stars: s.stars,
        votes: s.votes
      }
    })
    data.artists.forEach(a => {
      result.artists[a.id] = {
        id: a.id,
        type: 'artist',
        name: a.name,
        songsCount: a.songsCount,
        songs: {}
      }
    })
    data.books.forEach(b => {
      result.books[b.id] = {
        id: b.id,
        type: 'book',
        name: b.name,
        image: b.image || emptyImage,
        owner: b.owner,
        songsCount: b.songsCount,
        ownerName: b.owner === 1 ? 'You' : b.ownerName,
        private: b.private,
        stars: b.stars,
        votes: b.votes,
        songs: {}
      }
    })
    return result
  } catch (error) {
    console.error(error)
  }
}

export const createBook = async (name, image) => {
  const keywords = generateKeywords(name)
  await firestore.collection('songbooks').add({
    name,
    songs: [],
    image: image || emptyImage,
    keywords
  })
  console.log('Songbook successfully written!')
}

const formatText = text => {
  const formatedText = text
    .split('[-][-]')
    .join('[--]')
    .split('[')
    .join('|[')
    .split(']')
    .join(']|')
    .split(' ')
    .join(' |')
    .split('|')
  const filteredWords = formatedText.filter(s => s !== '')
  return filteredWords
}
