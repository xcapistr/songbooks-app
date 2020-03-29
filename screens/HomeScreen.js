import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Colors from '../constants/Colors'
import BookCard from '../components/BookCard'
import * as userActions from '../store/actions/user'

const HomeScreen = props => {
  const books = useSelector(state => state.user.books)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userActions.fetchBooks())
  }, [dispatch])

  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 5, paddingTop: 5 }}
        data={Object.keys(books)}
        renderItem={({item}) => (
          <BookCard
            name={books[item].name}
            image={books[item].image}
            songsCount={books[item].songIds.length}
            action={() =>
              props.navigation.navigate(
                'HomeL2',
                {
                  type: 'book',
                  id: item,
                  name: books[item].name,
                  root: 'Home'
                }
              )
            }
          />
        )}
        keyExtractor={item => item}
      ></FlatList>
    </View>
  )
}

HomeScreen.navigationOptions = {
  headerTitle: 'Your Library',
  headerStyle: {
    backgroundColor: 'white'
  },
  headerTintColor: Colors.primary
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
})

export default HomeScreen
