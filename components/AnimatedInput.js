import React, { useState, useEffect } from 'react'
import { View, TextInput, Animated } from 'react-native'

import Colors from '../constants/Colors'

const AnimatedInput = React.forwardRef((props, ref) => {
  const [isFocused, setIsFocused] = useState(false)
  const [labelAnimation] = useState(new Animated.Value(props.value === '' ? 0 : 1))

  useEffect(() => {
    Animated.timing(labelAnimation, {
      toValue: isFocused || props.value !== '' ? 1 : 0,
      duration: 200
    }).start()
  }, [isFocused])

  const labelStyle = {
    position: 'absolute',
    left: 0,
    top: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 0]
    }),
    fontSize: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12]
    }),
    color: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['#bbb', Colors.primary]
    })
  }
  return (
    <View
      style={{
        paddingTop: 14,
        width: '100%',
        marginBottom: isFocused && props.underline ? 4 : 5,
        ...props.style
      }}
    >
      <Animated.Text style={labelStyle}>{props.label}</Animated.Text>
      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        autoCorrect={false}
        ref={ref}
        style={{
          fontSize: 16,
          color: '#333',
          paddingBottom: 4,
          borderBottomColor: isFocused ? Colors.primary : '#ddd',
          borderBottomWidth: props.underline ? (isFocused ? 2 : 1) : 0,
          width: '100%',
          textAlignVertical: 'top',
          height: props.multiline ? '100%' : null
        }}
        onSelectionChange={props.onSelectionChange}
        autoCapitalize={props.autoCapitalize || 'sentences'}
        multiline={props.multiline}
        onFocus={() => {
          props.onFocus && props.onFocus()
          setIsFocused(true)
        }}
        onBlur={() => {
          props.onBlur && props.onBlur()
          setIsFocused(false)
        }}
      />
    </View>
  )
})

export default AnimatedInput
