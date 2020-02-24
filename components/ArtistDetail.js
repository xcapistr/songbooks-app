import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { GetArtist } from '../services/Db'
import Colors from '../constants/Colors'

const ItemSeparator = () => (
  <View style={{ backgroundColor: '#ddd', height: 1, marginLeft: 54 }}></View>
)

const ListBorder = () => <View style={{ backgroundColor: '#ddd', height: 1 }}></View>

const ArtistDetail = props => {
  const [data, setData] = useState({ songs: [] })
  const [isLoading, setIsLoading] = useState(false)

  const reload = async () => {
    setIsLoading(true)
    const artist = await GetArtist(props.navigation.getParam('id'))
    setData(artist)
    setIsLoading(false)
  }

  useEffect(() => {
    reload()
  }, [])

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 5, paddingTop: 5 }}
        data={data.songs}
        ListHeaderComponent={ListBorder}
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={ListBorder}
        renderItem={itemData => (
          <TouchableOpacity
            style={styles.songTouchable}
            onPress={() => {
              props.navigation.navigate(
                props.navigation.getParam('root') + 'L3',
                {
                  type: 'song',
                  id: itemData.item.id,
                  name: itemData.item.name
                },
                itemData.item.name
              )
            }}
          >
            <Image
              style={styles.songIcon}
              source={require('../assets/img/chord-icon.png')}
              resizeMode="cover"
            />
            <View style={styles.songInfo}>
              <Text style={styles.songName}>{itemData.item.name}</Text>
            </View>
            <Ionicons name="ios-arrow-forward" size={25} color="#ccc" />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      ></FlatList>
    </View>
  )
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  screen: {
    flex: 1
  },
  songTouchable: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  songIcon: {
    width: 34,
    height: 34,
    borderRadius: 17
  },
  songInfo: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10
  },
  songName: {
    fontSize: 18,
    color: '#333'
  }
})

export default ArtistDetail
