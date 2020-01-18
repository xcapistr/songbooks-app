import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Platform, FlatList } from 'react-native'

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
                artist={itemData.item.artist}
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
                image={itemData.item.image}
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
      backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  navbar: {
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
    borderBottomWidth: Platform.OS === 'android' ? 0 : 1,
    borderBottomColor: '#ccc'
  },
  filterBtn: {
    paddingLeft: 15,
    paddingRight: 17,
    height: 40,
    justifyContent: 'center'
  },
  filterBtnLabel: {
    fontSize: 17,
    color: Platform.OS === 'android' ? Colors.lighter : Colors.primary,
    fontWeight: '600'
  },
  searchBarContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    paddingRight: 0
  },
  inputContainer: {
    backgroundColor:
      Platform.OS === 'android' ? Colors.darker : Colors.lightest,
    borderRadius: 15,
    height: 40
  },
  input: {
    color: Platform.OS === 'android' ? Colors.lightest : Colors.primary
  }
})

export default BrowseScreen
