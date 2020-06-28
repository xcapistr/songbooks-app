import React from 'react'
import { StyleSheet, Text, Image, View, Platform } from 'react-native'

import Card from './Card'
import Colors from '../constants/Colors'
import Icon from './Icon'

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
        <Text style={styles.author}>by {props.ownerName}</Text>
        <View style={styles.lastLine}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {(props.songsCount || '0') + (props.songsCount === '1' ? ' song' : ' songs')}
            </Text>
          </View>
          <Text style={styles.stars}> 4.8 ★</Text>
          {props.imported && <Icon name="import" size={15} color={Colors.lighter} />}
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
    flexDirection: 'row',
    alignItems: 'center'
  },
  stars: {
    color: '#333',
    fontSize: 10,
    flex: 1
  },
  badge: {
    backgroundColor: Colors.lightest,
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 6
  },
  badgeText: {
    color: Colors.primary,
    fontSize: 10
  }
})

export default BookCard
