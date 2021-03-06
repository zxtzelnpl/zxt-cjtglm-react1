import * as actionTypes from '../constants/wxinfo'

const initialState = {}

export default function wxinfo(state = initialState, action) {
  let _state = {...state}
  switch (action.type) {
    case actionTypes.WEIXIN_GET:
      localStorage.setItem('wxinfo', JSON.stringify(action.data))
      return action.data
    case actionTypes.WEIXIN_USER_COUNT:
      _state.user_count = action.data
      localStorage.setItem('wxinfo', JSON.stringify(_state))
      return _state
    case actionTypes.WEIXIN_UPDATE:
      localStorage.setItem('wxinfo', JSON.stringify(action.data))
      return action.data
    default:
      return state
  }
}