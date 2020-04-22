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

// TODO: solve empty image input
const emptyImage = 'data:image/png;base64,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'

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
    result[item.id] = {
      id: item.id,
      name: book.name,
      songIds: book.songs,
      songs: {},
      image: book.image
    }
  })
  return result
}

export const GetSongsByIds = async songIds => {
  if (songIds.length === 0) return {}
  const result = {}
  const songsRef = firestore
    .collection('songs')
    .where(firebase.firestore.FieldPath.documentId(), 'in', songIds)
  const querySnapshot = await songsRef.get()
  querySnapshot.forEach(item => {
    const song = item.data()
    result[item.id] = { id: item.id, name: song.name, artist: song.artist.name, text: song.text }
  })
  return result
}

export const GetArtistSongs = async artistId => {
  try {
    const result = {}
    const songsRef = firestore.collection('songs').where('artist.id', '==', artistId)
    const songsSnapshot = await songsRef.get()
    songsSnapshot.forEach(item => {
      const song = item.data()
      result[item.id] = {
        id: item.id,
        name: song.name,
        text: song.text
      }
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
      name: artist.name,
      songs: {}
    }
  })

  //search in songs
  const songs = await firestore.collection('songs').where('keywords', 'array-contains', query).get()

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
