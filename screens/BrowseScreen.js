import React, { useState, Fragment } from 'react'
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { SearchBar } from 'react-native-elements'

import Colors from '../constants/Colors'

const BrowseScreen = props => {
  const [query, setQuery] = useState('')

  return (
    <Fragment>
    <SafeAreaView style={{ flex:0, backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white' }} />
    <SafeAreaView style={{ flex:1, backgroundColor: 'white'}}>
      <View style={styles.navbar}>
        <SearchBar
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          searchIcon={{color: Colors.lighter}}
          clearIcon={{color: Colors.lighter}}
          placeholderTextColor={Colors.lighter}
          placeholder="Search"
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterBtnLabel}>Filter</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.content}>
          <Text>This is Browse screen</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
    </Fragment>
  )
}

BrowseScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  navbar: {
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
    borderBottomWidth: Platform.OS === 'android' ? 0 : 1,
    borderBottomColor: '#ccc'
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
    paddingRight: 0
  },
  inputContainer: {
    backgroundColor: Platform.OS === 'android' ? Colors.darker : Colors.lightest,
    borderRadius: 15,
    height: 40
  },
  input: {
    color: Platform.OS === 'android' ? Colors.lightest : Colors.primary
  },
  searchBarIcon: {
   
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 1000
  }
})

export default BrowseScreen
