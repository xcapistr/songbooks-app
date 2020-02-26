import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Colors from '../constants/Colors'
import BookCard from '../components/BookCard'
import * as userLibraryActions from '../store/actions/userLibrary'

const HomeScreen = props => {
  const books = useSelector(state => state.userLibrary.userBooks)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userLibraryActions.fetchBooks())
  }, [dispatch])

  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 5, paddingTop: 5 }}
        data={books}
        renderItem={itemData => (
          <BookCard
            name={itemData.item.name}
            image={itemData.item.image}
            songsCount={itemData.item.songIds.length}
            action={() =>
              props.navigation.navigate(
                'HomeL2',
                {
                  type: 'book',
                  id: itemData.item.id,
                  name: itemData.item.name,
                  root: 'Home'
                },
                itemData.item.name
              )
            }
          />
        )}
        keyExtractor={item => item.id}
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
