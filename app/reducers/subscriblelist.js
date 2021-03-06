import * as actionTypes from '../constants/subscriblelist'

export default function subscribelist(state = {}, action) {
  switch (action.type) {
    case actionTypes.SUBSCRIBLELIST_GET:
      return {
        data: action.data,
        updateAt: action.updateAt
      }
    default:
      return state
  }
}