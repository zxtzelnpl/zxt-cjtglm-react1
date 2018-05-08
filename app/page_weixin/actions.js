import * as actionTypes from './actionTypes'

export function get(data) {
  return {
    type: actionTypes.WEIXIN_GET,
    data
  }
}

export function user_count(data) {
  return {
    type: actionTypes.WEIXIN_USER_COUNT,
    data
  }
}

export function update(data) {
  return {
    type: actionTypes.WEIXIN_UPDATE,
    data
  }
}