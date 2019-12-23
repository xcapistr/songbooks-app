import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const BrowseScreen = props => {
  return(
    <View style={styles.screen}>
        <Text>This is Browse screen</Text>
    </View>
  )
}

BrowseScreen.navigationOptions = {
    headerTitle: 'Browse'
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default BrowseScreen