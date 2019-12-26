import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

import Colors from '../constants/Colors'

const Card = props => {
  return (
    <View style={{ ...styles.card, ...props.style }}>
          {props.children}
    </View>
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
    padding: 10,
    backgroundColor: 'white'
  }
})

export default Card
