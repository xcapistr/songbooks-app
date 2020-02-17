import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Slider as ReactNativeSlider } from 'react-native-elements'

import Colors from '../constants/Colors'

const Slider = props => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Text style={styles.leftIcon}>#</Text>
      </View>
      <View style={styles.sliderWrapper}>
        <ReactNativeSlider
          value={props.value}
          minimumValue={props.minimumValue}
          maximumValue={props.maximumValue}
          minimumTrackTintColor={Colors.lighter}
          maximumTrackTintColor={Colors.lightest}
          step={props.step}
          onValueChange={props.onValueChange}
          thumbStyle={styles.thumb}
          trackStyle={styles.track}
        ></ReactNativeSlider>
      </View>
      <View style={styles.iconWrapper}>
        <Text style={styles.rightIcon}>#</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'stretch' },
  iconWrapper: { width: 40, justifyContent: 'center', alignItems: 'center' },
  leftIcon: { fontSize: 10 },
  rightIcon: { fontSize: 25 },
  sliderWrapper: { flex: 1 },
  thumb: {
    backgroundColor: 'white',
    shadowOffset: { with: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 5,
    elevation: 6,
    shadowColor: Colors.darker,
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.lighter
  },
  track: {
    height: 4,
    borderRadius: 2
  }
})

export default Slider
