import React, { useState, useEffect } from 'react'

import NewBook from '../components/NewBook'
import NewSong from '../components/NewSong'
import Colors from '../constants/Colors'
import HeaderButton from '../components/HeaderButton'

const ModalScreen = props => {
  const [isSongSaved, setIsSongSaved] = useState(false)
  const type = props.navigation.getParam('type')

  useEffect(() => {
    if (type === 'new-song') {
      props.navigation.setParams({ save: () => setIsSongSaved(true) })
    }
  }, [])
  return type === 'new-book' ? (
    <NewBook goBack={props.navigation.goBack}></NewBook>
  ) : type === 'new-song' ? (
    <NewSong
      saved={isSongSaved}
      setSaved={setIsSongSaved}
      goBack={props.navigation.goBack}
      bookId={props.navigation.getParam('id')}
    ></NewSong>
  ) : null
}

ModalScreen.navigationOptions = navigationData => {
  const type = navigationData.navigation.getParam('type')
  return {
    headerTitle: type === 'new-book' ? 'New Book' : type === 'new-song' ? 'New Song' : '',
    headerTintColor: Colors.primary,
    headerRight:
      type === 'new-song' ? (
        <HeaderButton
          iconName="checkmark"
          onPress={navigationData.navigation.getParam('save')}
        ></HeaderButton>
      ) : null
  }
}

export default ModalScreen
