import React, { useEffect } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  // ActivityIndicator
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

const BookDetail = props => {
  // const [isLoading, setIsLoading] = useState(false)

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

  useEffect(() => {
    dispatch(
      props.navigation.getParam('root') === 'Home'
        ? userActions.fetchBookSongs(props.navigation.getParam('id'))
        : browseActions.fetchBookSongs(props.navigation.getParam('id'))
    )
  }, [dispatch])

  // if (isLoading) {
  //   return (
  //     <View style={styles.centered}>
  //       <ActivityIndicator size="large" color={Colors.primary} />
  //     </View>
  //   )
  // }

  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 5, paddingTop: 5 }}
        ListHeaderComponent={ListHeader(image)}
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
                bookId: props.navigation.getParam('id'),
                name: songs[item].name,
                root: props.navigation.getParam('root')
              })
            }}
          >
            <View style={styles.songInfo}>
              <Text style={styles.songName}>{songs[item].name}</Text>
              <Text style={styles.songArtist}>{songs[item].artist.name}</Text>
            </View>
            <Ionicons name="ios-arrow-forward" size={25} color="#ccc" />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
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
  image: {
    width: 130,
    height: 130,
    alignSelf: 'center',
    margin: 20,
    borderRadius: 10,
    elevation: 4,
    shadowColor: Colors.darker,
    shadowOffset: { with: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 4
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
