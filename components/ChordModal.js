import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity, Text } from 'react-native'
import Modal from 'react-native-modal'

import Colors from '../constants/Colors'
import ChordDetail from './ChordDetail'

const NewModal = props => {
  return (
    <Modal
      isVisible={props.isVisible}
      style={{ margin: 0 }}
      useNativeDriver={true}
    >
      <TouchableWithoutFeedback onPress={props.onClose}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableWithoutFeedback>
            <View style={styles.chordDetailWrapper}>
              <ChordDetail chord={props.chord}></ChordDetail>
              <TouchableOpacity onPress={props.onClose} style={styles.closeModalBtn}>
                <Text style={styles.closeModalBtnLabel}>OK</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  chordDetailWrapper: {
    backgroundColor: 'white',
    width: 300,
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: Colors.darker,
    shadowOffset: { with: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 4,
    elevation: 4
  },
  closeModalBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    padding: 5,
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  closeModalBtnLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
  
})

export default NewModal
