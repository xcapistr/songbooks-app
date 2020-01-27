import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Image, View, Platform } from 'react-native'

import Card from './Card'
import Colors from '../constants/Colors'

const SongCard = props => {
  return props.mini ? (
    <Card style={styles.cardMini} action={props.action}>
      <Text style={styles.name}>{props.name}</Text>
      <Text style={styles.reviews}>
        40K <Text style={styles.stars}>★★★★☆</Text>
      </Text>
    </Card>
  ) : (
    <Card style={styles.card} action={props.action}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={{
            uri: props.image
          }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.infoWrapper}>
        <View>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.artist}>{props.artist}</Text>
        </View>
        <View style={styles.lastLine}>
          <Text style={styles.type}>song</Text>
          <Text style={styles.reviews}>
            40K <Text style={styles.stars}>★★★★☆</Text>
          </Text>
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row'
  },
  cardMini: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  imageWrapper: {
    borderRadius: 5,
    overflow: 'hidden'
  },
  image: {
    width: 70,
    height: 70,
    opacity: 0.9
  },
  infoWrapper: {
    marginLeft: 15,
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
    color: '#777',
    marginTop: Platform.OS === 'android' ? 0 : 3
  },
  lastLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  type: {
    textTransform: 'uppercase',
    fontSize: 10,
    color: Colors.primary,
    fontWeight: 'bold'
  },
  reviews: {
    fontSize: 11,
    color: '#333'
  },
  stars: {
    fontSize: Platform.OS === 'android' ? 14 : 12
  }
})

export default SongCard
