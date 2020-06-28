import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'

import SongDetail from '../components/SongDetail'
import BookDetail from '../components/BookDetail'
import ArtistDetail from '../components/ArtistDetail'
import Colors from '../constants/Colors'
import HeaderButton from '../components/HeaderButton'
import ImportSongModal from '../components/ImportSongModal'

const BrowseL2Screen = props => {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)

  const type = props.navigation.getParam('type')

  useEffect(() => {
    if (type !== 'artist') {
      props.navigation.setParams({ import: () => setIsImportModalOpen(true) })
    }
  }, [])

  return type === 'song' ? (
    [
      <ImportSongModal
        key="modal"
        songId={props.navigation.getParam('songId')}
        isVisible={isImportModalOpen}
        close={() => {
          setIsImportModalOpen(false)
        }}
        songId={props.navigation.getParam('songId')}
        userId={1}
      ></ImportSongModal>,
      <SongDetail key="song" navigation={props.navigation} />
    ]
  ) : type === 'book' ? (
    <BookDetail key="book" id={props.navigation.getParam('id')} navigation={props.navigation} />
  ) : type === 'artist' ? (
    <ArtistDetail key="artist" id={props.navigation.getParam('id')} navigation={props.navigation} />
  ) : null
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
        <HeaderButton
          iconName="add-outline"
          onPress={() =>
            navData.navigation.navigate('modal', {
              type: 'new-song',
              id: navData.navigation.getParam('id')
            })
          }
        ></HeaderButton>
      ) : navData.navigation.getParam('type') !== 'artist' ? (
        <HeaderButton
          iconName={navData.navigation.getParam('imported') ? "import" : "import-outline"}
          onPress={navData.navigation.getParam('import')}
        ></HeaderButton>
      ) : null
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default BrowseL2Screen
