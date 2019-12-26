import React from 'react'
import { StyleSheet, View, Text, Platform } from 'react-native'

import Colors from '../constants/Colors'

const HomeScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>This is Home screen</Text>
    </View>
  )
}

HomeScreen.navigationOptions = {
  headerTitle: 'Home',
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default HomeScreen
