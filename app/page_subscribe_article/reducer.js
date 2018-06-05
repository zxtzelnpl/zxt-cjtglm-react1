import * as actionTypes from './actionTypes';

const initialState = {
  data: [],
  isFetching: false,
  error: null
};

export default function subscribeList(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SUBSCRIBLELIST_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case actionTypes.SUBSCRIBLELIST_RECEIVED:
      return {
        ...state,
        data: action.data,
        receivedAt: action.receivedAt,
        isFetching: false
      };
    case actionTypes.SUBSCRIBLELIST_ERROR:
      return {
        ...state,
        isFetching: true,
        error: action.error
      };
    default:
      return state;
  }
}
