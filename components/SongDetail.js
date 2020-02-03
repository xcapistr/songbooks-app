import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback
} from 'react-native'

import { GetSong } from '../services/Db'
import Colors from '../constants/Colors'
import SongToolbar from './SongToolbar'

const SongDetail = props => {
  const [data, setData] = useState({ id: '', name: '', text: [] })
  const [isLoading, setIsLoading] = useState(false)
  const [showToolbar, setShowToolbar] = useState(false)

  const reload = async () => {
    setIsLoading(true)
    const song = await GetSong(props.id)
    setData({ ...song, text: song.text })
    setIsLoading(false)
  }

  useEffect(() => {
    reload()
  }, [])

  const toggleToolbar = () => {
    setShowToolbar(prevState => !prevState)
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scrollView}>
        <TouchableWithoutFeedback onPress={toggleToolbar}>
          <View>
            <Text style={styles.title}>{data.name}</Text>
            <Text style={styles.artist}>by {data.artist}</Text>
            <View style={styles.textWrapper}>
              {data.text.map((t, i) => {
                if (t === '[--]') {
                  return <View style={styles.newLineDouble}></View>
                } else if (t === '[-]') {
                  return <View style={styles.newLine}></View>
                } else if (t[0] === '[') {
                  return (
                    <View style={styles.chordWrapper}>
                      <TouchableOpacity>
                        <Text style={styles.chordText}>
                          {t.replace('[', '').replace(']', '')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )
                } else {
                  return (
                    <View style={styles.wordWrapper}>
                      <Text style={styles.wordText}>{t}</Text>
                    </View>
                  )
                }
              })}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <SongToolbar show={showToolbar}></SongToolbar>
    </View>
  )
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  scrollView: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 20
  },
  artist: {
    fontSize: 17,
    color: '#777',
    marginTop: 5
  },
  textWrapper: {
    flex: 1,
    borderWidth: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    marginTop: 20,
    marginBottom: 150
  },
  newLineDouble: { height: 20, borderWidth: 0, width: '100%' },
  newLine: { height: 1, borderWidth: 0, width: '100%' },
  chordWrapper: {
    height: 45,
    borderWidth: 0,
    overflow: 'visible'
    // width: 1
  },
  chordText: {
    fontSize: 20,
    color: Colors.primary,
    fontWeight: 'bold',
    // width: 50,
    borderWidth: 0
    // fontFamily: 'roboto-mono'
  },
  wordWrapper: { minHeight: 20, borderWidth: 0 },
  wordText: {
    fontSize: 16
    // fontFamily: 'roboto-mono'
  }
})

export default SongDetail
