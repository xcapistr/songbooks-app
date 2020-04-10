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
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'

import Modal from './Modal'
import textTransform from '../services/textTransform'
import Colors from '../constants/Colors'
import SongToolbar from './SongToolbar'
import ChordDetail from './ChordDetail'
import Slider from './Slider'
import transpose from '../services/Transpose'

const secondsToTime = secs => {
  let hours = Math.floor(secs / 3600)
  let minutes = Math.floor((secs - hours * 3600) / 60)
  let seconds = secs - hours * 3600 - minutes * 60
  if (hours < 10) {
    hours = '0' + hours
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  return hours + ':' + minutes + ':' + seconds
}

const SongDetail = props => {
  // TODO: prevent unnecessary calling
  const song = useSelector(state =>
    {
      console.log('get song data...')
    return props.navigation.getParam('root') === 'Home'
      ? state.user.books[props.navigation.getParam('bookId')].songs[
          props.navigation.getParam('songId')
        ]
      : props.navigation.getParam('bookId')
      ? state.browse.books[props.navigation.getParam('bookId')].songs[
          props.navigation.getParam('songId')
        ]
      : state.browse.songs[props.navigation.getParam('songId')]
    }
  )
    console.log('SONGGGG', props.navigation.getParam('bookId'), song)
  const transformedText = textTransform(song.text)

  // const [isLoading, setIsLoading] = useState(false)
  const [showToolbar, setShowToolbar] = useState(false)
  const [scrollContentHeight, setScrollContentHeight] = useState(0)
  const [scrollViewHeight, setScrollViewHeight] = useState(0)
  const [actualScrollPos, setActualScrollPos] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [openedModal, setOpenedModal] = useState(null)
  const [chord, setChord] = useState(null)
  const [textSize, setTextSize] = useState(12)
  const [chordSize, setChordSize] = useState(14)
  const [transposition, setTransposition] = useState(0)
  const [songLength, setSongLength] = useState(180)

  const scrollArea = useRef(null)

  const scrollAnimatedValue = new Animated.Value(0)

  scrollAnimatedValue.addListener(({ value }) => {
    scrollArea.current.scrollTo({ y: value, animated: false })
  })

  const [scrollAnimationPos] = useState(scrollAnimatedValue)

  // const reload = async () => {
  //   setIsLoading(true)
  //   const song = await GetSong(props.id)
  //   setData({ ...song, text: song.text })
  //   setIsLoading(false)
  // }

  // useEffect(() => {
  //   reload()
  // }, [])

  const toggleToolbar = () => {
    setShowToolbar(prevState => !prevState)
  }

  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true)
      const scrollEnd =
        scrollContentHeight > scrollViewHeight ? scrollContentHeight - scrollViewHeight : 0
      const distanceFromEnd = scrollEnd - actualScrollPos
      scrollAnimationPos.setValue(actualScrollPos)
      Animated.timing(scrollAnimationPos, {
        toValue: scrollEnd,
        duration: songLength * 1000 * (distanceFromEnd / scrollEnd),
        easing: Easing.linear,
        useNativeDriver: true
      }).start(() => setIsPlaying(false))
    } else {
      Animated.timing(scrollAnimationPos).stop()
    }
  }

  // if (isLoading) {
  //   return (
  //     <View style={styles.centered}>
  //       <ActivityIndicator size="large" color={Colors.primary} />
  //     </View>
  //   )
  // }

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
            title: 'ok',
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
          leftIcon={<Text style={{ fontSize: 8, color: '#999' }}>T</Text>}
          rightIcon={<Text style={{ fontSize: 32, color: '#999' }}>T</Text>}
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
          leftIcon={<Text style={{ fontSize: 8, color: '#999' }}>#</Text>}
          rightIcon={<Text style={{ fontSize: 32, color: '#999' }}>#</Text>}
        ></Slider>
      </Modal>
      <Modal
        title="Scroll speed"
        isVisible={openedModal === 'scroll-speed'}
        buttons={[
          {
            title: 'ok',
            action: () => {
              setOpenedModal(null)
            }
          }
        ]}
      >
        <Text>Song length: {secondsToTime(songLength)}</Text>
        <Slider
          value={420 - songLength}
          minimumValue={0}
          maximumValue={390}
          step={1}
          onValueChange={value => {
            setSongLength(420 - value)
          }}
          leftIcon={<MaterialCommunityIcons name="run" size={30} color="#999" />}
          rightIcon={<MaterialCommunityIcons name="run-fast" size={30} color="#999" />}
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
            <Text style={styles.title}>{song.name}</Text>
            <Text style={styles.artist}>by {song.artist}</Text>
            <View style={styles.textWrapper}>
              {transformedText.map((t, i) =>
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
        onSpeed={() => {
          setOpenedModal('scroll-speed')
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
