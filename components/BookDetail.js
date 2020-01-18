import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'

import SongCard from '../components/SongCard'
import { GetSongs } from '../services/Db'

const BookDetail = props => {
  const [data, setData] = useState([])

  const reload = async () => {
    const songs = await GetSongs()
    setData(songs)
  }

  useEffect(() => {
    reload()
  }, [])

  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 5, paddingTop: 5 }}
        data={data}
        renderItem={itemData => (
          <SongCard
            name={itemData.item.name}
            artist={itemData.item.artist}
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
  }
})

export default BookDetail
