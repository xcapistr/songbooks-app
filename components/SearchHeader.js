import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native'
import { SearchBar } from 'react-native-elements'

import Colors from '../constants/Colors'

const SearchHeader = props => {
  const [query, setQuery] = useState('')
  return (
    <View style={styles.navbar}>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        searchIcon={{ color: Colors.lighter }}
        clearIcon={{ color: Colors.lighter }}
        placeholderTextColor={Colors.lighter}
        placeholder="Search"
      />
      <TouchableOpacity style={styles.filterBtn} onPress={() => {}}>
        <Text style={styles.filterBtnLabel}>Filter</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
    // marginBottom: Platform.OS === 'android' ? 0 : 5
  },
  filterBtn: {
    paddingLeft: 15,
    paddingRight: 17,
    height: 40,
    justifyContent: 'center'
  },
  filterBtnLabel: {
    fontSize: 17,
    color: Platform.OS === 'android' ? Colors.lighter : Colors.primary,
    fontWeight: '600'
  },
  searchBarContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    paddingRight: 0,
    height: Platform.OS === 'android' ? 40 : 30,
    paddingVertical: 0
  },
  inputContainer: {
    backgroundColor:
      Platform.OS === 'android' ? Colors.darker : Colors.lightest,
    borderRadius: 15,
    height: Platform.OS === 'android' ? 40 : 30
  },
  input: {
    color: Platform.OS === 'android' ? Colors.lightest : Colors.primary
  }
})

export default SearchHeader
