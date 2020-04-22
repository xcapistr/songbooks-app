import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import Colors from '../constants/Colors'
import BookCard from '../components/BookCard'
import * as userActions from '../store/actions/user'
import HeaderIcon from '../components/HeaderIcon'

const HomeScreen = props => {
  const books = useSelector(state => state.user.books)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const loadBooks = async () => {
    try {
      console.log('user books loading...')
      await dispatch(userActions.fetchBooks())
      console.log('done')
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    const willFocusScreen = props.navigation.addListener('willFocus', loadBooks)
    return () => {
      willFocusScreen.remove()
    }
  }, [loadBooks])

  useEffect(() => {
    setIsLoading(true)
    loadBooks().then(() => {
      setIsLoading(false)
    })
  }, [dispatch])

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 5, paddingTop: 5 }}
        data={Object.keys(books)}
        renderItem={({ item }) => (
          <BookCard
            name={books[item].name}
            image={books[item].image}
            songsCount={books[item].songIds.length}
            action={() =>
              props.navigation.navigate('HomeL2', {
                type: 'book',
                id: item,
                name: books[item].name,
                root: 'Home'
              })
            }
          />
        )}
        keyExtractor={item => item}
      ></FlatList>
    </View>
  )
}

HomeScreen.navigationOptions = navData => ({
  headerTitle: 'Your Library',
  headerStyle: {
    backgroundColor: 'white'
  },
  headerTintColor: Colors.primary,
  headerRight: (
    <HeaderButtons HeaderButtonComponent={HeaderIcon}>
      <Item
        title="Menu"
        iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
        onPress={() => navData.navigation.navigate('modal', {type: 'new-book'})}
      />
    </HeaderButtons>
  )
})

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center'
  },
  screen: {
    flex: 1
  }
})

export default HomeScreen
