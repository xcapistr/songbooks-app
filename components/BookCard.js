import React from 'react'
import { StyleSheet, Text, Image, View, Platform } from 'react-native'

import Card from './Card'
import Colors from '../constants/Colors'

const BookCard = props => {
  return (
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
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.author}>by You</Text>
        <Text style={styles.lastLine}>34 songs | 4.8 ★</Text>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 13,
    marginLeft: 2
  },
  image: {
    width: 55,
    height: 55,
    opacity: 0.9
  },
  infoWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 2
  },
  name: {
    fontSize: 18,
    fontWeight: Platform.OS === 'android' ? '700' : '600',
    color: '#333'
  },
  author: {
    fontSize: 14,
    color: '#777'
  },
  lastLine: {
    marginTop: 3,
    color: '#333',
    fontSize: 10
  }
})

export default BookCard
