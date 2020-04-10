import React from 'react'
import { StyleSheet } from 'react-native'

import SongDetail from '../components/SongDetail'
import Colors from '../constants/Colors'

const BrowseL3Screen = props => {
  return <SongDetail navigation={props.navigation}/>
}

BrowseL3Screen.navigationOptions = navigationData => {
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

export default BrowseL3Screen
