import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { GetArtist } from '../services/Db'
import Colors from '../constants/Colors'

const ListHeader = image => (
  <View>
    <Image style={styles.image} source={{ uri: image }} resizeMode="cover" />
    <View style={{ backgroundColor: '#ddd', height: 1 }}></View>
  </View>
)

const ItemSeparator = () => (
  <View style={{ backgroundColor: '#ddd', height: 1, marginLeft: 54 }}></View>
)

const ListFooter = () => (
  <View style={{ backgroundColor: '#ddd', height: 1 }}></View>
)

const ArtistDetail = props => {
  const [data, setData] = useState({ songs: [] })

  const reload = async () => {
    const artist = await GetArtist(props.navigation.getParam('id'))
    setData(artist)
  }

  useEffect(() => {
    reload()
  }, [])

  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 5, paddingTop: 5 }}
        data={data.songs}
        ListHeaderComponent={ListHeader(data.image)}
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={ListFooter}
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
  screen: {
    flex: 1
  },
  image: {
    width: 130,
    height: 130,
    alignSelf: 'center',
    margin: 20,
    borderRadius: 10,
    elevation: 4,
    shadowColor: Colors.darker,
    shadowOffset: { with: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 4
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
    borderRadius: 17,
    // borderWidth: 1,
    // borderColor: Colors.primary
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