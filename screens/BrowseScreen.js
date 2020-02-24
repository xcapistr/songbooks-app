import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'

import Colors from '../constants/Colors'
import SongCard from '../components/SongCard'
import BookCard from '../components/BookCard'
import ArtistCard from '../components/ArtistCard'
import SearchHeader from '../components/SearchHeader'
import { Search } from '../services/Db'

const BrowseScreen = props => {
  const [data, setData] = useState([])

  const search = async q => {
    const all = await Search(q)
    setData(all)
  }

  useEffect(() => {
    props.navigation.setParams({
      handleSearch: search
    })
  }, [])

  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 5, paddingTop: 5 }}
        data={data}
        renderItem={itemData => {
          if (itemData.item.type === 'song') {
            return (
              <SongCard
                name={itemData.item.name}
                artist={itemData.item.artist.name}
                action={() => {
                  props.navigation.navigate(
                    'BrowseL2',
                    {
                      type: 'song',
                      id: itemData.item.id,
                      name: itemData.item.name,
                      root: 'Browse'
                    },
                    itemData.item.name
                  )
                }}
              />
            )
          } else if (itemData.item.type === 'book') {
            return (
              <BookCard
                name={itemData.item.name}
                image={itemData.item.image}
                action={() => {
                  props.navigation.navigate(
                    'BrowseL2',
                    {
                      type: 'book',
                      id: itemData.item.id,
                      name: itemData.item.name,
                      root: 'Browse'
                    },
                    itemData.item.name
                  )
                }}
              />
            )
          } else {
            return (
              <ArtistCard
                name={itemData.item.name}
                action={() => {
                  props.navigation.navigate(
                    'BrowseL2',
                    {
                      type: 'artist',
                      id: itemData.item.id,
                      name: itemData.item.name,
                      root: 'Browse'
                    },
                    itemData.item.name
                  )
                }}
              />
            )
          }
        }}
        keyExtractor={item => item.id}
      ></FlatList>
    </View>
  )
}

BrowseScreen.navigationOptions = navigationData => {
  return {
    headerTitle: (
      <SearchHeader
        onSearch={navigationData.navigation.getParam('handleSearch')}
      />
    ),
    headerStyle: {
      backgroundColor: 'white'
    },
    headerTintColor: Colors.primary
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
})

export default BrowseScreen
