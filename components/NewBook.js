import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'

import Colors from '../constants/Colors'
import Button from '../components/Button'
import { createBook } from '../services/Db'

const NewBook = props => {
  const [name, setName] = useState('')
  const [isNameFocused, setIsNameFocused] = useState(true)
  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!')
      }
    }
  }

  _pickImage = async () => {
    try {
      Keyboard.dismiss()
      await getPermissionAsync()
      setIsLoading(true)
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.image,
        allowsEditing: true,
        base64: true,
        aspect: [1, 1],
        quality: 0.4
      })
      if (!result.cancelled) {
        setImage(`data:image/jpg;base64,${result.base64}`)
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      throw error
    }
  }

  const save = async () => {
    await createBook(name, image)
    props.goBack()
  }

  return (
    <TouchableWithoutFeedback style={styles.screen} onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.screen}>
        <TouchableOpacity style={styles.imageWrapper} onPress={_pickImage}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#ccc" />
          ) : image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text style={styles.imageText}>Pick Image</Text>
          )}
        </TouchableOpacity>
        <TextInput
          style={{
            ...styles.textInput,
            borderBottomColor: isNameFocused ? Colors.primary : Colors.lightest
          }}
          placeholder="Book Name"
          onChangeText={value => setName(value)}
          value={name}
          autoFocus={true}
          autoCorrect={false}
          autoCapitalize="sentences"
          returnKeyType="next"
          onSubmitEditing={() => {}}
          onFocus={() => setIsNameFocused(true)}
          onBlur={() => setIsNameFocused(false)}
        />
        <Button style={styles.button} onPress={save} title="Save"></Button>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  textInput: {
    margin: 20,
    maxWidth: 400,
    minWidth: 200,
    fontSize: 16,
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 2,
    color: '#333',
    textAlign: 'center'
  },
  imageWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    width: 130,
    height: 130,
    marginTop: 20,
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageText: {
    color: '#ccc',
    fontWeight: 'bold'
  },
  image: {
    width: 130,
    height: 130
  },
  button: {
    width: 130
  }
})

export default NewBook
