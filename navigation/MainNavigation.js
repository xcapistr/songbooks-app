import React from 'react'
import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { Ionicons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import BrowseScreen from '../screens/BrowseScreen'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import SongDetailScreen from '../screens/SongDetailScreen'
import Colors from '../constants/Colors'

const browseStackNavigator = createStackNavigator({
  Browse: BrowseScreen,
  Song: SongDetailScreen
})

const homeStackNavigator = createStackNavigator({
  Home: HomeScreen,
  Song: SongDetailScreen
})

const settingsStackNavigator = createStackNavigator({
  Settings: SettingsScreen
})

const mainTabNavigatorConfig = {
  Browse: {
    screen: browseStackNavigator,
    navigationOptions: {
      tabBarLabel: 'Browse',
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-search" size={25} color={tabInfo.tintColor} />
        )
      }
    }
  },
  Home: {
    screen: homeStackNavigator,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-home" size={25} color={tabInfo.tintColor} />
      }
    }
  },
  Settings: {
    screen: settingsStackNavigator,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-settings" size={25} color={tabInfo.tintColor} />
        )
      }
    }
  }
}

const mainTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(mainTabNavigatorConfig, {
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primary
        },
        activeColor: 'white',
        inactiveColor: Colors.lighter
      })
    : createBottomTabNavigator(mainTabNavigatorConfig, {
        defaultNavigationOptions: {
          tabBarOptions: {
            activeTintColor: Colors.primary,
            inactiveTintColor: Colors.lighter
          }
        }
      })

export default createAppContainer(mainTabNavigator)
