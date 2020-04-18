import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'

import * as Colors from '../constants/Colors'
import * as userActions from '../store/actions/user'
import * as browseActions from '../store/actions/browse'

const ListHeader = image => (
  <View>
    <Image style={styles.image} source={{ uri: image }} resizeMode="cover" />
    <View style={{ backgroundColor: '#ddd', height: 1 }}></View>
  </View>
)

const ItemSeparator = () => (
  <View style={{ backgroundColor: '#ddd', height: 1, marginLeft: 20 }}></View>
)

const ListFooter = () => <View style={{ backgroundColor: '#ddd', height: 1 }}></View>

const Spinner = () => (
  <View style={styles.spinner}>
    <ActivityIndicator size="large" color={Colors.primary} />
  </View>
)

const BookDetail = props => {
  const songs = useSelector(state =>
    props.navigation.getParam('root') === 'Home'
      ? state.user.books[props.navigation.getParam('id')].songs
      : state.browse.books[props.navigation.getParam('id')].songs
  )
  const image = useSelector(state =>
    props.navigation.getParam('root') === 'Home'
      ? state.user.books[props.navigation.getParam('id')].image
      : state.browse.books[props.navigation.getParam('id')].image
  )
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const loadSongs = async () => {
    try {
      console.log('book songs loading...')
      await dispatch(
        props.navigation.getParam('root') === 'Home'
          ? userActions.fetchBookSongs(props.navigation.getParam('id'))
          : browseActions.fetchBookSongs(props.navigation.getParam('id'))
      )
      console.log('done')
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    const willFocusScreen = props.navigation.addListener('willFocus', loadSongs)
    return () => {
      willFocusScreen.remove()
    }
  }, [loadSongs])

  useEffect(() => {
    !Object.keys(songs).length && setIsLoading(true)
    loadSongs().then(() => {
      setIsLoading(false)
    })
  }, [dispatch])

  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 5, paddingTop: 5 }}
        ListHeaderComponent={ListHeader(image)}
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={isLoading ? Spinner : ListFooter}
        data={Object.keys(songs)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.songTouchable}
            onPress={() => {
              props.navigation.navigate(props.navigation.getParam('root') + 'L3', {
                type: 'song',
                songId: songs[item].id,
                bookId: props.navigation.getParam('id'),
                name: songs[item].name,
                root: props.navigation.getParam('root')
              })
            }}
          >
            <View style={styles.songInfo}>
              <Text style={styles.songName}>{songs[item].name}</Text>
              <Text style={styles.songArtist}>{songs[item].artist}</Text>
            </View>
            <Ionicons name="ios-arrow-forward" size={25} color="#ccc" />
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
      ></FlatList>
    </View>
  )
}

const styles = StyleSheet.create({
  spinner: {
    margin: 50
  },
  screen: {
    flex: 1
  },
  image: {
    width: 130,
    height: 130,
    alignSelf: 'center',
    margin: 20,
    borderRadius: 10
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
