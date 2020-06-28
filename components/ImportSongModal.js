import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'

import Modal from './Modal'
import Icon from './Icon'
import Colors from '../constants/Colors'
import { GetUserSongBooks } from '../services/Db'

const ImportSongModal = props => {
  const [userBooks, setUserBooks] = useState([])

  const load = async () => {
    const data = await GetUserSongBooks(props.userId, props.songId)
    setUserBooks(data)
  }

  useEffect(() => {
    if (props.isVisible) {
      load()
    }
  }, [props.isVisible])

  const save = () => {
    console.log('Save song', props.songId)
    props.close()
  }

  return (
    <Modal
      title="Add song to your library"
      isVisible={props.isVisible}
      buttons={[
        {
          title: 'CANCEL',
          action: props.close
        },
        {
          title: 'SAVE',
          action: save
        }
      ]}
    >
      <ScrollView style={styles.list}>
        {userBooks.map((book, i) => (
          <TouchableOpacity key={book.id} style={styles.item}>
            <View style={styles.checkbox}>
              <Icon name="checkmark" size={20} color="white" />
            </View>
            <Text style={styles.text}>{book.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  list: {
    maxHeight: 150
  },
  checkbox: {
    height: 23,
    width: 23,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: Colors.primary,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  text: {
    marginRight: 10
  }
})

export default ImportSongModal
