import React, { useState } from 'react'
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
    result.push({ name: song.name, text: song.text, artist: 'Korben Dallas' }) 
  })
  return result
}
