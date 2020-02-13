import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import ChordSchema from './ChordSchema'
import Colors from '../constants/Colors'
import Chords from '../constants/Chords'

const ChordDetail = props => {
  let position
  let schema

  try {
    ;({ position, schema } = Chords[props.chord])
  } catch (error) {
    console.log('Unknown chord -', error.message)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.chord}</Text>
      {position && schema ? (
        <ChordSchema
          width={100}
          height={125}
          schema={schema}
          position={position}
        ></ChordSchema>
      ) : (
        <View style={styles.errorMessageWrapper}>
          <Text style={styles.emo}>😱</Text>
          <Text style={styles.errorMessage}>Unknown chord</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20
  },
  title: {
    fontSize: 24,
    color: Colors.primary,
    marginBottom: 10
  },
  errorMessageWrapper: {
    alignItems: 'center'
  },
  emo: {
    fontSize: 50,
    marginBottom: 15
  },
  errorMessage: {
    fontSize: 16,
    color: '#777'
  }
})

export default ChordDetail
