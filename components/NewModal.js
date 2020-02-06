import React from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import Modal from 'react-native-modal'

const NewModal = props => {
  return (
    <Modal isVisible={props.isVisible} style={{ margin: 0 }}>
      <TouchableWithoutFeedback onPress={props.onClose}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableWithoutFeedback>{props.children}</TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default NewModal
