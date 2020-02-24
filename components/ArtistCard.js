import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Card from '../components/Card'
import Colors from '../constants/Colors'

const ArtistCard = props => {
  return (
    <Card style={styles.card} action={props.action}>
      <View style={styles.iconWrapper}>
        <Ionicons name="ios-person" size={25} color={Colors.primary} />
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.lastLine}>34 songs</Text>
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
  lastLine: {
    marginTop: 3,
    color: '#333',
    fontSize: 10
  }
})

export default ArtistCard
