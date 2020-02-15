import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated
} from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

import Colors from '../constants/Colors'

const SongToolbar = props => {
  const [transposition, setTransposition] = useState(0)
  const [bottomAnim] = useState(new Animated.Value(-100))

  useEffect(() => {
    const bottom = props.show ? 0 : -100
    Animated.spring(bottomAnim, {
      toValue: bottom,
      speed: 20,
      bounciness: 15
    }).start()
  }, [props.show])

  return (
    <Animated.View style={{ ...styles.wrapper, bottom: bottomAnim }}>
      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.toolbarButton} onPress={props.onTextSize}>
          <MaterialCommunityIcons
            name="format-size"
            size={25}
            color={Colors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarButton}>
          <MaterialCommunityIcons
            name="guitar-acoustic"
            size={25}
            color={Colors.primary}
          />
        </TouchableOpacity>
        <View style={styles.divider}></View>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => {
            setTransposition(transposition - 1)
          }}
        >
          <Ionicons name="ios-remove" size={20} color={Colors.primary} />
        </TouchableOpacity>
        <View style={styles.transpositionDisplay}>
          <Text style={styles.transpositionText}>{transposition}</Text>
        </View>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => {
            setTransposition(transposition + 1)
          }}
        >
          <Ionicons name="ios-add" size={20} color={Colors.primary} />
        </TouchableOpacity>
        <View style={styles.divider}></View>
        <TouchableOpacity style={styles.toolbarButton}>
          <Ionicons name="ios-speedometer" size={25} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolbarMiddleButton}
          onPress={props.onTogglePlay}
        >
          <Ionicons
            name={props.isPlaying ? 'ios-pause' : 'ios-play'}
            size={25}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    maxWidth: 500,
    width: '100%',
    position: 'absolute',
    bottom: -100
  },
  toolbar: {
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: Colors.lightest,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    elevation: 4,
    shadowColor: Colors.darker,
    shadowOffset: { with: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 4,
    paddingHorizontal: 5
  },
  toolbarMiddleButton: {
    backgroundColor: Colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  toolbarButton: {
    width: 40,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  transpositionDisplay: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 5
  },
  transpositionText: {
    color: Colors.primary,
    fontSize: 16
  },
  divider: {
    height: 50,
    width: 1,
    backgroundColor: Colors.lightest
  }
})

export default SongToolbar
