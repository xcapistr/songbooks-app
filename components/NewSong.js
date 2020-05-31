import React, { useState, useRef } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
  SafeAreaView,
  Dimensions,
  Button
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'

import Colors from '../constants/Colors'
import Icon from '../components/Icon'
import AnimatedInput from '../components/AnimatedInput'
import { useKeyboard } from '../hooks/keyboard'
import { createSong } from '../store/actions/user'

const NewSong = props => {
  const [songName, setSongName] = useState('')
  const [artist, setArtist] = useState('')
  const [text, setText] = useState('')
  const [selection, setSelection] = useState({ start: 0, end: 0 })
  const [actualChord, setActualChord] = useState('')
  const [lastChords, setLastChords] = useState([])
  const [hints, setHints] = useState([])
  const [isTextFocused, setIsTextFocused] = useState(false)

  const dispatch = useDispatch()

  let textArea = useRef(null)

  const [keyboardHeight] = useKeyboard()

  //TODO: solve this globaly
  const dimensions = Dimensions.get('window')
  const ratio =
    dimensions.height > dimensions.width
      ? dimensions.height / dimensions.width
      : dimensions.width / dimensions.height

  const allHints = [
    'C',
    'D',
    'E',
    'F',
    'G',
    'A',
    'H',
    'C#',
    'D#',
    'F#',
    'G#',
    'Cmi',
    'Dmi',
    'Emi',
    'Fmi',
    'Gmi',
    'Ami',
    'Hmi',
    'C7',
    'D7',
    'E7',
    'F7',
    'G7',
    'A7',
    'H7'
  ]

  const save = async () => {
    try {
      await dispatch(createSong(songName, text, artist, props.bookId))
      props.goBack()
    } catch (err) {
      props.setSaved(false)
      throw err
    }
  }

  if (props.saved) {
    save()
  }

  const addChord = chord => {
    setActualChord('')
    const chords = lastChords
    if (chord) {
      const i = chords.indexOf(chord)
      if (i !== -1) {
        chords.splice(i, 1)
      }
      setLastChords([chord, ...chords])
    }
    setText(
      prevState =>
        prevState.slice(0, selection.end) +
        '[' +
        chord +
        ']' +
        prevState.slice(selection.end, prevState.length)
    )
    setHints([])
    textArea.current.focus()
    setActualChord('')
  }

  const handleChangeChord = chord => {
    setActualChord(chord)
    const result = chord ? allHints.filter(h => h.includes(chord)) : []
    setHints(result)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          ...styles.screen,
          paddingBottom:
            Platform.OS === 'ios' ? (ratio > 2 ? keyboardHeight - 41 : keyboardHeight - 7) : 0
        }}
      >
        <View style={styles.inputsWrapper}>
          <AnimatedInput
            label="Song Name"
            value={songName}
            onChangeText={setSongName}
            underline
            onFocus={() => setIsTextFocused(false)}
          ></AnimatedInput>
          <AnimatedInput
            label="Artist"
            value={artist}
            onChangeText={setArtist}
            underline
            onFocus={() => setIsTextFocused(false)}
          ></AnimatedInput>
          <AnimatedInput
            ref={textArea}
            style={styles.textInput}
            label="Text"
            onSelectionChange={e => {
              setSelection(e.nativeEvent.selection)
            }}
            value={text}
            onChangeText={setText}
            multiline
            onFocus={() => setIsTextFocused(true)}
          />
        </View>
        {isTextFocused && (
          <View style={styles.chordsBar}>
            <View style={styles.searchChord}>
              <TextInput
                style={styles.chordInput}
                placeholder="Type Chord"
                autoCorrect={false}
                autoComplete="false"
                onChangeText={t => handleChangeChord(t)}
                value={actualChord}
              ></TextInput>
              {actualChord ? (
                <TouchableOpacity
                  style={styles.chordCancelButton}
                  onPress={() => setActualChord('')}
                >
                  <Icon name="close-outline" size={20} color={Colors.primary} />
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={styles.chordHintsWrapper}>
              <LinearGradient
                colors={['#D0D3D900', '#D0D3D9']}
                start={[1, 0]}
                end={[0, 0]}
                style={styles.fade}
              ></LinearGradient>
              <ScrollView
                style={styles.chordHints}
                contentContainerStyle={styles.chordHintsContainer}
                horizontal={true}
                vertical={false}
                keyboardShouldPersistTaps="always"
              >
                {hints.length
                  ? hints.map(ch => (
                      <TouchableOpacity
                        key={ch}
                        style={styles.chordHint}
                        onPress={() => addChord(ch)}
                      >
                        <Text style={{ color: '#666' }}>{ch}</Text>
                      </TouchableOpacity>
                    ))
                  : lastChords.map(ch => (
                      <TouchableOpacity
                        key={ch}
                        style={styles.chordHint}
                        onPress={() => addChord(ch)}
                      >
                        <Text style={{ color: '#666' }}>{ch}</Text>
                      </TouchableOpacity>
                    ))}
              </ScrollView>
              <View style={styles.fadeRight}></View>
              <LinearGradient
                colors={['#D0D3D900', '#D0D3D9']}
                start={[0, 0]}
                end={[1, 0]}
                style={{ ...styles.fade, right: 0 }}
              ></LinearGradient>
            </View>
            <TouchableOpacity style={styles.submitChordBtn} onPress={() => addChord(actualChord)}>
              <Icon name="checkmark" size={25} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  inputsWrapper: {
    marginHorizontal: 10,
    marginTop: 5,
    flex: 1
  },
  textInput: {
    flex: 1,
    alignSelf: 'stretch'
  },
  chordsBar: {
    backgroundColor: '#D0D3D9',
    height: 45,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
    paddingHorizontal: 7
  },
  searchChord: {
    backgroundColor: '#fff',
    height: 30,
    width: 100,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 3,
    paddingLeft: 10
  },
  chordInput: {
    marginRight: 5,
    flex: 1
  },
  chordCancelButton: {
    width: 24,
    height: 24,
    backgroundColor: '#eee',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chordHintsWrapper: {
    flex: 1
  },
  chordHints: {
    height: 35,
    flex: 1,
    marginHorizontal: 5
  },
  chordHintsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  chordHint: {
    marginHorizontal: 10
  },
  submitChordBtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: Colors.secondary
  },
  fade: {
    position: 'absolute',
    height: 30,
    width: 20,
    zIndex: 2
  }
})

export default NewSong
