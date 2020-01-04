import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native'

import Colors from '../constants/Colors'
// import { TouchableOpacity } from 'react-native-gesture-handler'

const Card = props => {
  return Platform.OS === 'android' ? (
    <View style={{ ...styles.card, overflow: 'hidden' }}>
      <TouchableNativeFeedback>
        <View style={{ ...props.style, padding: 10 }}>{props.children}</View>
      </TouchableNativeFeedback>
    </View>
  ) : (
    <TouchableOpacity>
      <View style={{ ...styles.card, ...props.style, padding: 10 }}>
        {props.children}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    shadowColor: Colors.darker,
    shadowOffset: { with: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 10,
    marginVertical: 6,
    marginHorizontal: 10,
    backgroundColor: 'white'
  }
})

export default Card
