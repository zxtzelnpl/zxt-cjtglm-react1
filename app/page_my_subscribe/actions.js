import * as actionTypes from './actionTypes';

export function get(data) {
  return {
    type: actionTypes.SUBSCRIBLELIST_GET,
    data,
    updateAt: new Date()
  }
}