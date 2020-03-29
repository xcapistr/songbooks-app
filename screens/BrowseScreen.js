import React, { useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Colors from '../constants/Colors'
import SongCard from '../components/SongCard'
import BookCard from '../components/BookCard'
import ArtistCard from '../components/ArtistCard'
import SearchHeader from '../components/SearchHeader'
import * as browseActions from '../store/actions/browse'

const BrowseScreen = props => {
  const results = useSelector(state => ({
    ...state.browse.books,
    ...state.browse.artists,
    ...state.browse.songs
  }))
  const dispatch = useDispatch()

  const search = async query => {
    dispatch(browseActions.fetchResults(query))
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
        data={Object.keys(results)}
        renderItem={({ item }) => {
          if (results[item].type === 'song') {
            return (
              <SongCard
                name={results[item].name}
                artist={results[item].artist}
                action={() => {
                  props.navigation.navigate('BrowseL2', {
                    type: 'song',
                    id: item,
                    name: results[item].name,
                    root: 'Browse'
                  })
                }}
              />
            )
          } else if (results[item].type === 'book') {
            return (
              <BookCard
                name={results[item].name}
                image={results[item].image}
                songsCount={results[item].songIds.length}
                action={() => {
                  props.navigation.navigate('BrowseL2', {
                    type: 'book',
                    id: item,
                    name: results[item].name,
                    root: 'Browse'
                  })
                }}
              />
            )
          } else {
            return (
              <ArtistCard
                name={results[item].name}
                action={() => {
                  props.navigation.navigate('BrowseL2', {
                    type: 'artist',
                    id: item,
                    name: results[item].name,
                    root: 'Browse'
                  })
                }}
              />
            )
          }
        }}
        keyExtractor={item => item}
      ></FlatList>
    </View>
  )
}

BrowseScreen.navigationOptions = navigationData => {
  return {
    headerTitle: <SearchHeader onSearch={navigationData.navigation.getParam('handleSearch')} />,
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
