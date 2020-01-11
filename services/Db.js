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

export const GetSongs = async () => {
  const result = []
  const songsRef = firestore.collection('songs')
  const querySnapshot = await songsRef.get()
  querySnapshot.forEach(item => {
    const song = item.data()
    result.push({
      id: item.id,
      name: song.name,
      text: song.text,
      artist: 'Korben Dallas'
    })

    // firestore
    //   .collection('songs')
    //   .doc(item.id)
    //   .set({
    //     ...song,
    //     keywords: generateKeywords(song.name)
    //   })
  })
  return result
}

export const GetSong = async () => {
  const songRef = firestore.collection('songs').doc('qXEvyyO8sSydjiwTbEDi')
  const song = (await songRef.get()).data()
  const formatedText = formatText(song.text)

  const result = {
    id: 'qXEvyyO8sSydjiwTbEDi',
    name: song.name,
    text: formatedText
  }
  return result
}

export const GetBooks = async () => {
  const result = []
  const songsRef = firestore.collection('songbooks')
  const querySnapshot = await songsRef.get()
  querySnapshot.forEach(item => {
    const book = item.data()
    result.push({ id: item.id, name: book.name, image: book.image })
  })
  return result
}

export const Search = async q => {
  const query = q.toLowerCase()
  const result = []

  // search in songbooks
  const songbooks = await firestore
    .collection('songbooks')
    .where('keywords', 'array-contains', query)
    .get()
  songbooks.forEach(item => {
    const book = item.data()
    result.push({
      id: item.id,
      type: 'book',
      name: book.name,
      image: book.image
    })
  })

  //search in artists
  const artists = await firestore
    .collection('artists')
    .where('keywords', 'array-contains', query)
    .get()
  artists.forEach(item => {
    const artist = item.data()
    result.push({
      id: item.id,
      type: 'artist',
      name: artist.name,
      image: artist.image
    })
  })

  //search in songs
  const songs = await firestore
    .collection('songs')
    .where('keywords', 'array-contains', query)
    .get()

  songs.forEach(item => {
    const song = item.data()
    result.push({
      id: item.id,
      type: 'song',
      name: song.name,
      text: song.text,
      artist: 'Korben Dallas'
    })
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
