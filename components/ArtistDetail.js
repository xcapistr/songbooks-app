import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'

import * as browseActions from '../store/actions/browse'
import Colors from '../constants/Colors'

const ItemSeparator = () => (
  <View style={{ backgroundColor: '#ddd', height: 1, marginLeft: 20 }}></View>
)

const ListFooter = () => <View style={{ backgroundColor: '#ddd', height: 1 }}></View>

const ArtistDetail = props => {
  const songs = useSelector(state => state.browse.artists[props.navigation.getParam('id')].songs)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const loadSongs = async () => {
    try {
      console.log('artist songs loading...')
      await dispatch(browseActions.fetchArtistSongs(props.navigation.getParam('id')))
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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 5, paddingTop: 5 }}
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={ListFooter}
        data={Object.keys(songs)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.songTouchable}
            onPress={() => {
              props.navigation.navigate(props.navigation.getParam('root') + 'L3', {
                type: 'song',
                songId: songs[item].id,
                artistId: props.navigation.getParam('id'),
                name: songs[item].name,
                root: props.navigation.getParam('root'),
                imported: songs[item].imported
              })
            }}
          >
            <View style={styles.songInfo}>
              <Text style={styles.songName}>{songs[item].name}</Text>
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  screen: {
    flex: 1
  },
  songTouchable: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50
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
})

export default ArtistDetail
