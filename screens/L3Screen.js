import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'

import SongDetail from '../components/SongDetail'
import Colors from '../constants/Colors'
import HeaderButton from '../components/HeaderButton'
import ImportSongModal from '../components/ImportSongModal'

const BrowseL3Screen = props => {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)

  useEffect(() => {
    if (props.navigation.getParam('root') === 'Browse') {
      props.navigation.setParams({ import: () => setIsImportModalOpen(true) })
    }
  }, [])

  return [
    props.navigation.getParam('root') === 'Browse' ? (
      <ImportSongModal
        key="modal"
        songId={props.navigation.getParam('songId')}
        isVisible={isImportModalOpen}
        close={() => {
          setIsImportModalOpen(false)
        }}
        songId={props.navigation.getParam('songId')}
        userId={1}
      ></ImportSongModal>
    ) : null,
    <SongDetail key="song-detail" navigation={props.navigation} />
  ]
}

BrowseL3Screen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('name'),
    headerStyle: {
      backgroundColor: 'white'
    },
    headerTintColor: Colors.primary,
    headerRight:
      navData.navigation.getParam('root') === 'Browse' ? (
        <HeaderButton
          iconName={navData.navigation.getParam('imported') ? 'import' : 'import-outline'}
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

export default BrowseL3Screen
