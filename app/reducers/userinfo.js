import * as actionTypes from '../constants/userinfo'

export const initialState = {}

export default function userinfo(state = initialState, action) {
  let _state
  switch (action.type) {
    case actionTypes.USERINFO_SCORE:
      _state = Object.assign({}, state)
      _state.score = action.score
      localStorage.setItem('userinfo', JSON.stringify(_state))
      return _state
    case actionTypes.USERINFO_NAME:
      _state = Object.assign({}, state)
      _state.name = action.name
      localStorage.setItem('userinfo', JSON.stringify(_state))
      return _state
    case actionTypes.USERINFO_ACCOUNT:
      _state = Object.assign({}, state)
      _state.account = action.account
      localStorage.setItem('userinfo', JSON.stringify(_state))
      return _state
    case actionTypes.USERINFO_ID:
      _state = Object.assign({}, state)
      _state.ID_number = action.ID_number
      localStorage.setItem('userinfo', JSON.stringify(_state))
      return _state
    case actionTypes.USERINFO_LOAD:
      localStorage.setItem('userinfo', JSON.stringify(action.data))
      return action.data
    default:
      return state
  }
}