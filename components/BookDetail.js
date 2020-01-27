import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Image,
} from 'react-native'

import SongCard from '../components/SongCard'
import { GetBook } from '../services/Db'
import * as Colors from '../constants/Colors'

const ListHeader = image => (
  <Image style={styles.image} source={{ uri: image }} resizeMode="cover" />
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
          data={data.songs}
          renderItem={itemData => (
            <SongCard
              name={itemData.item.name}
              artist={itemData.item.artist.name}
              image={itemData.item.artist.image}
              action={() => {
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
            />
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
    margin: 10,
    borderRadius: 10,
    elevation: 4,
    shadowColor: Colors.darker,
    shadowOffset: { with: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 4
  }
})

export default BookDetail
