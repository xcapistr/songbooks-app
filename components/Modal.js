import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import ReactNativeModal from 'react-native-modal'

import Colors from '../constants/Colors'
import Button from '../components/Button'

const Modal = props => {
  return (
    <ReactNativeModal isVisible={props.isVisible} useNativeDriver={true}>
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <View style={styles.body}>{props.children}</View>
        <View style={styles.buttons}>
          {props.buttons.map((button, i) => (
            <Button key={i} title={button.title} type={button.type} onPress={button.action}/>
          ))}
        </View>
      </View>
    </ReactNativeModal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20
  },
  head: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightest
  },
  title: {
    margin: 15,
    textAlign: 'center',
    fontSize: 20,
    color: '#333'
  },
  body: {
    padding: 15
  },
  buttons: {
    borderTopWidth: 1,
    borderTopColor: Colors.lightest,
    flexDirection: 'row',
    padding: 7
  }
})

export default Modal
