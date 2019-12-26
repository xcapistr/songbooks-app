import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import Colors from '../constants/Colors'

const SettingsScreen = props => {
  return(
    <View style={styles.screen}>
        <Text>This is Settings screen</Text>
    </View>
  )
}

SettingsScreen.navigationOptions = {
    headerTitle: 'User Settings',
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

export default SettingsScreen