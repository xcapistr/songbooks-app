import React from 'react'

import NewBook from '../components/NewBook'
import Colors from '../constants/Colors'

const ModalScreen = props => {
  const type = props.navigation.getParam('type')

  return type === 'new-book' ? <NewBook goBack={props.navigation.goBack}></NewBook> : null
}

ModalScreen.navigationOptions = navigationData => {
  return {
    headerTitle: navigationData.navigation.getParam('type') === 'new-book' ? 'New Book' : '',
    headerTintColor: Colors.primary
  }
}

export default ModalScreen
