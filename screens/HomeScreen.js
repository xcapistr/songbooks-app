import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'

import Colors from '../constants/Colors'
import BookCard from '../components/BookCard'
import { GetBooks } from '../services/Db'

const HomeScreen = props => {
  const [data, setData] = useState([])

  const reload = async () => {
    const books = await GetBooks()
    setData(books)
  }

  useEffect(() => {
    reload()
  }, [])

  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 5, paddingTop: 5 }}
        data={data}
        renderItem={itemData => (
          <BookCard
            name={itemData.item.name}
            image={itemData.item.image}
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
