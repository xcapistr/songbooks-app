import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Image, View, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Card from './Card'
import Colors from '../constants/Colors'

const SongCard = props => {
  return (
    <Card style={styles.card} action={props.action}>
      <View style={styles.iconWrapper}>
        <Ionicons name="ios-musical-notes" size={20} color={Colors.primary} />
      </View>
      <View style={styles.infoWrapper}>
        <View>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.artist}>by {props.artist}</Text>
          <Text style={styles.lastLine}>4.8 ★</Text>
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconWrapper: {
    borderRadius: 25,
    width: 40,
    height: 40,
    backgroundColor: Colors.lightest,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoWrapper: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 2
  },
  name: {
    fontSize: 18,
    fontWeight: Platform.OS === 'android' ? '700' : '600',
    color: '#333'
  },
  artist: {
    fontSize: 14,
    color: '#777'
  },
  lastLine: {
    marginTop: 3,
    color: '#333',
    fontSize: 10
  }
})

export default SongCard
