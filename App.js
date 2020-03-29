import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

import userReducer from './store/reducers/user'
import browseReducer from './store/reducers/browse'

const rootReducer = combineReducers({
  user: userReducer,
  browse: browseReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

const fetchFonts = () => {
  return Font.loadAsync({
    'roboto-mono': require('./assets/fonts/RobotoMono-Regular.ttf'),
    'roboto-mono-medium': require('./assets/fonts/RobotoMono-Medium.ttf'),
    'roboto-mono-bold': require('./assets/fonts/RobotoMono-Bold.ttf')
  })
}

import MainNavigator from './navigation/MainNavigation'

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false)

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={err => console.log(err)}
      />
    )
  }

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
