import React from 'react'
import { StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import SongDetail from '../components/SongDetail'
import BookDetail from '../components/BookDetail'
import ArtistDetail from '../components/ArtistDetail'
import NewBook from '../components/NewBook'
import Colors from '../constants/Colors'
import HeaderIcon from '../components/HeaderIcon'

const BrowseL2Screen = props => {
  const type = props.navigation.getParam('type')
  const content =
    type === 'song' ? (
      <SongDetail navigation={props.navigation} />
    ) : type === 'book' ? (
      <BookDetail id={props.navigation.getParam('id')} navigation={props.navigation} />
    ) : type === 'artist' ? (
      <ArtistDetail navigation={props.navigation} />
    ) : type === 'newBook' ? (
      <NewBook />
    ) : null

  return content
}

BrowseL2Screen.navigationOptions = navigationData => {
  return {
    headerTitle: navigationData.navigation.getParam('name'),
    headerStyle: {
      backgroundColor: 'white'
    },
    headerTintColor: Colors.primary,
    headerRight:
      navigationData.navigation.getParam('type') === 'newBook' ? (
        <HeaderButtons HeaderButtonComponent={HeaderIcon}>
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
            onPress={() => console.log('SAVING BOOK')}
          />
        </HeaderButtons>
      ) : null
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default BrowseL2Screen
