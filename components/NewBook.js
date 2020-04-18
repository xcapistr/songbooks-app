import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native'

import Colors from '../constants/Colors'

const NewBook = props => {
  const [name, setName] = useState('')

  return (
    <View style={styles.screen}>
      <TextInput
        style={styles.textInput}
        placeholder="Book Name"
        onChangeText={value => setName(value)}
        value={name}
        autoFocus={true}
        autoCorrect={false}
        autoCapitalize="sentences"
        returnKeyType="next"
        onSubmitEditing={() => {}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  textInput: {
      margin: 10,
      fontSize: 16,
      borderBottomWidth: 1,
      borderColor: Colors.lightest,
      paddingVertical: 10,
      paddingHorizontal: 2,
      color: '#333'
  }
})

export default NewBook
