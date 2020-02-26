import { SET_BOOKS } from '../actions/userLibrary'

const initialState = {
  userBooks: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKS:
      return {
        userBooks: action.userBooks
      }
  }
  return state
}
