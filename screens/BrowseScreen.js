import React, { useState, Fragment } from 'react'
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  FlatList
} from 'react-native'
import { SearchBar } from 'react-native-elements'

import Colors from '../constants/Colors'
import SongCard from '../components/SongCard'
import { GetSongs } from '../services/Db'

const BrowseScreen = props => {
  const [query, setQuery] = useState('')
  const [data, setData] = useState([])

  const getData = async () => {
    const songs = await GetSongs()
    setData(songs)
  }

  return (
    <Fragment>
      <SafeAreaView
        style={{
          flex: 0,
          backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
        }}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.navbar}>
          <SearchBar
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.input}
            searchIcon={{ color: Colors.lighter }}
            clearIcon={{ color: Colors.lighter }}
            placeholderTextColor={Colors.lighter}
            placeholder="Search"
            value={query}
            onChangeText={setQuery}
          />
          <TouchableOpacity style={styles.filterBtn} onPress={getData}>
            <Text style={styles.filterBtnLabel}>Filter</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={{ paddingBottom: 5, paddingTop: 5 }}
          data={data}
          renderItem={itemData => (
            <SongCard name={itemData.item.name} artist={itemData.item.artist} />
          )}
          keyExtractor={item => item.name + ' ' + item.artist}
        ></FlatList>
      </SafeAreaView>
    </Fragment>
  )
}

BrowseScreen.navigationOptions = {
  header: null
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
