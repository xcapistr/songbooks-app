import * as firebase from 'firebase'
import 'firebase/firestore'

import { config } from '../firebase.config'

try {
  firebase.initializeApp(config)
  console.log('DB init')
} catch (error) {
  console.log('DB exists')
}

const firestore = firebase.firestore()

// TODO: inject firestore db
// export const GetSongs = async songsRef => {
//   const result = []
//   const querySnapshot = await songsRef.get()
//   querySnapshot.forEach(item => {
//     const song = item.data()
//     result.push({
//       id: item.id,
//       name: song.name,
//       text: song.text,
//       artist: 'Korben Dallas'
//     })

//     // // generating keywords
//     // firestore
//     //   .collection('songs')
//     //   .doc(item.id)
//     //   .set({
//     //     ...song,
//     //     keywords: generateKeywords(song.name)
//     //   })
//   })
//   return result
// }

export const GetSong = async id => {
  const songRef = firestore.collection('songs').doc(id)
  const song = (await songRef.get()).data()
  const formatedText = formatText(song.text)

  const result = {
    id: song.id,
    name: song.name,
    text: formatedText,
    artist: song.artist.name
  }
  return result
}

export const GetBooks = async () => {
  const result = {}
  const booksRef = firestore.collection('songbooks')
  const querySnapshot = await booksRef.get()
  querySnapshot.forEach(item => {
    const book = item.data()
    result[item.id] = { id: item.id, name: book.name, songIds: book.songs, songs: [], image: book.image }
  })
  console.log('RESULTS:', result)
  return result
}

export const GetSongsByIds = async songIds => {
  const result = {}
  const songsRef = firestore
    .collection('songs')
    .where(firebase.firestore.FieldPath.documentId(), 'in', songIds)
  const querySnapshot = await songsRef.get()
  querySnapshot.forEach(item => {
    const song = item.data()
    result[item.id] = { id: item.id, name: song.name, artist: song.artist, text: song.text }
  })
  console.log('RESULTS:', result)
  return result
}

export const GetBook = async id => {
  try {
    // get book
    const bookRef = firestore.collection('songbooks').doc(id)
    const bookData = (await bookRef.get()).data()
    const songIds = bookData.songs
    const book = {
      name: bookData.name,
      image: bookData.image,
      songs: []
    }

    //get songs
    const songsRef = firestore
      .collection('songs')
      .where(firebase.firestore.FieldPath.documentId(), 'in', songIds)
    const songsSnapshot = await songsRef.get()
    songsSnapshot.forEach(item => {
      const songData = item.data()
      book.songs.push({
        id: item.id,
        name: songData.name,
        artist: {
          id: songData.artist.id,
          name: songData.artist.name
        }
      })
    })
    return book
  } catch (error) {
    console.log('ERROR:', error)
  }
}

export const GetArtist = async id => {
  try {
    const artistRef = firestore.collection('artists').doc(id)
    const artist = (await artistRef.get()).data()
    const result = { name: artist.name, songs: [] }

    const songsRef = firestore.collection('songs').where('artist.id', '==', id)
    const songsSnapshot = await songsRef.get()
    songsSnapshot.forEach(item => {
      const song = item.data()
      result.songs.push({
        id: item.id,
        name: song.name
      })
    })
    return result
  } catch (error) {
    console.log('ERROR:', error)
  }
}

export const Search = async q => {
  const query = q.toLowerCase()
  const result = {
    books: {},
    artists: {},
    songs: {}
  }

  // search in songbooks
  const songbooks = await firestore
    .collection('songbooks')
    .where('keywords', 'array-contains', query)
    .get()
  songbooks.forEach(item => {
    const book = item.data()
    result.books[item.id] = {
      id: item.id,
      type: 'book',
      name: book.name,
      image: book.image,
      songIds: book.songs,
      songs: {}
    }
  })

  //search in artists
  const artists = await firestore
    .collection('artists')
    .where('keywords', 'array-contains', query)
    .get()
  artists.forEach(item => {
    const artist = item.data()
    result.artists[item.id] = {
      id: item.id,
      type: 'artist',
      name: artist.name
    }
  })

  //search in songs
  const songs = await firestore
    .collection('songs')
    .where('keywords', 'array-contains', query)
    .get()

  songs.forEach(item => {
    const song = item.data()
    result.songs[item.id] = {
      id: item.id,
      type: 'song',
      name: song.name,
      text: song.text,
      artist: song.artist.name
    }
  })
  return result
}

const generateKeywords = name => {
  const keywords = []
  const nameWithoutCommas = name.split(',').join(' ')
  const splittedName = nameWithoutCommas.split(' ')

  //getting space positions
  const spacePos = []
  let sum = 0
  for (let i = 0; i < splittedName.length; i++) {
    spacePos.push(sum)
    if (i > 0) {
      sum += 1
    }
    sum += splittedName[i].length
  }

  // getting substrings
  for (let i = 0; i < spacePos.length; i++) {
    const vyraz =
      i === 0
        ? name.substring(spacePos[i], name.length)
        : name.substring(spacePos[i] + 1, name.length)

    if (vyraz.length > 1) {
      for (let j = 2; j <= vyraz.length; j++) {
        keywords.push(vyraz.substring(0, j).toLowerCase())
      }
    }
  }
  return keywords
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

const testQuery = async () => {}
