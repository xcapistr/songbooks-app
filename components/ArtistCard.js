import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'

import Card from '../components/Card'
import Colors from '../constants/Colors'

const ArtistCard = props => {
  return (
    <Card style={styles.card} action={props.action}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={{
            uri: props.image
          }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.infoWrapper}>
        <View>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.author}></Text>
        </View>
        <View style={styles.lastLine}>
          <Text style={styles.type}>artist</Text>
          <Text style={styles.songsCount}>26 songs</Text>
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row'
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
  songsCount: {
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
  songsCount: {
    fontSize: 11,
    color: '#333'
  }
})

export default ArtistCard
