import React, { useState, useEffect } from 'react'
import { View, TextInput, Animated } from 'react-native'

import Colors from '../constants/Colors'

const AnimatedInput = props => {
  const [isFocused, setIsFocused] = useState(false)
  const [labelAnimation] = useState(new Animated.Value(props.value === '' ? 0 : 1))

  useEffect(() => {
      console.log('focused:', isFocused)
    Animated.timing(labelAnimation, {
      toValue: isFocused || props.value !== '' ? 1 : 0,
      duration: 300
    }).start()
  }, [isFocused])

  const labelStyle = {
    position: 'absolute',
    left: 0,
    top: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 0]
    }),
    fontSize: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 14]
    }),
    color: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', Colors.primary]
    })
  }
  return (
    <View style={{ paddingTop: 18, width: '100%', margin: 5}}>
      <Animated.Text style={labelStyle}>{props.label}</Animated.Text>
      <TextInput
        {...props}
        style={{
          fontSize: 20,
          color: '#333',
          borderBottomWidth: 1,
          borderBottomColor: isFocused ? Colors.primary : Colors.lighter,
          width: '100%'
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  )
}

export default AnimatedInput
