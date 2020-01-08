import * as firebase from 'firebase'
import 'firebase/firestore'

import { config } from '../firebase.config'

// Db init
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
  })
  return result
}

export const GetSong = async () => {
  const songRef = firestore.collection('songs').doc('qXEvyyO8sSydjiwTbEDi')
  const song = (await songRef.get()).data()
  const formatedText = song.text
    .split('[-][-]')
    .join('[--]')
    .split('[')
    .join('|[')
    .split(']')
    .join(']|')
    .split(' ')
    .join(' |')
    .split('|')

  filteredWords = formatedText.filter(s => s !== '')
  console.log(filteredWords)

  const result = {
    id: 'qXEvyyO8sSydjiwTbEDi',
    name: song.name,
    text: filteredWords
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
