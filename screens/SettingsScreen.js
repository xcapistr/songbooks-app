import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const SettingsScreen = props => {
  return(
    <View style={styles.screen}>
        <Text>This is Settings screen</Text>
    </View>
  )
}

SettingsScreen.navigationOptions = {
    headerTitle: 'User Settings'
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default SettingsScreen