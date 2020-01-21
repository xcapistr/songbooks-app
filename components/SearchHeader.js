import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native'
import { SearchBar } from 'react-native-elements'

import Colors from '../constants/Colors'

const SearchHeader = props => {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const changeTextHandler = async query => {
    setIsLoading(true)
    setQuery(query)
    await props.onSearch(query)
    setIsLoading(false)
  }

  return (
    <View style={styles.navbar}>
      <SearchBar
        value={query}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        searchIcon={{ color: Colors.primary }}
        clearIcon={{ color: Colors.primary }}
        placeholderTextColor={Colors.primary}
        placeholder="Search"
        autoCapitalize="none"
        showLoading={isLoading}
        onChangeText={changeTextHandler}
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
    color: Colors.primary,
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
    backgroundColor: Colors.lightest,
    borderRadius: 15,
    height: Platform.OS === 'android' ? 40 : 30
  },
  input: {
    color: Colors.primary
  }
})

export default SearchHeader
