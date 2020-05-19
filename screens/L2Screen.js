import React from 'react'
import { StyleSheet } from 'react-native'

import SongDetail from '../components/SongDetail'
import BookDetail from '../components/BookDetail'
import ArtistDetail from '../components/ArtistDetail'
import Colors from '../constants/Colors'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderIcon from '../components/HeaderIcon'

const BrowseL2Screen = props => {
  const type = props.navigation.getParam('type')
  const content =
    type === 'song' ? (
      <SongDetail navigation={props.navigation} />
    ) : type === 'book' ? (
      <BookDetail id={props.navigation.getParam('id')} navigation={props.navigation} />
    ) : type === 'artist' ? (
      <ArtistDetail id={props.navigation.getParam('id')} navigation={props.navigation} />
    ) : null

  return content
}

BrowseL2Screen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('name'),
    headerStyle: {
      backgroundColor: 'white'
    },
    headerTintColor: Colors.primary,
    headerRight:
      navData.navigation.getParam('root') === 'Home' ? (
        <HeaderButtons HeaderButtonComponent={HeaderIcon}>
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            onPress={() =>
              navData.navigation.navigate('modal', {
                type: 'new-song',
                id: navData.navigation.getParam('id')
              })
            }
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
