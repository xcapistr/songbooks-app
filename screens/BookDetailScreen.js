import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, Platform } from 'react-native'

import Colors from '../constants/Colors'
import SongCard from '../components/SongCard'
import { GetSongs } from '../services/Db'

const BookDetailScreen = props => {
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
          <SongCard name={itemData.item.name} artist={itemData.item.artist} action={()=>{props.navigation.navigate({routeName: 'Song'})}}/>
        )}
        keyExtractor={item => item.id}
      ></FlatList>
    </View>
  )
}

BookDetailScreen.navigationOptions = {
  headerTitle: 'My Songbook',
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
})

export default BookDetailScreen
