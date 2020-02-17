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

import Modal from './Modal'
import { GetSong } from '../services/Db'
import Colors from '../constants/Colors'
import SongToolbar from './SongToolbar'
import ChordDetail from './ChordDetail'
import Slider from './Slider'
import transpose from '../services/Transpose'

const SongDetail = props => {
  const [data, setData] = useState({ id: '', name: '', text: [] })
  const [isLoading, setIsLoading] = useState(false)
  const [showToolbar, setShowToolbar] = useState(false)
  const [scrollContentHeight, setScrollContentHeight] = useState(0)
  const [scrollViewHeight, setScrollViewHeight] = useState(0)
  const [actualScrollPos, setActualScrollPos] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [openedModal, setOpenedModal] = useState(null)
  const [chord, setChord] = useState(null)
  const [textSize, setTextSize] = useState(12)
  const [chordSize, setChordSize] = useState(14)
  const [transposition, setTransposition] = useState(2)

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
      <Modal
        title={chord}
        isVisible={openedModal === 'chord'}
        buttons={[
          {
            title: 'OK',
            action: () => {
              setOpenedModal(null)
            }
          }
        ]}
      >
        <ChordDetail chord={chord}></ChordDetail>
      </Modal>
      <Modal
        title="Text size"
        isVisible={openedModal === 'text-size'}
        buttons={[
          {
            title: 'cancel',
            action: () => {
              setOpenedModal(null)
            }
          },
          {
            title: 'ok',
            type: 'primary',
            action: () => {
              setOpenedModal(null)
            }
          }
        ]}
      >
        <Text>Font size: {textSize}</Text>
        <Slider
          value={textSize}
          minimumValue={8}
          maximumValue={32}
          step={2}
          onValueChange={value => {
            setTextSize(value)
          }}
        ></Slider>
        <Text style={{ marginTop: 15 }}>Chord size: {chordSize} </Text>
        <Slider
          value={chordSize}
          minimumValue={8}
          maximumValue={32}
          step={2}
          onValueChange={value => {
            setChordSize(value)
          }}
        ></Slider>
      </Modal>
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
                  <View
                    style={{
                      ...styles.chordWrapper,
                      height: chordSize + textSize
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        if (!isPlaying) {
                          const akord = transpose(
                            t.replace('[', '').replace(']', ''),
                            transposition
                          )
                          setChord(akord)
                          setOpenedModal('chord')
                        }
                      }}
                    >
                      <Text style={{ ...styles.chordText, fontSize: chordSize }}>
                        {transpose(t.replace('[', '').replace(']', ''), transposition)}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <Text style={{ ...styles.wordText, fontSize: textSize }}>{t}</Text>
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
        onTextSize={() => {
          setOpenedModal('text-size')
        }}
        transposeUp={() => {
          setTransposition(prev => (prev === 11 ? 0 : prev + 1))
        }}
        transposeDown={() => {
          setTransposition(prev => (prev === -11 ? 0 : prev - 1))
        }}
        transposition={transposition}
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
    borderWidth: 0,
    overflow: 'visible'
    // width: 1
  },
  chordText: {
    color: Colors.primary,
    fontWeight: 'bold',
    // width: 50,
    borderWidth: 0
    // fontFamily: 'roboto-mono'
  },
  wordText: {
    // fontFamily: 'roboto-mono'
  }
})

export default SongDetail
