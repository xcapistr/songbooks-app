import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import Colors from '../constants/Colors'

const Button = props => {
  let buttonTypeStyle = null
  let titleTypeStyle = null
  switch (props.type) {
    case 'primary':
      buttonTypeStyle = styles.buttonPrimary
      titleTypeStyle = styles.titlePrimary
      break
    case 'danger':
      buttonTypeStyle = styles.buttonDanger
      titleTypeStyle = styles.titleDanger
      break
    default:
      break
  }
  return (
    <TouchableOpacity style={{ ...styles.button, ...buttonTypeStyle }} onPress={props.onPress}>
      <Text style={{ ...styles.buttonTitle, ...titleTypeStyle }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    borderRadius: 10,
    margin: 7,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { with: 1, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    backgroundColor: 'white',
    shadowColor: Colors.primary
  },
  buttonTitle: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: Colors.primary
  },
  buttonPrimary: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.darker
  },
  titlePrimary: {
    color: 'white',
    fontWeight: 'bold'
  },
  buttonDanger: {
    backgroundColor: Colors.danger,
    shadowColor: Colors.danger
  },
  titleDanger: {
    color: 'white',
    fontWeight: 'bold'
  }
})

export default Button
