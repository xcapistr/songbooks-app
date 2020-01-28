import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, Image, TouchableOpacity, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { GetBook } from '../services/Db'
import * as Colors from '../constants/Colors'

const ListHeader = image => (
  <View>
    <Image style={styles.image} source={{ uri: image }} resizeMode="cover" />
    <View style={{ backgroundColor: '#ddd', height: 1 }}></View>
  </View>
)

const ItemSeparator = () => (
  <View style={{ backgroundColor: '#ddd', height: 1, marginLeft: 20 }}></View>
)

const ListFooter = () => (
  <View style={{ backgroundColor: '#ddd', height: 1 }}></View>
)

const BookDetail = props => {
  const [data, setData] = useState({})

  const reload = async () => {
    const book = await GetBook(props.navigation.getParam('id'))
    setData(book)
  }

  useEffect(() => {
    reload()
  }, [])

  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 5, paddingTop: 5 }}
        ListHeaderComponent={ListHeader(data.image)}
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={ListFooter}
        data={data.songs}
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
            <View style={styles.songInfo}>
              <Text style={styles.songName}>{itemData.item.name}</Text>
              <Text style={styles.songArtist}>{itemData.item.artist.name}</Text>
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
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  songInfo: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10
  },
  songName: {
    fontSize: 18,
    color: '#333'
  },
  songArtist: {
    fontSize: 12,
    color: '#888'
  }
})

export default BookDetail
