import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const HomeScreen = props => {
  return(
    <View style={styles.screen}>
        <Text>This is Home screen</Text>
    </View>
  )
}

HomeScreen.navigationOptions = {
    headerTitle: 'Home'
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default HomeScreen