import React, { useState, useEffect, useRef } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Animated
} from 'react-native'
import { Easing } from 'react-native-reanimated'

import ChordModal from './ChordModal'
import { GetSong } from '../services/Db'
import Colors from '../constants/Colors'
import SongToolbar from './SongToolbar'

const SongDetail = props => {
  const [data, setData] = useState({ id: '', name: '', text: [] })
  const [isLoading, setIsLoading] = useState(false)
  const [showToolbar, setShowToolbar] = useState(false)
  const [scrollContentHeight, setScrollContentHeight] = useState(0)
  const [scrollViewHeight, setScrollViewHeight] = useState(0)
  const [actualScrollPos, setActualScrollPos] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [chord, setChord] = useState(null)

  const scrollArea = useRef(null)

  const scrollAnimatedValue = new Animated.Value(0)

  scrollAnimatedValue.addListener(({ value }) => {
    scrollArea.current.scrollTo({ y: value, animated: false })
  })

  const [scrollAnimationPos] = useState(scrollAnimatedValue)

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

  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true)
      const scrollEnd = scrollContentHeight - scrollViewHeight
      const distanceFromEnd = scrollEnd - actualScrollPos
      scrollAnimationPos.setValue(actualScrollPos)
      Animated.timing(scrollAnimationPos, {
        toValue: scrollEnd,
        duration: distanceFromEnd * 60,
        easing: Easing.linear,
        useNativeDriver: true
      }).start(() => setIsPlaying(false))
    } else {
      Animated.timing(scrollAnimationPos).stop()
    }
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
      <ChordModal
        chord={chord}
        isVisible={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
        }}
      ></ChordModal>
      <ScrollView
        style={styles.scrollView}
        ref={scrollArea}
        scrollEnabled={!isPlaying}
        onScroll={e => {
          setActualScrollPos(e.nativeEvent.contentOffset.y)
        }}
        onContentSizeChange={(w, h) => {
          setScrollContentHeight(h)
          isPlaying && togglePlay()
        }}
        onLayout={e => {
          setScrollViewHeight(e.nativeEvent.layout.height)
        }}
      >
        <TouchableWithoutFeedback onPress={toggleToolbar}>
          <View>
            <Text style={styles.title}>{data.name}</Text>
            <Text style={styles.artist}>by {data.artist}</Text>
            <View style={styles.textWrapper}>
              {data.text.map((t, i) =>
                t === '[--]' ? (
                  <View style={styles.newLineDouble}></View>
                ) : t === '[-]' ? (
                  <View style={styles.newLine}></View>
                ) : t[0] === '[' ? (
                  <View style={styles.chordWrapper}>
                    <TouchableOpacity
                      onPress={() => {
                        const akord = t.replace('[', '').replace(']', '')
                        setChord(akord)
                        setIsModalOpen(true)
                      }}
                    >
                      <Text style={styles.chordText}>
                        {t.replace('[', '').replace(']', '')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.wordWrapper}>
                    <Text style={styles.wordText}>{t}</Text>
                  </View>
                )
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <SongToolbar
        show={showToolbar}
        onTogglePlay={togglePlay}
        isPlaying={isPlaying}
      ></SongToolbar>
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
