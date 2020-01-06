import React, { useState } from 'react'
import { StyleSheet, View, Platform, FlatList } from 'react-native'

import Colors from '../constants/Colors'
import SongCard from '../components/SongCard'
import SearchHeader from '../components/SearchHeader'
import { GetSongs } from '../services/Db'

const BrowseScreen = props => {
  const [data, setData] = useState([])

  const getData = async () => {
    const songs = await GetSongs()
    setData(songs)
  }

  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 5, paddingTop: 5 }}
        data={data}
        renderItem={itemData => (
          <SongCard
            name={itemData.item.name}
            artist={itemData.item.artist}
            action={() => props.navigation.navigate({ routeName: 'Song' })}
          />
        )}
        keyExtractor={item => item.id}
      ></FlatList>
    </View>
  )
}

BrowseScreen.navigationOptions = {
  headerTitle: <SearchHeader />,
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const styles = StyleSheet.create({
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
