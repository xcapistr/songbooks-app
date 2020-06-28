import React from 'react'
import { TouchableOpacity, TouchableNativeFeedback, Platform, View } from 'react-native'

import Colors from '../constants/Colors'
import Icon from './Icon'

const HeaderIcon = props =>
  Platform.OS === 'ios' ? (
    <TouchableOpacity style={{marginRight: 10}} onPress={props.onPress}>
      <Icon name={props.iconName} size={23} color={Colors.primary} />
    </TouchableOpacity>
  ) : (
    <View style={{marginRight: 5}}>
    <View style={{ width: 44, height: 44, borderRadius: 22, overflow: 'hidden' }}>
      <TouchableNativeFeedback onPress={props.onPress}>
        <View style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center'}}>
          <Icon name={props.iconName} size={23} color={Colors.primary} />
        </View>
      </TouchableNativeFeedback>
    </View>
    </View>
  )
export default HeaderIcon
