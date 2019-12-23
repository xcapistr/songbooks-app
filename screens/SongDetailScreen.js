import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const SongDetailScreen = props => {
  return(
    <View style={styles.screen}>
        <Text>This is Song screen</Text>
    </View>
  )
}

SongDetailScreen.navigationOptions = {
    headerTitle: 'Song'
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default SongDetailScreen