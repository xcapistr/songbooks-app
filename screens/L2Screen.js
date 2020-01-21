import React from 'react'
import { StyleSheet } from 'react-native'

import SongDetail from '../components/SongDetail'
import BookDetail from '../components/BookDetail'
import ArtistDetail from '../components/ArtistDetail'
import Colors from '../constants/Colors'

const BrowseL2Screen = props => {
  const content =
    props.navigation.getParam('type') === 'song' ? (
      <SongDetail id={props.navigation.getParam('id')} />
    ) : props.navigation.getParam('type') === 'book' ? (
      <BookDetail
        id={props.navigation.getParam('id')}
        navigation={props.navigation}
      />
    ) : props.navigation.getParam('type') === 'artist' ? (
      <ArtistDetail
        id={props.navigation.getParam('id')}
        navigation={props.navigation}
      />
    ) : null

  return content
}

BrowseL2Screen.navigationOptions = navigationData => {
  return {
    headerTitle: navigationData.navigation.getParam('name'),
    headerStyle: {
      backgroundColor: 'white'
    },
    headerTintColor: Colors.primary
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default BrowseL2Screen
