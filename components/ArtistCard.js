import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
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
        <View style={styles.badge}>
          <Text style={styles.badgeText}>34 songs</Text>
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
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
    alignItems: 'flex-start',
    marginVertical: 2
  },
  name: {
    fontSize: 18,
    fontWeight: Platform.OS === 'android' ? '700' : '600',
    color: '#333'
  },
  badge: {
    marginTop: 3,
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

export default ArtistCard
