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
import L2Screen from '../screens/L2Screen'
import L3Screen from '../screens/L3Screen'
import ModalScreen from '../screens/ModalScreen'
import Colors from '../constants/Colors'
import Icon from '../components/Icon'

const browseStackNavigator = createStackNavigator({
  Browse: BrowseScreen,
  BrowseL2: L2Screen,
  BrowseL3: L3Screen
})

browseStackNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  const routes = navigation.state.routes
  const type =
    routes[routes.length - 1] &&
    routes[routes.length - 1].params &&
    routes[routes.length - 1].params.type
  if (type === 'song') {
    tabBarVisible = false
  }
  return {
    tabBarVisible
  }
}

const homeStackNavigator = createStackNavigator({
  Home: HomeScreen,
  HomeL2: L2Screen,
  HomeL3: L3Screen
})

homeStackNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  if (navigation.state.index > 1) {
    tabBarVisible = false
  }
  return {
    tabBarVisible
  }
}

const settingsStackNavigator = createStackNavigator({
  Settings: SettingsScreen
})

const mainTabNavigatorConfig = {
  Browse: {
    screen: browseStackNavigator,
    navigationOptions: {
      tabBarLabel: 'Browse',
      tabBarIcon: tabInfo => {
        return <Icon name="search-outline" size={25} color={tabInfo.tintColor} />
      }
    }
  },
  Home: {
    screen: homeStackNavigator,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: tabInfo => {
        return <Icon name="albums-outline" size={25} color={tabInfo.tintColor} />
      }
    }
  },
  Settings: {
    screen: settingsStackNavigator,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: tabInfo => {
        return <Icon name="cog-outline" size={25} color={tabInfo.tintColor} />
      }
    }
  }
}

const mainTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(mainTabNavigatorConfig, {
        shifting: true,
        barStyle: {
          backgroundColor: 'white'
        },
        activeColor: Colors.primary,
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

const rootStackNavigator = createStackNavigator(
  {
    main: {
      screen: mainTabNavigator,
      navigationOptions: {
        header: null
      }
    },
    modal: ModalScreen
  },
  {
    mode: 'modal'
  }
)

export default createAppContainer(rootStackNavigator)
