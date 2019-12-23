import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'

import BrowseScreen from '../screens/BrowseScreen'
import HomeScreen from '../screens/HomeScreen'
import SongDetailScreen from '../screens/SongDetailScreen'

const browseStackNavigator = createStackNavigator({
  Browse: BrowseScreen,
  Song: SongDetailScreen
})

const homeStackNavigator = createStackNavigator({
  Home: HomeScreen,
  Song: SongDetailScreen
})

const mainNavigator = createBottomTabNavigator({
  Browse: {
    screen: browseStackNavigator,
    navigationOptions: {
      tabBarLabel: 'Browse'
    }
  },
  Home: {
    screen: homeStackNavigator,
    navigationOptions: {
      tabBarLabel: 'Home'
    }
  }
})

export default createAppContainer(mainNavigator)
